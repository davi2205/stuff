<?php

namespace App\Lib\Flow;

final class FlowEdge {
  public function __construct(
    public readonly string $from,
    public readonly string $to,
    public readonly mixed $value = null
  ) {}
}