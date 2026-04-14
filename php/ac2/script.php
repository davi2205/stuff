<?php

use App\Lib\ZBase\Filter;
use App\Lib\ZBase\FilterNode;
use Illuminate\Contracts\Database\Query\Builder;

function applyFilterToQuery(Filter $filter, Builder $query): void {
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
            $query->orWhere(fn ($q) => $applyNodeToModel($node->children[0], $q, null));
          } else {
            $query->where(fn ($q) => $applyNodeToModel($node->children[0], $q, null));
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
