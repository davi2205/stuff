<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Solicitacao extends Model
{
  protected $table = 'solicitacoes';

  function pessoa(): BelongsTo
  {
    return $this->belongsTo(Pessoa::class, 'pessoa_id');
  }

  function produto(): BelongsTo
  {
    return $this->belongsTo(Produto::class, 'produto_id');
  }

  function solicitacaoArquivos(): HasMany
  {
    return $this->hasMany(SolicitacaoArquivo::class, 'solicitacao_id');
  }
}