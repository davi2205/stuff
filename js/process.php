<?php

$input = file_get_contents('php://input');
$data = json_decode($input);

$pending = [];
foreach ($data->pending as $_pending) {
  
}

echo json_encode([ 'pending' => $pending ]);