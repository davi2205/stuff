<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    $this->app->singleton('sistema', function ($app) {
      return new \App\Modules\Sistema();
    });
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    app('sistema')->boot();
  }
}
