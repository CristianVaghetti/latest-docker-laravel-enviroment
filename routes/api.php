<?php

use App\Http\Controllers\Api\Auth\IssueTokenController;
use App\Http\Controllers\Api\Auth\TokenController;
use Illuminate\Support\Facades\Route;

// Machine-to-machine: recebe email+senha, devolve token
Route::post('auth/token', TokenController::class)->name('api.auth.token');

// Usuário logado via sessão gera seu próprio token
Route::middleware('auth:sanctum')->post('auth/issue-token', IssueTokenController::class)->name('api.auth.issue-token');
Route::middleware('auth:sanctum')->get('whoami', function () {
    return response()->json(['user' => auth()->user()->only('name', 'email')]);
})->name('api.auth.whoami');
