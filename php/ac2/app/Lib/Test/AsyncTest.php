<?php

namespace App\Lib\Test;

use App\Lib\Async\Async;
use Illuminate\Support\Facades\Log;

class AsyncTest {
  public function test(): void {
    Async::call([self::class, 'test2']);
  }

  public function test2(): void {
    Async::call([self::class, 'test3']);
  }
}