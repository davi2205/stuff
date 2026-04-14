<?php

namespace App\Lib\Flow;

use Closure;

class FlowPoint {
  private mixed $name;
  private \Closure $action;

  private bool $isStart = false;
  private bool $isEnd = false;

  public function __construct(mixed $name, \Closure $action) {
    $this->name = $name;
    $this->action = $action;
  }

  public function isStart(): bool {
    return $this->isStart;
  }

  public function setAsStart(): void {
    $this->isStart = true;
  }

  public function isEnd(): bool {
    return $this->isEnd;
  }

  public function setAsEnd(): void {
    $this->isEnd = true;
  }

  public function getName(): mixed {
    return $this->name;
  }

  public function doAction(): mixed {
    return ($this->action)();
  }
}