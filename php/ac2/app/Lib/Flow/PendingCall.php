<?php

namespace App\Lib\Flow;

final class PendingCall {
  public function __construct(
    public readonly Flow $flow,
    public readonly string $method,
    public readonly array $args,
  ) {}

  public function execute(): void {
    $this->flow->{$this->method}(...$this->args);
  }
}