<?php

namespace App\Providers;

use App\Lib\Async\Services\AsyncService;
use App\Lib\Function\Services\FunctionService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   */
  public function register(): void {
    $this->app->singleton('function', function ($app) { return $app->make(FunctionService::class); });
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void {
    //
  }
}
