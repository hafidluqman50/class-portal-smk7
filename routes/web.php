<?php

use App\Http\Controllers\Administrator\StudentController;
use App\Http\Controllers\Bk\JournalController as BkJournalController;
use App\Http\Controllers\Bk\DashboardController as BkDashboardController;
use App\Http\Controllers\Bk\AttendanceController as BkAttendanceController;

use App\Http\Controllers\ClassSecretary\JournalController as ClassSecretaryJournalController;
use App\Http\Controllers\ClassSecretary\DashboardController as ClassSecretaryDashboardController;
use App\Http\Controllers\ClassSecretary\AttendanceController as ClassSecretaryAttendanceController;

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/administrator/dashboard', function () {
    return Inertia::render('Administrator/Dashboard');
})->name('administrator.dashboard');

Route::get('/administrator/student', [StudentController::class, 'index'])->name('administrator.student');
Route::get('/administrator/student/create', [StudentController::class, 'create'])->name('administrator.student.create');

Route::group(['prefix' => '/bk'], function() {
    Route::get('/dashboard', [BkDashboardController::class, 'index'])->name('bk.dashboard.main');
    Route::get('/journals', [BkJournalController::class, 'index'])->name('bk.journal.main');
    Route::get('/attendances', [BkAttendanceController::class, 'index'])->name('bk.attendances.main');
});

Route::group(['prefix' => '/class-secretary'], function() {
    Route::get('/dashboard', [ClassSecretaryDashboardController::class, 'index'])->name('class-secretary.dashboard.main');
    Route::get('/journals', [ClassSecretaryJournalController::class, 'index'])->name('class-secretary.journal.main');
    Route::get('/attendances', [ClassSecretaryAttendanceController::class, 'index'])->name('class-secretary.attendances.main');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
