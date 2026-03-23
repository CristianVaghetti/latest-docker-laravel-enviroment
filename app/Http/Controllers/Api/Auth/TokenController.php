<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiAuthTokenRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TokenController extends Controller
{
    public function __invoke(ApiAuthTokenRequest $request): JsonResponse
    {
        $user = User::query()->where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return response()->json([
            'token' => $user->createToken($request->token_name)->plainTextToken,
        ]);
    }
}
