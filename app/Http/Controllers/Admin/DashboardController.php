<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Post;
use App\Models\PricingPlan;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                ['label' => 'Projects', 'value' => Project::count(), 'icon' => 'Briefcase'],
                ['label' => 'Experiences', 'value' => Experience::count(), 'icon' => 'Building2'],
                ['label' => 'Skills', 'value' => Skill::count(), 'icon' => 'Sparkles'],
                ['label' => 'Services', 'value' => Service::count(), 'icon' => 'Wrench'],
                ['label' => 'Certifications', 'value' => Certification::count(), 'icon' => 'Award'],
                ['label' => 'Education', 'value' => Education::count(), 'icon' => 'GraduationCap'],
                ['label' => 'Testimonials', 'value' => Testimonial::count(), 'icon' => 'MessageCircle'],
                ['label' => 'Pricing Plans', 'value' => PricingPlan::count(), 'icon' => 'Tag'],
                ['label' => 'Blog Posts', 'value' => Post::count(), 'icon' => 'BookOpen'],
                ['label' => 'Unread Messages', 'value' => ContactMessage::where('is_read', false)->count(), 'icon' => 'Mail'],
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get(),
        ]);
    }
}
