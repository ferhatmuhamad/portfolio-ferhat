<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => app()->getLocale(),
            'site' => fn() => [
                'name' => \App\Models\Setting::get('site_name', config('app.name')),
                'tagline' => \App\Models\Setting::get('site_tagline'),
                'show_blog' => (bool) \App\Models\Setting::get('show_blog', true),
                'show_pricing' => (bool) \App\Models\Setting::get('show_pricing', true),
                'show_testimonials' => (bool) \App\Models\Setting::get('show_testimonials', true),
            ],
            'profile' => fn() => \App\Models\Profile::first(),
            'flash' => fn() => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
