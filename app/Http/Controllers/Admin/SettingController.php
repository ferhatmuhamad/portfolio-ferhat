<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Edit', ['settings' => $settings]);
    }
    public function update(Request $r)
    {
        $data = $r->validate([
            'site_name' => 'required|string|max:120',
            'site_tagline' => 'nullable|string|max:200',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|array',
            'show_blog' => 'boolean',
            'show_pricing' => 'boolean',
            'show_testimonials' => 'boolean',
            'default_locale' => 'required|in:en,id',
        ]);
        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }
        return back()->with('success', 'Settings saved.');
    }
}
