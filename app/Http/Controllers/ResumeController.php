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
    public function download(): Response
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

        $html = view('resume.cv', compact(
            'user',
            'profile',
            'experiences',
            'educations',
            'skills',
            'certificates',
            'socialLinks',
            'projects',
        ))->render();

        $pdf = Browsershot::html($html)
            ->setChromePath('/usr/bin/chromium')
            ->noSandbox()
            ->showBackground()
            ->format('A4')
            ->margins(0, 0, 0, 0)
            ->pdf();

        $filename = str($profile?->full_name ?? $user->name)
            ->slug('-')
            ->append('-cv.pdf')
            ->toString();

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
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
