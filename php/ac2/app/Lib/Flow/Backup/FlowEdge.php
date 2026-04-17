<?php

namespace App\Lib\Flow;

class FlowEdge {
  private mixed $name;
  private FlowPoint $from;
  private FlowPoint $to;

  public function __construct(
    mixed $name,
    FlowPoint $from,
    FlowPoint $to
  ) {
    $this->name = $name;
    $this->from = $from;
    $this->to = $to;
  }

  public function getName(): mixed {
    return $this->name;
  }

  public function getFrom(): FlowPoint {
    return $this->from;
  }

  public function getTo(): FlowPoint {
    return $this->to;
  }
}