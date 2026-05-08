<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ProfileController as UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/projects/{slug}', [PublicController::class, 'projectShow'])->name('projects.show');
Route::get('/blog', [PublicController::class, 'blogIndex'])->name('blog.index');
Route::get('/blog/{slug}', [PublicController::class, 'blogShow'])->name('blog.show');
Route::post('/contact', [PublicController::class, 'contactStore'])->name('contact.store')
    ->middleware('throttle:5,1');
Route::get('/locale/{locale}', [PublicController::class, 'setLocale'])->name('locale.switch');

/*
|--------------------------------------------------------------------------
| Admin (prefix: /admin-ferhat)  — auth routes + protected admin
|--------------------------------------------------------------------------
*/
Route::prefix('admin-ferhat')->group(function () {

    // ----- Breeze auth (login/logout/password reset). Registration disabled. -----
    require __DIR__ . '/auth.php';
});

Route::prefix('admin-ferhat')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::get('profile', [Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('profile', [Admin\ProfileController::class, 'update'])->name('profile.update');

    Route::resource('services', Admin\ServiceController::class)->except('show');
    Route::resource('skills', Admin\SkillController::class)->except('show');
    Route::resource('experiences', Admin\ExperienceController::class)->except('show');
    Route::resource('educations', Admin\EducationController::class)->except('show');
    Route::resource('certifications', Admin\CertificationController::class)->except('show');
    Route::resource('projects', Admin\ProjectController::class)->except('show');
    Route::resource('testimonials', Admin\TestimonialController::class)->except('show');
    Route::resource('pricing', Admin\PricingPlanController::class)
        ->parameters(['pricing' => 'plan'])
        ->except('show');
    Route::resource('posts', Admin\PostController::class)->except('show');

    Route::get('messages', [Admin\MessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [Admin\MessageController::class, 'show'])->name('messages.show');
    Route::delete('messages/{message}', [Admin\MessageController::class, 'destroy'])->name('messages.destroy');

    Route::get('settings', [Admin\SettingController::class, 'edit'])->name('settings.edit');
    Route::post('settings', [Admin\SettingController::class, 'update'])->name('settings.update');

    Route::get('change-password', [Admin\ChangePasswordController::class, 'edit'])->name('password.edit');
    Route::patch('change-password', [Admin\ChangePasswordController::class, 'update'])->name('password.update');

    // Account (logged-in user) — Breeze profile editor for password change
    Route::get('account', [UserProfileController::class, 'edit'])->name('account.edit');
    Route::patch('account', [UserProfileController::class, 'update'])->name('account.update');
    Route::delete('account', [UserProfileController::class, 'destroy'])->name('account.destroy');
});

// Breeze redirects to route('dashboard') after login — alias to admin.dashboard
Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'))
    ->middleware('auth')->name('dashboard');
