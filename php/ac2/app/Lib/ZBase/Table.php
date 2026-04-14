<?php

namespace App\Lib\ZBase;

abstract class Table {
  abstract function setFilter(Filter $filter): void;
}