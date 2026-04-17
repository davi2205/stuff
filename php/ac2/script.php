<?php

use App\Lib\Async\Async;
use App\Lib\Async\AsyncHandler;
use App\Lib\Flow\Flow;
use App\Lib\ZBase\Filter;
use App\Lib\ZBase\FilterNode;
use Illuminate\Contracts\Database\Query\Builder;

function parseFunction(string|array $function): object
{
  if (is_array($function)) {
    [$classOrObject, $method] = $function;
    $class = is_object($classOrObject) ? get_class($classOrObject) : $classOrObject;
    $reflectionClass = new \ReflectionClass($class);
    $isStatic = (new \ReflectionMethod($classOrObject, $method))->isStatic();
    return (object) [
      'namespace' => $reflectionClass->getNamespaceName(),
      'class' => $reflectionClass->getShortName(),
      'function' => $method,
      'is_static' => $isStatic,
    ];
  }
  $reflectionFunction = new \ReflectionFunction($function);
  return (object) [
    'namespace' => $reflectionFunction->getNamespaceName(),
    'class' => null,
    'function' => $reflectionFunction->getName(),
    'is_static' => null,
  ];
}

try {
  dump(parseFunction('str_replace'));
  dump(parseFunction([Async::class, 'call2']));
  dump(parseFunction([AsyncHandler::class, 'call']));
} catch (Exception $e) {
  dump($e->getMessage());
}

die;

class MyFlow extends Flow
{
  public function possuiFormularioEmAndamento(int $solicitacaoId): void
  {
    $resultado = 'sim';

    switch ($resultado) {
      case 'sim':
        $this->queue('produtoPossuiPerfilDeAnalise', $solicitacaoId);
        break;
      case 'nao':
        $this->finish('não');
        break;
    }
  }

  public function produtoPossuiPerfilDeAnalise(int $solicitacaoId): void
  {
    $resultado = 'sim';

    switch ($resultado) {
      case 'sim':
        $this->finish('sim');
        break;
      case 'nao':
        $this->finish('não');
        break;
    }
  }

  public function produtoEhMpe(int $solicitacaoId): void
  {
    $resultado = 'sim';

    switch ($resultado) {
      case 'sim':
        $this->finish('sim');
        break;
      case 'nao':
        $this->finish('não');
        break;
    }
  }
}

$f = new MyFlow();
dump(
  $f
    ->queue('possuiFormularioEmAndamento', 1)
    ->executeSingle()
);



die;

function applyFilterToQuery(Filter $filter, Builder $query): void
{
  $applyNodeToModel = function (FilterNode $node, Builder $query, ?string $upperValue) use (&$applyNodeToModel): void {
    switch ($node->value) {
      case 'and':
      case 'or':
        $applyNodeToModel($node->children[0], $query, $node->value);
        $applyNodeToModel($node->children[1], $query, $node->value);
        break;
      case '()':
        if (!empty($node->children[0])) {
          if ($upperValue === 'or') {
            $query->orWhere(fn($q) => $applyNodeToModel($node->children[0], $q, null));
          } else {
            $query->where(fn($q) => $applyNodeToModel($node->children[0], $q, null));
          }
        }
        break;
      case '=':
      case '<>':
      case '>':
      case '>=':
      case '<':
      case '<=':
        if ($upperValue === 'or') {
          $query->orWhere($node->children[0], $node->value, $node->children[1]);
        } else {
          $query->where($node->children[0], $node->value, $node->children[1]);
        }
        break;
      case 'in':
        if ($upperValue === 'or') {
          $query->orWhereIn($node->children[0], $node->children[1]);
        } else {
          $query->whereIn($node->children[0], $node->children[1]);
        }
        break;
      case 'not in':
        if ($upperValue === 'or') {
          $query->orWhereNotIn($node->children[0], $node->children[1]);
        } else {
          $query->whereNotIn($node->children[0], $node->children[1]);
        }
        break;
    }
  };
  $applyNodeToModel($filter->rootNode(), $query, null);
}

$f = \App\Lib\ZBase\Filter::make()
  ->where('id', 'in', [1, 10])
  ->where('id', 'not in', [3]);

$query = DB::connection()->table('solicitacoes');

applyFilterToQuery($f, $query);

dump($f->asSExpr());
dump($query->toSql());
dump($query->get()->toArray());
