<?php

namespace App\Lib\ZBase;

final class FilterNode {
  public function __construct(
    public readonly mixed $value,
    public readonly array $children = [],
  ) {}

  public function asSExpr(): string {
    $expr = [];

    array_push($expr, '`'.(string) $this->value.'`');

    foreach ($this->children as $child) {
      if ($child instanceof FilterNode) {
        array_push($expr, $child->asSExpr());
      } else {
        array_push($expr, (string) $child);
      }
    }

    return '('.implode(' ', $expr).')';
  }
}