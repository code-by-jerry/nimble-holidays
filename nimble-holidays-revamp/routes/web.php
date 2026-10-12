<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TripEnquiryController;

Route::get('/', fn () => Inertia::render('Home'));
Route::post('/trip-enquiries', [TripEnquiryController::class, 'store'])->name('trip-enquiries.store');
