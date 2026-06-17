<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectService
{
    public function createProject(array $data)
    {
        return DB::transaction(function () use ($data) {
            $data['slug'] = Str::slug($data['title']);
            if (!isset($data['user_id'])) {
                $data['user_id'] = auth()->id();
            }
            $project = Project::create($data);

            if (isset($data['tags'])) {
                $project->tags()->sync($data['tags']);
            }

            if (isset($data['technologies'])) {
                $project->technologies()->sync($data['technologies']);
            }

            if (isset($data['images'])) {
                // Logic to handle images would go here
                // For now assuming images handled separately or via another method
            }

            return $project;
        });
    }

    public function updateProject(Project $project, array $data)
    {
        return DB::transaction(function () use ($project, $data) {
            if (isset($data['title'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            $project->update($data);

            if (isset($data['tags'])) {
                $project->tags()->sync($data['tags']);
            }

            if (isset($data['technologies'])) {
                $project->technologies()->sync($data['technologies']);
            }

            return $project;
        });
    }

    public function deleteProject(Project $project)
    {
        return $project->delete();
    }
}
