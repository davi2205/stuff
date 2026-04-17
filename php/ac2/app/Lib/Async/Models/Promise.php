<?php

namespace App\Lib\Async\Models;

use Illuminate\Database\Eloquent\Model;

class Promise extends Model {
  protected $table = 'promises';

  protected $fillable = [
    'status',
    'title',
    'result',
    'comment',
    'user_id',
    'user_type',
    'finished_at',
  ];

  protected $casts = [
    'result' => 'array',
    'finished_at' => 'datetime',
  ];

  public function user() {
    return $this->morphTo();
  }
}