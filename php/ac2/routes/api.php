<?php

use App\Lib\Async\Http\Controllers\AsyncController;
use Illuminate\Support\Facades\Route;

Route::post('/async', [AsyncController::class, 'action']);