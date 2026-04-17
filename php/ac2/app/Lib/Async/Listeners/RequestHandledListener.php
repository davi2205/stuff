<?php

namespace App\Lib\Async\Listeners;

use App\Lib\Async\Async;
use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RequestHandledListener {
  public function handle(RequestHandled $event) {
  }
}