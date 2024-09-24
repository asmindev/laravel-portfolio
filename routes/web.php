<?php

use App\Http\Controllers\Home;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', Home::class);
