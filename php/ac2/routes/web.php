<?php

use App\Lib\Async\Async;
use App\Lib\Test\AsyncTest;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  Async::call([AsyncTest::class, 'test'])->processQueue();
  return view('welcome');
});