<?php

namespace App\Http\Controllers\Bk;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JournalController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Bk/Journal/Main');
    }
}
