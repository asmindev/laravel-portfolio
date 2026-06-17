<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function updateProfile(User $user, array $data)
    {
        // Handle profile image upload
        if (isset($data['profile_image']) && $data['profile_image'] instanceof UploadedFile) {
            // Option: delete old file if it exists and was stored in public disk
            $oldProfile = $user->profile;
            if ($oldProfile && $oldProfile->profile_image) {
                $oldPath = str_replace('/storage/', '', $oldProfile->profile_image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            // Store new file
            $path = $data['profile_image']->store('profiles', 'public');
            $data['profile_image'] = Storage::url($path);
        }

        // Handle resume file upload
        if (isset($data['resume_url']) && $data['resume_url'] instanceof UploadedFile) {
            // Delete old file if it exists and was stored in public disk
            $oldProfile = $user->profile;
            if ($oldProfile && $oldProfile->resume_url) {
                $oldPath = str_replace('/storage/', '', $oldProfile->resume_url);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            // Store new file
            $path = $data['resume_url']->store('resumes', 'public');
            $data['resume_url'] = Storage::url($path);
        }

        return $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $data
        );
    }
}
