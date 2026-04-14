<?php

namespace App\Lib\Flow;

abstract class Flow {
  private ?string $start = null;
  private ?string $end = null;
  /**
   * @var FlowEdge[] $edges
   */
  private array $edges = [];
  private mixed $data = null;

  public function getStart(): ?string {
    return $this->start;
  }

  protected function setStart(string $point): static {
    if (!$this->pointExists($point)) {
      throw new \Exception("Undefined point \"$point\"");
    }
    $this->start = $point;
    return $this;
  }

  public function getEnd(): ?string {
    return $this->end;
  }

  public function setEnd(string $point): static {
    if (!$this->pointExists($point)) {
      throw new \Exception("Undefined point \"$point\"");
    }
    $this->end = $point;
    return $this;
  }

  public function pointExists(string $point): bool {
    return method_exists($this, $point);
  }

  protected function getEdges(): array {
    return $this->edges;
  }

  /**
   * @return FlowEdge[]
   */
  protected function getEdgesFrom(string $from): array {
    $edges = [];
    foreach ($this->edges as $edge) {
      if ($_from === $from) {
        array_push($edges, $edge);
      }
    }
    return $edges;
  }

//   public function edgeExists(string $from, string $to): bool {
//     foreach ($this->edges as $edge) {
//       if ($edge->from === $from && $edge->to === $to) {
//         return true;
//       }
//     }
//     return false;
//   }

  public function addEdge(string $from, string $to, mixed $value = null): static {
    // if ($this->edgeExists($from, $to)) {
    //   throw new \Exception("Edge already exists \"$from\" => \"$to\"");
    // }
    if (!$this->pointExists($from)) {
      throw new \Exception("Undefined point \"$from\"");
    }
    if (!$this->pointExists($to)) {
      throw new \Exception("Undefined point \"$to\"");
    }
    array_push($this->edges, new FlowEdge($from, $to, $value));
    return $this;
  }

  public function getData(): mixed {
    return $this->data;
  }

  protected function setData(mixed $data): static {
    $this->data = $data;
    return $this;
  }

  public function start(mixed $data): static {
    return $this->startFrom($this->start, $data);
  }

  public function startFrom(string $point, mixed $data): static {
    if (!$this->pointExists($point)) {
      throw new \Exception("Undefined point \"$point\"");
    }
    $this->checkSanity();
    for (;;) {
      $edgeValue = $this->{$point}();
      if ($this->getEnd() === $point) {
        return $this;
      }
      $edges = $this->getEdgesFrom($point);
      $nextPoint = null;
      foreach ($edges as $edge) {
        if ($edge->value === $edgeValue) {
          $nextPoint = $edge->to;
          break;
        }
      }
      if ($nextPoint === null) {
        throw new \Exception("No valid continuation from point \"$point\"");
      }
      $point = $nextPoint;
    }
  }

  protected function checkSanity(): void {
    if ($this->start === null) {
      throw new \Exception("No starting point defined");
    }
    if ($this->end === null) {
      throw new \Exception("No ending point defined");
    }
  }
}
