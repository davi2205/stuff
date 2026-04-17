<?php

namespace App\Lib\Flow;


class Flow {
  private static array $queue = [];

  public function queue(string $method, ...$args): static {
    array_push(self::$queue, new PendingCall($this, $method, $args));
    return $this;
  }

  public function clearQueue(): void {
    foreach (self::$queue as $pending) {
      if ($pending->flow === $this) {
        $pending->flow = null;
      }
    }
  }

  public static function runAll(): void {
    while (!empty(self::$queue)) {
      $pending = array_shift(self::$queue);
      $pending->execute();
    }
  }
}