<?php

use App\Http\Controllers\Administrator\DashboardController as AdministratorDashboardController;
use App\Http\Controllers\Administrator\JournalController as AdministratorJournalController;
use App\Http\Controllers\Administrator\ClassController as AdministratorClassController;
use App\Http\Controllers\Administrator\StudentController as AdministratorStudentController;
use App\Http\Controllers\Administrator\SubjectController as AdministratorSubjectController;
use App\Http\Controllers\Administrator\UserController as AdministratorUserController;

use App\Http\Controllers\Bk\JournalController;

use App\Http\Controllers\Bk\JournalController as BkJournalController;
use App\Http\Controllers\Bk\DashboardController as BkDashboardController;
use App\Http\Controllers\Bk\AttendanceController as BkAttendanceController;

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

Route::group(['prefix' => '/administrator'], function() {
    Route::get('/dashboard', [AdministratorDashboardController::class, 'index'])->name('administrator.dashboard');
    Route::get('/student', [AdministratorStudentController::class, 'index'])->name('administrator.student');
    Route::get('/student/create', [AdministratorStudentController::class, 'create'])->name('administrator.student.create');
    Route::get('/subject', [AdministratorSubjectController::class, 'index'])->name('administrator.subject');
    Route::get('/subject/create', [AdministratorSubjectController::class, 'create'])->name('administrator.subject.create');
    Route::get('/class', [AdministratorClassController::class, 'index'])->name('administrator.class');
    Route::get('/class/create', [AdministratorClassController::class, 'create'])->name('administrator.class.create');
    Route::get('/user', [AdministratorUserController::class, 'index'])->name('administrator.user');
    Route::get('/user/create', [AdministratorUserController::class, 'create'])->name('administrator.user.create');
    Route::get('/journal', [AdministratorJournalController::class, 'create'])->name('administrator.journal');
});

Route::get('/bk/journal', [JournalController::class, 'index'])->name('bk.journal.main');

Route::group(['prefix' => '/bk'], function() {
    Route::get('/dashboard', [BkDashboardController::class, 'index'])->name('bk.dashboard.main');
    Route::get('/journals', [BkJournalController::class, 'index'])->name('bk.journal.main');
    Route::get('/attendances', [BkAttendanceController::class, 'index'])->name('bk.attendances.main');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
