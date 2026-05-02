<?php

namespace App\Lib\Function\Facades;

use Illuminate\Support\Facades\Facade;

class Func extends Facade {
  protected static function getFacadeAccessor(): string {
    return 'function';
  }
}