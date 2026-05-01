<?php 

namespace App\Lib\Function\Models;

use Illuminate\Database\Eloquent\Model;

class PendingCall extends Model {
  protected $table = 'pending_calls';

  protected $fillable = [
    'status',
    'namespace',
    'class',
    'function',
    'is_static',
    'args',
    'error',
    'url',
    'referer',
    'ip',
    'user_agent',
    'user_id',
    'user_type',
  ];

  protected $casts = [
    'args' => 'array',
  ];

  public function user() {
    return $this->morphTo();
  }
}
