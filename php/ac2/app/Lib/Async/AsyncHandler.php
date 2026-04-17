<?php

namespace App\Lib\Async;

use App\Lib\Async\Models\PendingCall;
use App\Lib\Async\Models\Promise;
use Exception;
use Illuminate\Support\Facades\App;

class AsyncHandler {
  private Promise $promise;
  private PendingCall $pendingCall;
  private array $instancesByClass = [];

  public function __construct(PendingCall $pendingCall, Promise $promise) {
    $this->pendingCall = $pendingCall;
    $this->promise = $promise;
  }

  /**
   * @return object{namespace: string, class: ?string, function: string, is_static: ?bool}
   */
  private function parseFunction(string|array $function): object {
    if (is_array($function)) {
      [$classOrObject, $method] = $function;
      $class = is_object($classOrObject) ? get_class($classOrObject) : $classOrObject;
      $reflectionClass = new \ReflectionClass($class);
      $isStatic = (new \ReflectionMethod($classOrObject, $method))->isStatic();
      return (object) [
        'namespace' => $reflectionClass->getNamespaceName(),
        'class' => $reflectionClass->getShortName(),
        'function' => $method,
        'is_static' => $isStatic,
      ];
    }
    $reflectionFunction = new \ReflectionFunction($function);
    return (object) [
      'namespace' => $reflectionFunction->getNamespaceName(),
      'class' => null,
      'function' => $reflectionFunction->getName(),
      'is_static' => null,
    ];
  }

  private function invokeFunction(PendingCall $pendingCall): mixed {
    if (empty($pendingCall->class)) {
      return call_user_func_array($pendingCall->namespace . '\\' . $pendingCall->function, $pendingCall->args);
    }
    if ($pendingCall->is_static) {
      $className = $pendingCall->namespace . '\\' . $pendingCall->class;
      return call_user_func_array([$className, $pendingCall->function], $pendingCall->args);
    }
    if (!isset($this->instancesByClass[$pendingCall->class])) {
      $this->instancesByClass[$pendingCall->class] = App::make($pendingCall->namespace . '\\' . $pendingCall->class);
    }
    return call_user_func_array([$this->instancesByClass[$pendingCall->class], $pendingCall->function], $pendingCall->args);
  }

  public function setDatabaseConnection(string $connection): static {
    $this->promise->setConnection($connection);
    $this->pendingCall->setConnection($connection);
    return $this;
  }

  public function call(string|array $function, ...$args): static {
    $pendingCall = $this->pendingCall->newInstance();
    $pendingCall->status = 'WAITING';
    $parsedFunction = $this->parseFunction($function);
    $pendingCall->namespace = $parsedFunction->namespace;
    $pendingCall->class = $parsedFunction->class;
    $pendingCall->function = $parsedFunction->function;
    $pendingCall->is_static = $parsedFunction->is_static;
    $pendingCall->args = $args;
    $user = auth()->user();
    if ($user) {
      $pendingCall->user_id = $user->id;
      $pendingCall->user_type = get_class($user);
    }
    $pendingCall->origin = request()->fullUrl();
    $pendingCall->save();
    return $this;
  }

  public function processQueue(int $maxRounds = PHP_INT_MAX): static {
    for ($i = 0; $i < $maxRounds; $i++) {
      $pendingCalls = $this->pendingCall->where('status', 'WAITING')->get();
      if ($pendingCalls->isEmpty()) {
        return $this;
      }

      $actualPendingCalls = [];
      foreach ($pendingCalls as $pendingCall) {
        if ($this->pendingCall->where('id', $pendingCall->id)->update(['status' => 'BUSY'])) {
          array_push($actualPendingCalls, $pendingCall);
        }
      }

      foreach ($actualPendingCalls as $pendingCall) {
        try {
          $this->invokeFunction($pendingCall);
          $pendingCall->status = 'DONE';
        } catch (\Throwable $e) {
          $pendingCall->error = $e->getMessage() . "\n" . $e->getTraceAsString();
          $pendingCall->status = 'FAILED';
        }
        $pendingCall->save();
      }
    }
    return $this;
  }

  /**
   * @return object{comment: mixed, result: mixed, status: mixed, title: mixed}
   */
  public function getPromise(int $id): object {
    $promise = $this->promise->find($id);
    if (!$promise) {
      throw new \Exception("Promise with id $id not found");
    }
    return (object) [
      'status' => $promise->status,
      'title' => $promise->title,
      'result' => $promise->result,
      'comment' => $promise->comment,
    ];
  }

  public function makePromise(?string $title = null): int {
    $promise = $this->promise->newInstance();
    $promise->status = 'PENDING';
    $promise->title = $title;
    $promise->save();
    return $promise->id;
  }

  public function setPromiseComment(int $id, string $comment): static {
    $promise = $this->promise->find($id);
    if (!$promise) {
      throw new \Exception("Promise with id $id not found");
    }
    $promise->comment = $comment;
    $promise->save();
    return $this;
  }

  public function resolvePromise(int $id, mixed $value): static {
    $promise = $this->promise->find($id);
    if (!$promise) {
      throw new \Exception("Promise with id $id not found");
    }
    if ($promise->status !== 'PENDING') {
      throw new \Exception("Promise with id $id is not pending");
    }
    $promise->status = 'FULFILLED';
    $promise->result = $value;
    $promise->finished_at = now();
    $promise->save();
    return $this;
  }

  public function rejectPromise(int $id, mixed $comment): static {
    $promise = $this->promise->find($id);
    if (!$promise) {
      throw new \Exception("Promise with id $id not found");
    }
    if ($promise->status !== 'PENDING') {
      throw new \Exception("Promise with id $id is not pending");
    }
    $promise->status = 'REJECTED';
    $promise->comment = $comment instanceof \Exception ? $comment->getMessage() . "\n" . $comment->getTraceAsString() : $comment;
    $promise->finished_at = now();
    $promise->save();
    return $this;
  }
}