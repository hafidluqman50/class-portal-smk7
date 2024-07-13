<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Administrator/Class/Main');
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/Class/Create');
    }
}
