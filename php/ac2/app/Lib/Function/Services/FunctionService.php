<?php 

namespace App\Lib\Function\Services;

use App\Lib\Function\Models\PendingCall;

class FunctionService {
  private PendingCall $pendingCall;

  public function __construct(PendingCall $pendingCall) {
    $this->pendingCall = $pendingCall;
  }

  /** @return object{namespace: string, class: string|null, function: string, is_static: bool|null} */
  protected function parseFunction(string|array $function): object {
    if (is_string($function)) {
      $reflectionFunction = new \ReflectionFunction($function);
      return (object) [
        'namespace' => $reflectionFunction->getNamespaceName(),
        'class' => null,
        'function' => $reflectionFunction->getShortName(),
        'is_static' => null,
      ];
    }
    [$classOrObject, $method] = $function;
    $reflectionClass = new \ReflectionClass($classOrObject);
    $reflectionMethod = $reflectionClass->getMethod($method);
    return (object) [ 
      'namespace' => $reflectionClass->getNamespaceName(),
      'class' => $reflectionClass->getShortName(),
      'function' => $method,
      'is_static' => $reflectionMethod->isStatic(),
    ];
  }

  protected function queuePendingCall(string|array $function, array $args, \Throwable $t, string $status = 'WAITING'): void {
    $pendingCall = $this->pendingCall->newInstance();
    $pendingCall->status = $status;
    $parsedFunction = $this->parseFunction($function);
    $pendingCall->namespace = $parsedFunction->namespace;
    $pendingCall->class = $parsedFunction->class;
    $pendingCall->function = $parsedFunction->function;
    $pendingCall->is_static = $parsedFunction->is_static;
    $pendingCall->args = $args;
    $pendingCall->error = $t->getMessage() . "\n" . $t->getTraceAsString();
    $request = request();
    $pendingCall->url = $request->fullUrl();
    $pendingCall->ip = $request->ip();
    $pendingCall->user_agent = $request->userAgent();
    $user = auth()->user();
    if ($user) {
      $pendingCall->user_id = $user->id;
      $pendingCall->user_type = get_class($user);
    }
    $pendingCall->save();
  }

  public function retryCallOrQueue(int $pendingCallId): mixed {
    $shouldRetry = $this->pendingCall
      ->where('id', $pendingCallId)
      ->whereIn('status', ['FAILED', 'WAITING'])
      ->update(['status' => 'BUSY']);
    if (!$shouldRetry) {
      throw new \InvalidArgumentException("Pending call with ID $pendingCallId not found or not in a retryable state.");
    }
    $pendingCall = $this->pendingCall->find($pendingCallId); 
    $function = $pendingCall->is_static
      ? [$pendingCall->class, $pendingCall->function]
      : [app($pendingCall->class), $pendingCall->function];
    try {
      $result = call_user_func_array($function, $pendingCall->args);
      $pendingCall->delete();
      return $result;
    } catch (\Throwable $e) {
      $pendingCall->status = 'FAILED';
      $pendingCall->error = $e->getMessage() . "\n" . $e->getTraceAsString();
      $pendingCall->save();
      return null;
    }
  }

  public function callOrQueue(string|array $function, mixed ...$args): mixed {
    if (!is_callable($function)) { 
      if (is_string($function)) {
        throw new \InvalidArgumentException("Function '$function' is not callable.");
      }
      if (is_object($function[0])) {
        $functionName = get_class($function[0]) . "::" . $function[1];
        throw new \InvalidArgumentException("Method '$functionName' does not exist or is not callable in a non-static context.");
      }
      $functionName = $function[0] . "::" . $function[1];
      throw new \InvalidArgumentException("Method '$functionName' does not exist");
    }
    try {
      return call_user_func_array($function, $args);
    } catch (\Throwable $e) {
      $this->queuePendingCall($function, $args, $e, 'FAILED');
      return null;
    }
  }
}