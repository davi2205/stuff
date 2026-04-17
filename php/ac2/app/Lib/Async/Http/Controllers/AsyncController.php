<?php

namespace App\Lib\Async\Http\Controllers;

use App\Lib\Async\Async;
use App\Lib\Async\AsyncHandler;
use Illuminate\Http\Request;

class AsyncController {
  public function action(Request $request) {
    $payload = $request->json()->all();

    $validPayload =
      isset($payload['actions'])
      && is_array($payload['actions'])
      && !empty($payload['actions']);
    if (!$validPayload) {
      return response()->json(['success' => false, 'error' => 'Invalid payload'], 400);
    }
    foreach ($payload['actions'] as $action) {
      $validAction = 
        isset($action['name'])
        && is_string($action['name'])
        && isset($action['args'])
        && is_array($action['args']);
      if (!$validAction) {
        return response()->json(['success' => false, 'error' => 'Invalid payload'], 400);
      }
    }

    $response = null;
    foreach ($payload['actions'] as $action) {
      if (in_array($action['name'], ['setDatabaseConnection'])) {
        return response()->json(['success' => false, 'error' => "Action {$action['name']} not supported"], 400);
      }
      try {
        $currentResponse = call_user_func_array([Async::class, $action['name']], $action['args']);
      } catch (\Throwable $e) {
        return response()->json(['success' => false, 'error' => "Error executing action {$action['name']}: " . $e->getMessage()], 400);
      }
      if (!empty($response)) {
        return response()->json(['success' => false, 'error' => 'Multiple responses not supported'], 400);
      }
      if (!($currentResponse instanceof AsyncHandler)) {
        $response = $currentResponse;
      }
    }
    return response()->json(['success' => true, 'data' => compact('response')]);
  }
}