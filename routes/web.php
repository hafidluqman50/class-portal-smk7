<?php

use App\Http\Controllers\Administrator\JournalController as AdministratorJournal;
use App\Http\Controllers\Administrator\ClassController;
use App\Http\Controllers\Administrator\StudentController;
use App\Http\Controllers\Administrator\SubjectController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\Bk\JournalController;
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
Route::get('/administrator/subject', [SubjectController::class, 'index'])->name('administrator.subject');
Route::get('/administrator/subject/create', [SubjectController::class, 'create'])->name('administrator.subject.create');
Route::get('/administrator/class', [ClassController::class, 'index'])->name('administrator.class');
Route::get('/administrator/class/create', [ClassController::class, 'create'])->name('administrator.class.create');
Route::get('/administrator/user', [UserController::class, 'index'])->name('administrator.user');
Route::get('/administrator/user/create', [UserController::class, 'create'])->name('administrator.user.create');
Route::get('/administrator/journal', [AdministratorJournal::class, 'index'])->name('administrator.journal');


Route::get('/bk/journal', [JournalController::class, 'index'])->name('bk.journal.main');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
