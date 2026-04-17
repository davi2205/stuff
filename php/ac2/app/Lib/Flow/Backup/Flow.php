<?php

namespace App\Lib\Flow;

abstract class Flow {
  /** @var FlowPoint[] */
  private array $points = [];
  /** @var FlowEdge[]  */
  private array $edges = [];

  protected function setStartPoint(mixed $name): void {
    foreach ($this->points as $point) {
      if ($point->getName() === $name) {
        $point->setAsStart();
        return;
      }
    }
    throw new \Exception("Point '$name' does not exist in the flow.");
  }

  protected function setEndPoint(mixed $name): void {
    foreach ($this->points as $point) {
      if ($point->getName() === $name) {
        $point->setAsEnd();
        return;
      }
    }
    throw new \Exception("Point '$name' does not exist in the flow.");
  }

  protected function defineEdge(mixed $name, mixed $from, mixed $to): void {
    $edgeExists = function (mixed $name, FlowPoint $from, FlowPoint $to) {
      foreach ($this->edges as $edge) {
        if ($edge->getName() === $name && $edge->getFrom() === $from && $edge->getTo() === $to) {
          return true;
        }
      }
      return false;
    };

    $providePoint = function (mixed $name) {
      foreach ($this->points as $point) {
        if ($point->getName() === $name) {
          return $point;
        }
      }
      if (!method_exists($this, $name)) {
        throw new \Exception("Method '$name' does not exist in the flow class.");
      }
      $point = new FlowPoint($name, function() use ($name) { return $this->{$name}(); });
      array_push($this->points, $point);
      return $point;
    };

    $fromPoint = $providePoint($from);
    $toPoint = $providePoint($to);
    if ($edgeExists($name, $fromPoint, $toPoint)) {
      throw new \Exception("Edge '$name' from '{$fromPoint->getName()}' to '{$toPoint->getName()}' already exists in the flow.");
    }
    array_push($this->edges, new FlowEdge($name, $fromPoint, $toPoint));
  }

  protected function edgesFrom(mixed $pointName): array {
    $edges = [];
    foreach ($this->edges as $edge) {
      if ($edge->getFrom()->getName() === $pointName) {
        array_push($edges, [$edge->getName(), $edge->getTo()->getName()]);
      }
    }
    return $edges;
  }

  public function startFrom(string $point, mixed $data): void {
    $this->checkSanity();

  }

  protected function checkSanity(): void {
    $startCount = 0;
    $endCount = 0;
    foreach ($this->points as $point) {
      if ($point->isStart()) {
        $startCount++;
      }
      if ($point->isEnd()) {
        $endCount++;
      }
    }
    if ($startCount !== 1) {
      throw new \Exception("Flow must have exactly one start point.");
    }
    if ($endCount !== 1) {
      throw new \Exception("Flow must have exactly one end point.");
    }

    foreach ($this->edges as $edge) {
      if ($edge->getFrom()->isEnd()) {
        throw new \Exception("Edge '{$edge->getName()}' cannot start from end point '{$edge->getFrom()->getName()}'.");
      }
    }
  }
}
