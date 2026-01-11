<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function edit()
    {
        $user = auth()->user();
        $user->load('profile');

        return Inertia::render('Profile/Edit', [
            'profile' => $user->profile,
            'user' => $user
        ]);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $this->profileService->updateProfile(auth()->user(), $request->validated());

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
