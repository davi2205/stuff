<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SolicitacaoArquivo extends Model
{
  protected $table = 'solicitacao_arquivos';

  function documento(): BelongsTo
  {
    return $this->belongsTo(Documento::class, 'documento_id');
  }

  function solicitacao(): BelongsTo
  {
    return $this->belongsTo(Solicitacao::class, 'solicitacao_id');
  }
}