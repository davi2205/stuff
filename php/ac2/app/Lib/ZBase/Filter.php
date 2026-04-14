<?php 

namespace App\Lib\ZBase;


class Filter {
  protected ?FilterNode $rootNode = null;
  private array $nodeStack = [];

  public static function make(): static {
    return new static();
  }

  public function getRootNode(): ?FilterNode {
    return $this->rootNode;
  }

  public function where(...$args): static {
    return $this->whereImpl('and', ...$args);
  }

  public function orWhere(...$args): static {
    return $this->whereImpl('or', ...$args);
  }

  protected function whereImpl(string $joinOperator, ...$args): static {
    $node = $this->parseArgs($args);

    if ($this->rootNode !== null) {
      $this->rootNode = new FilterNode($joinOperator, [$this->rootNode, $node]);
    } else {
      $this->rootNode = $node;
    }
    
    return $this;
  }

  protected function parseArgs($args): FilterNode {
    if (count($args) == 1 && is_callable($args[0])) {
      array_push($this->nodeStack, $this->rootNode);
      $this->rootNode = null;
      ($args[0])($this);
      $node = $this->rootNode;
      $this->rootNode = array_pop($this->nodeStack);
      return new FilterNode('()', $node ? [$node] : []);
    }

    if (
      count($args) == 3
      && in_array($op = strtolower(trim($args[1])), ['=', '<>', '!=', '>', '>=', '<', '<=', 'in', 'not in'])
    ) {
      if ($op === '!=') {
        $op = '<>';
      }
      return new FilterNode($op, [$args[0], $args[2]]);
    }

    throw new \Exception("Unsupported operation " . implode(' ', array_map('json_encode', $args)));
  }

  public function asSExpr(): string {
    return $this->rootNode?->asSExpr() ?? '';
  }
}

