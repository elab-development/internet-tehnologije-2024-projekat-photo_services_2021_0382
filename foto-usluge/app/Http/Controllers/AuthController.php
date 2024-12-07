<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'role' => 'required|string|in:buyer,seller',
            'password' => 'required|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
          
        ]);
       $token = $user->createToken('auth_token')->plainTextToken;

       return response()->json([
           'message' => 'User registered!',
           'user' => new UserResource($user),
           'token' => $token,
       ], 201); 
        
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($validated)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        $user = User::where('email', $validated['email'])->first();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
         $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in.',
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

   
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function resetPassword(Request $request)
    {
        // Validacija zahteva
        $validated = $request->validate([
            'email' => 'required|email', 
            'new_password' => 'required|string', 
        ]);
        
        $user = User::where('email', $validated['email'])->first();
    
        if (!$user) {
            return response()->json([
                'message' => 'The user with that email does not exist.',
            ], 404);
        }
    
        // Postavljanje nove lozinke
        $user->update([
            'password' => Hash::make($validated['new_password']), 
        ]);
    
        return response()->json([
            'message' => 'Password reset successfully.',
        ], 200);
    }
    
}

