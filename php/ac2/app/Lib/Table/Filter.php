<?php 

namespace App\Lib\Table;

class Filter {
  private ?array $rootNode = null;
  private array $nodeStack = [];

  public static function make(): static {
    return new static();
  }

  private function parseArgs(array $args): array {
    if (count($args) == 1 && is_callable($args[0])) {
      array_push($this->nodeStack, $this->rootNode);
      $this->rootNode = null;
      ($args[0])($this);
      $rootNode = $this->rootNode;
      $this->rootNode = array_pop($this->nodeStack);
      return ['()', [$rootNode]];
    }

    if (
      count($args) == 3
      && in_array($args[1], ['=', '<>', '!=', '>', '>=', '<', '<=', 'in', 'not in'])
    ) {
      return [$args[1], [$args[0], $args[2]]];
    }

    throw new \Exception("Unsupported operation " . implode(' ', array_map('json_encode', $args)));
  }

  public function getRootNode(): array {
    return $this->rootNode;
  }

  public function where(mixed ...$args): static {
    if (empty($this->rootNode)) {
      $this->rootNode = $this->parseArgs($args);
    } else {
      $this->rootNode = ['and', [$this->rootNode, $this->parseArgs($args)]];
    }
    return $this;
  }

  public function orWhere(mixed ...$args): static {
    if (empty($this->rootNode)) {
      $this->rootNode = $this->parseArgs($args);
    } else {
      $this->rootNode = ['or', [$this->rootNode, $this->parseArgs($args)]];
    }
    return $this;
  }
}

