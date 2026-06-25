<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $user = User::first();

        $projects = Project::where('user_id', $user->id)
            ->published()
            ->orderBy('order')
            ->with(['technologies', 'tags'])
            ->get();

        return Inertia::render('portfolio/index', [
            'projects' => $projects,
        ]);
    }

    public function show(string $slug)
    {
        $user = User::first();

        $project = Project::where('user_id', $user->id)
            ->published()
            ->where('slug', $slug)
            ->with(['technologies', 'tags', 'images'])
            ->firstOrFail();

        return Inertia::render('portfolio/show', [
            'project' => $project,
        ]);
    }
}
