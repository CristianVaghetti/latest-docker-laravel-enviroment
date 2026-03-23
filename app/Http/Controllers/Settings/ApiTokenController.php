<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StoreApiTokenRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ApiTokenController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('settings/api-tokens', [
            'tokens' => auth()->user()->tokens()
                ->select(['id', 'name', 'last_used_at', 'created_at'])
                ->latest()
                ->get(),
        ]);
    }

    public function store(StoreApiTokenRequest $request): RedirectResponse
    {
        $token = $request->user()
            ->createToken($request->validated('token_name'))
            ->plainTextToken;

        return redirect()->route('api-tokens.index')->with('newToken', $token);
    }
}
