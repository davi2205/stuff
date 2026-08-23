<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('welcome');
})->name('root');

Route::post('/parts/select', function () {
  sleep(1);
  return view('parts.select', request()->all());
})->name('parts.select');