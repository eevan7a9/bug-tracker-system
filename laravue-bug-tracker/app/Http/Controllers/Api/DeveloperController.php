<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class DeveloperController extends Controller
{
    public function index()
    {
        $role_name = "developer";
        $developers = User::with('bugsAssigned')->whereHas('roles', function ($q) use ($role_name) {
            $q->where('name', $role_name);
        })->get();

        return response()->json($developers, 200);
    }

    public function store(Request $request)
    {
        $user = User::with('bugsAssigned')->where('email', $request->email)->first();
        if (!$user) {
            return response()->json("Cannot find user.", 400);
        }

        $role = Role::where('name', 'developer')->first();

        if (!$role) {
            return response()->json("error", 400);
        }

        $user->roles()->sync($role); // attach user the role of developer
        $user->roles;
        return response()->json($user, 201);
        // return response()->json($user);
    }
    public function show($id)
    {
        $developer = User::with('bugsAssigned')->with('roles')->findOrFail($id);
        return response()->json($developer, 200);
    }

    public function destroy($id)
    {

        $role = Role::where('name', 'developer')->first();

        $user = User::findOrFail($id);

        $user->roles()->detach($role);
        return response()->json("success", 200);
    }
}
