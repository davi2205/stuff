<?php 

namespace App\Lib\Flow;

abstract class Flow {
  private array $queue = [];
  private array $results = [];

  public function queue($method, ...$args): static {
    if (!method_exists($this, $method)) {
      throw new \Exception("Method '$method' does not exist in the flow class.");
    }
    array_push($this->queue, (object) ['method' => $method, 'args' => $args]);
    return $this;
  }

  private function clearAndCollectData(): mixed {
    foreach ($this->queue as $step) {
      if (empty($step->args)) {
        continue;
      }
      array_push($this->results, count($step->args) === 1 ? $step->args[0] : $step->args);
    }
    $this->queue = [];

    $results = $this->results;
    $this->results = [];

    return match(count($results)) {
      0 => null,
      1 => $results[0],
      default => $results
    };
  }

  public function finish(mixed $data = null): static {
    array_push($this->results, $data);
    return $this;
  }

  public function execute(): mixed {
    if (empty($this->queue)) {
      throw new \Exception("No steps in the queue to execute.");
    }

    while (!empty($this->queue)) {
      $step = array_shift($this->queue);
      $method = $step->method;
      $args = $step->args;
      $this->{$method}(...$args);
    }

    return $this->clearAndCollectData();
  }

  public function executeSingle(): mixed {
    if (empty($this->queue)) {
      throw new \Exception("No steps in the queue to execute.");
    }

    $step = array_shift($this->queue);
    $method = $step->method;
    $args = $step->args;
    $this->{$method}(...$args);

    return $this->clearAndCollectData();
  }
}