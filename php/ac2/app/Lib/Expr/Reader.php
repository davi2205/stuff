<?php

namespace App\Lib\Expr;

class Reader {
  private int $index;
  private string $buffer;

  public function __construct(string $buffer = '') {
    $this->index = 0;
    $this->buffer = $buffer;
  }

  public function setBuffer(string $buffer): void {
    $this->buffer = $buffer;
    $this->index = 0;
  }

  public function getIndex(): int {
    return $this->index;
  }

  public function peekCh(): ?string {
    return $this->buffer[$this->index] ?? null;
  }

  public function readCh(): ?string {
    return $this->buffer[$this->index++] ?? null;
  }

  public function skipWhitespace(): void {
    while (ctype_space($this->peekCh())) {
      $this->readCh();
    } 
  }

  public function readExactly(string $token): ?string {
    $this->skipWhitespace();

    $nextToken = substr($this->buffer, $this->index, strlen($token));
    if ($token !== $nextToken) {
      return null;
    }
    $this->index += strlen($token);
    return $token;
  }

  public function readNumber(): int|float|null {
    $this->skipWhitespace();

    if (!ctype_digit($this->peekCh())) {
      return null;
    }

    $startIndex = $this->index;
    while (ctype_digit($this->peekCh())) {
      $this->readCh();
    }

    if ($this->peekCh() === '.') {
      $this->readCh();
      if (!ctype_digit($this->peekCh())) {
        return null;
      }
      while (ctype_digit($this->peekCh())) {
        $this->readCh();  
      }
      return (float) substr($this->buffer, $startIndex, $this->index - $startIndex);
    }

    return (int) substr($this->buffer, $startIndex, $this->index - $startIndex);
  }

  public function readString(string $quote): ?string {
    $this->skipWhitespace();

    if ($this->peekCh() !== $quote) {
      return null;
    }
    $this->readCh();

    $chars = [];
    for (;;) {
      $ch = $this->readCh();
      if ($ch === null) {
        throw new \Exception("Unexpected end of input");
      }
      else if ($ch === $quote) {
        if ($this->peekCh() === $quote) {
          array_push($chars, $this->readCh());
        }
        else {
          break;
        }
      }
      else {
        array_push($chars, $ch);
      }
    }

    return implode('', $chars);
  }

  public function readAtom(): ?string {
    $this->skipWhitespace();

    if ($this->peekCh() === null) {
      return null;
    }

    $startIndex = $this->index;
    while (!ctype_space($this->peekCh()) && $this->peekCh() !== null && $this->peekCh() !== '(' && $this->peekCh() !== ')') {
      $this->readCh();
    }

    return substr($this->buffer, $startIndex, $this->index - $startIndex);
  }
}