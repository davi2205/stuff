<?php

namespace App\Lib\Expr;

class Parser {
  private Reader $reader;

  public function __construct(Reader $reader) {
    $this->reader = $reader;
  }

  public function parse(string $expr): array {
    $this->reader->setBuffer($expr);

    $stack = [];
    for (;;) {
      if ($this->reader->readExactly('(') !== null) {
        array_push($stack, []);
      }
      else if ($this->reader->readExactly(')') !== null) {
        if (empty($stack)) {
          throw new \Exception("Mismatched \"(\"");
        }
        $node = array_pop($stack);
        if (!empty($stack)) {
          array_push($stack[count($stack) - 1], $node);
        }
        else {
          return $node;
        }
      }
      else {
        if (empty($stack)) {
          throw new \Exception("Missing \"(\"");
        }
        $value =
          $this->reader->readNumber()
          ?? $this->reader->readString("'")
          ?? $this->reader->readString('"')
          ?? $this->reader->readAtom();
        if ($value === null) {
          throw new \Exception("Unexpected " . ($this->reader->peekCh() === null ? 'end of input' : "'" . $this->reader->peekCh() . "'"));
        }
        array_push($stack[count($stack) - 1], $value);
      }
    }
  }
}