<?php

namespace App\Http\Controllers;

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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Public/Home', [
            'profile' => Profile::first(),
            'services' => Service::where('is_active', true)->orderBy('order')->get(),
            'skills' => Skill::where('is_active', true)->orderBy('order')->get(),
            'experiences' => Experience::where('is_active', true)->orderByDesc('start_date')->get(),
            'educations' => Education::where('is_active', true)->orderByDesc('start_date')->get(),
            'certifications' => Certification::where('is_active', true)->orderByDesc('issued_at')->get(),
            'projects' => Project::where('is_active', true)->orderBy('order')->orderByDesc('is_featured')->orderByDesc('completed_at')->get(),
            'testimonials' => (bool) Setting::get('show_testimonials', true)
                ? Testimonial::where('is_active', true)->orderBy('order')->get()
                : collect(),
            'pricingPlans' => (bool) Setting::get('show_pricing', true)
                ? PricingPlan::where('is_active', true)->orderBy('order')->get()
                : collect(),
            'posts' => (bool) Setting::get('show_blog', true)
                ? Post::where('is_published', true)->orderByDesc('published_at')->take(3)->get()
                : collect(),
        ]);
    }

    public function projectShow(string $slug): Response
    {
        $project = Project::where('slug', $slug)->where('is_active', true)->firstOrFail();
        $related = Project::where('is_active', true)
            ->where('id', '!=', $project->id)
            ->where('category', $project->category)
            ->take(3)->get();
        return Inertia::render('Public/ProjectShow', [
            'project' => $project,
            'related' => $related,
        ]);
    }

    public function blogIndex(): Response
    {
        return Inertia::render('Public/BlogIndex', [
            'posts' => Post::where('is_published', true)->orderByDesc('published_at')->paginate(9),
        ]);
    }

    public function blogShow(string $slug): Response
    {
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return Inertia::render('Public/BlogShow', [
            'post' => $post,
            'related' => Post::where('is_published', true)->where('id', '!=', $post->id)->take(3)->get(),
        ]);
    }

    public function contactStore(Request $request)
    {
        $data = Validator::make($request->all(), [
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:160',
            'subject' => 'nullable|string|max:160',
            'message' => 'required|string|max:5000',
        ])->validate();

        ContactMessage::create($data + ['ip_address' => $request->ip()]);
        return back()->with('success', 'Message sent! I will reply soon.');
    }

    public function setLocale(Request $request, string $locale)
    {
        if (! in_array($locale, ['en', 'id'], true)) {
            $locale = 'en';
        }
        Cookie::queue('locale', $locale, 60 * 24 * 365);
        return back();
    }
}
