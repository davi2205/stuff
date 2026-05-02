<?php

use App\Lib\Function\Facades\Func;
use App\Lib\Test\AsyncTest;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  Func::callOrQueue([new AsyncTest(), 'test']);
  return view('welcome');
});
 