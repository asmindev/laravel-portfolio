<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResumeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/resume/preview', [ResumeController::class, 'preview'])->name('resume.preview');
Route::get('/resume/download', [ResumeController::class, 'download'])->name('resume.download');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $todayAnalytics = \App\Models\Analytics::whereDate('date', today())->first();
        $thisMonthAnalytics = \App\Models\Analytics::whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->get();

        return Inertia::render('admin/dashboard/page', [
            'projectsCount' => \App\Models\Project::count(),
            'postsCount' => \App\Models\BlogPost::count(),
            'messagesCount' => \App\Models\ContactMessage::count(),
            'visitorStats' => [
                'today' => $todayAnalytics ? $todayAnalytics->unique_visitors : 0,
                'this_month' => $thisMonthAnalytics->sum('unique_visitors'),
            ]
        ]);
    })->name('dashboard');

    Route::resource('projects', ProjectController::class);
    Route::resource('blog', BlogPostController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
});
