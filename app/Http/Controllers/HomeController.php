<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Certificate;
use App\Models\Testimonial;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Assuming there is a main user (e.g., ID 1 or based on role)
        // For portfolio, it's usually a single user site.
        $user = User::with(['profile'])->first();

        if (!$user) {
           return Inertia::render('home/page', [
               'profile' => null
           ]);
        }

        $skills = Skill::where('user_id', $user->id)->orderBy('order')->get();
        $experiences = Experience::where('user_id', $user->id)->orderBy('start_date', 'desc')->get();
        $educations = Education::where('user_id', $user->id)->orderBy('start_date', 'desc')->get();
        $certificates = Certificate::where('user_id', $user->id)->orderBy('issue_date', 'desc')->get();
        $socialLinks = SocialLink::where('user_id', $user->id)->orderBy('order')->get();
        $testimonials = Testimonial::where('user_id', $user->id)->published()->orderBy('order')->get();

        return Inertia::render('home/page', [
            'user' => $user,
            'profile' => $user->profile,
            'skills' => $skills,
            'experiences' => $experiences,
            'educations' => $educations,
            'certificates' => $certificates,
            'socialLinks' => $socialLinks,
            'testimonials' => $testimonials,
        ]);
    }
}
