<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;

class ProfileService
{
    public function updateProfile(User $user, array $data)
    {
        return $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $data
        );
    }
}
