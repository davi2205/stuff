<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Produto extends Model
{
  protected $table = 'produtos';

  function documentos(): BelongsToMany
  {
    return $this->belongsToMany(
      Documento::class,
      'produto_documento',
      'produto_id',
      'documento_id');
  }
}