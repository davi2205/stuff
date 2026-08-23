<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   */
  public function register(): void {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void {
    Response::mixin(new ExampleMixin());
  }
}

class ExampleMixin {
  public function htmx(): \Closure {
    return function ($event, $params = []) {
      return Response::make('', 200, [
        'HX-Trigger' => json_encode([$event => $params]),
      ]);
    };
  }
}
