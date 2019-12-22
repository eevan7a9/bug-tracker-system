<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "version" => "required",
            "type" => "required",
            "os" => "required",
            "description" => "required",
            "started" => "required|date",
            "released" => "required|date",
        ]);

        $project = new Project();
        $project->name = $validated['name'];
        $project->version = $validated['version'];
        $project->type = $validated['type'];
        $project->os = $validated['os'];
        $project->description = $validated['description'];
        $project->development_start = $validated['started'];
        $project->release_date = $validated['released'];
        $project->save();

        return response()->json($project, 201);
    }

}
