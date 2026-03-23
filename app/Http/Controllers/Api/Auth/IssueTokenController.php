<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IssueTokenController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return response()->json([
            'token' => $request->user()->createToken($request->input('token_name', 'api-token'))->plainTextToken,
        ]);
    }
}
