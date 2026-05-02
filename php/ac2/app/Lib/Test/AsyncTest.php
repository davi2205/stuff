<?php

namespace App\Lib\Test;

use App\Lib\Async\Facades\Async;
use App\Lib\Function\Facades\Func;
use Illuminate\Support\Facades\Log;

class AsyncTest {
  public function test(): void {
    Func::callOrQueue([$this, 'test2']);
  }

  public function test2(): void {
    throw new \Exception("Test exception");
  }
}