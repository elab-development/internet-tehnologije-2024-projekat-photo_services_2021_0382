<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/reset-password', [AuthController::class, 'resetPassword']);



Route::get('/service-categories', [ServiceCategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::patch('/services/{id}', [ServiceController::class, 'updatePrice']);

    Route::post('/offers', [OfferController::class, 'store']);
    Route::put('/offers/{id}', [OfferController::class, 'updateByBuyer']);
    Route::patch('/offers/{id}', [OfferController::class, 'updateBySeller']);
    Route::delete('/offers/{id}', [OfferController::class, 'delete']);

    Route::get('offers/buyer', [OfferController::class, 'buyerOffers']);
    Route::get('offers/seller', [OfferController::class, 'sellerOffers']);

    // in api.php
    Route::get('/users/{id}', [UserController::class,'show']);

    Route::get('/services/seller', [ServiceController::class, 'sellerIndex']);

});

Route::resource('services', ServiceController::class)->only(['index', 'show']);