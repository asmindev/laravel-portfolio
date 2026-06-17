<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\User;
use Illuminate\Http\Response;
use Spatie\Browsershot\Browsershot;

class ResumeController extends Controller
{
    public function download(): \Symfony\Component\HttpFoundation\Response
    {
        $user = User::with('profile')->first();

        abort_if(! $user, 404);

        $profile = $user->profile;

        if ($profile && $profile->resume_url) {
            // Check if it's stored on public disk
            if (str_starts_with($profile->resume_url, '/storage/')) {
                $relativePath = str_replace('/storage/', '', $profile->resume_url);
                if (\Illuminate\Support\Facades\Storage::disk('public')->exists($relativePath)) {
                    $filename = str($profile->full_name ?? $user->name)
                        ->slug('-')
                        ->append('-cv.pdf')
                        ->toString();

                    return \Illuminate\Support\Facades\Storage::disk('public')->download($relativePath, $filename);
                }
            }

            // If it's a relative path like '/resume/preview', redirect to the preview route
            if ($profile->resume_url === '/resume/preview') {
                return redirect()->route('resume.preview');
            }

            // Otherwise, it might be an external URL
            return redirect($profile->resume_url);
        }

        abort(404, 'CV/Resume not found.');
    }

    public function preview(): \Illuminate\View\View
    {
        $user = User::with('profile')->first();

        abort_if(! $user, 404);

        $profile = $user->profile;

        $experiences = Experience::where('user_id', $user->id)
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->get();

        $educations = Education::where('user_id', $user->id)
            ->orderByDesc('start_date')
            ->get();

        $skills = Skill::where('user_id', $user->id)
            ->orderBy('order')
            ->orderBy('category')
            ->get();

        $certificates = Certificate::where('user_id', $user->id)
            ->orderByDesc('issue_date')
            ->get();

        $socialLinks = SocialLink::where('user_id', $user->id)
            ->orderBy('order')
            ->get();

        $projects = Project::where('user_id', $user->id)
            ->published()
            ->orderBy('order')
            ->get();

        return view('resume.cv', compact(
            'user',
            'profile',
            'experiences',
            'educations',
            'skills',
            'certificates',
            'socialLinks',
            'projects',
        ));
    }
}
