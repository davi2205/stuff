<?php

$entity = [
    'name' => 'solicitacao',
    'props' => [
        ['name' => 'Author', 'type' => 'string'],
        ['name' => 'Title', 'type' => 'string'],
        ['name' => 'Subject', 'type' => 'string'],
    ],
];

// controller
ob_start();
$className = ucfirst($entity['name']);
$vars = array_map(function ($prop) { return "private \${$prop['name']};"; }, $entity['props']);
echo "<div>teste\n<a>Teste 123</a></div><?php class $className {" . implode("\n", $vars) . " public function test() { if(\$x > 23) { \$x = 23; } else echo 'teste'; return true; } }";
file_put_contents("$className.php", ob_get_clean());
