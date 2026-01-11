<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    session()->flash('success', 'Welcome to your new dashboard!');
    return Inertia::render('dashboard');
})->name('dashboard');
