<?php

namespace App\Modules;

use App\Models\Documento;
use App\Models\Pessoa;
use App\Models\Produto;
use App\Models\Solicitacao;
use App\Models\SolicitacaoArquivo;
use App\Models\Time;
use App\Models\User;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

class Sistema
{
  // Geral
  // --------------------------

  function boot(): void
  {
    $this->bootSolicitacao();
  }


  // Util
  // --------------------------

  function geraProtocolo(string $prefixo): string
  {
    return $prefixo
      . now()->format('Ymd')
      . str_pad(random_int(1, 99999), 5, '0', STR_PAD_LEFT);
  }


  // Solicitação
  // --------------------------

  function bootSolicitacao(): void
  {
    Solicitacao::observe(new class($this) {
      function __construct(public Sistema $sistema) {}

      function creating(Solicitacao $solicitacao): void
      {
        if (empty($solicitacao->protocolo)) {
          $solicitacao->protocolo = $this->sistema->geraProtocolo('SOL');
        }
        if (empty($solicitacao->conta_id)) {
          $solicitacao->conta_id = $solicitacao->pessoa_id;
        }
      } 

      function created(Solicitacao $solicitacao): void
      {
        $this->sistema->criaChecklists($solicitacao);
      }
    });
  }

  function criaChecklists(Solicitacao $solicitacao): void
  {
    $empresaDocumentos = $solicitacao->produto->documentos->where('contexto', 'empresa');
    foreach ($empresaDocumentos as $documento) {
      $this->criaSolicitacaoArquivo($solicitacao, $documento, 1);
    }
    
  }

  function criaSolicitacaoArquivo(
    Solicitacao $solicitacao,
    Documento $documento,
    int $referenciaInterna = 1): void
  {
    $solicitacaoArquivo = new SolicitacaoArquivo();
    $solicitacaoArquivo->referencia_interna = $referenciaInterna;
    $solicitacaoArquivo->ordem = 1;
    $solicitacaoArquivo->contexto = $documento->contexto;
    $solicitacaoArquivo->tipo = $documento->tipo;
    $solicitacaoArquivo->status = 'AGUARDANDO';
    $solicitacaoArquivo->save();
    $solicitacaoArquivo->documento()->associate($documento);
    $solicitacaoArquivo->solicitacao()->associate($solicitacao);
  }


  // Rotas
  // --------------------------

  function defineRotasDasPaginas(): void
  {
    Route::view('/test', 'paginas.test')->name('paginas.test');
  }
}