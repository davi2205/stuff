<?php

namespace App\Lib\Async;

use Illuminate\Support\Facades\App;

class Async {
  private static ?AsyncHandler $handler = null;

  private static function instance(): AsyncHandler {
    if (self::$handler === null) {
      self::$handler = App::make(AsyncHandler::class);
    }
    return self::$handler;
  }

  public static function setDatabaseConnection(string $connection): AsyncHandler {
    return self::instance()->setDatabaseConnection($connection);
  }

  public static function call(string|array $function, ...$args): AsyncHandler {
    return self::instance()->call($function, ...$args);
  }

  public static function processQueue(int $maxRounds = PHP_INT_MAX): AsyncHandler {
    return self::instance()->processQueue($maxRounds);
  }

  /**
   * @return object{comment: mixed, result: mixed, status: mixed, title: mixed}
   */
  public static function getPromise(int $id): object {
    return self::instance()->getPromise($id);
  }

  public static function makePromise(?string $title = null): int {
    return self::instance()->makePromise($title);
  }

  public static function setPromiseComment(int $id, string $comment): AsyncHandler {
    return self::instance()->setPromiseComment($id, $comment);
  }

  public static function resolvePromise(int $id, mixed $value): AsyncHandler {
    return self::instance()->resolvePromise($id, $value);
  }

  public static function rejectPromise(int $id, mixed $comment): AsyncHandler {
    return self::instance()->rejectPromise($id, $comment);
  }
}
