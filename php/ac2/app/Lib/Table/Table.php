<?php 

namespace App\Lib\Table;

abstract class Table {
  private ?Filter $filter; 

  public function getFilter(): Filter {
    return clone $this->filter;
  }

  public function setFilter(Filter $filter): static {
    return $this;
  }
}