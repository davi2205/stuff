<?php

namespace App\Providers;

use App\Lib\Async\Listeners\RequestHandledListener;
use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    Event::listen(RequestHandled::class, RequestHandledListener::class);
  }
}
