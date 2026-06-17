<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectStoreRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Models\Project;
use App\Models\Tag;
use App\Models\Technology;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        $projects = Project::with(['tags', 'technologies', 'images'])->paginate(10);
        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('projects/create', [
            'tags' => Tag::all(),
            'technologies' => Technology::all(),
        ]);
    }

    public function store(ProjectStoreRequest $request)
    {
        $this->projectService->createProject($request->validated());

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $project->load(['tags', 'technologies', 'images']);
        return Inertia::render('projects/edit', [
            'project' => $project,
            'tags' => Tag::all(),
            'technologies' => Technology::all(),
        ]);
    }

    public function update(ProjectUpdateRequest $request, Project $project)
    {
        $this->projectService->updateProject($project, $request->validated());

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $this->projectService->deleteProject($project);

        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
