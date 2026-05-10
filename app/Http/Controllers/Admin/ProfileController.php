<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Support\HandlesUploads;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    use HandlesUploads;

    public function edit(): Response
    {
        $profile = Profile::firstOrCreate(['id' => 1], [
            'name' => 'Your Name',
            'headline' => '',
            'summary' => '',
            'email' => 'you@example.com',
        ]);
        return Inertia::render('Admin/Profile/Edit', ['profile' => $profile]);
    }

    public function update(Request $request)
    {
        $profile = Profile::firstOrFail();

        $data = $request->validate([
            'name' => 'required|string|max:160',
            'headline' => 'required|string|max:200',
            'summary' => 'required|string',
            'summary_id' => 'nullable|string',
            'footer_tagline' => 'nullable|string|max:280',
            'footer_tagline_id' => 'nullable|string|max:280',
            'email' => 'required|email|max:160',
            'phone' => 'nullable|string|max:40',
            'whatsapp' => 'nullable|string|max:30',
            'location' => 'nullable|string|max:160',
            'socials' => 'nullable|array',
            'stats' => 'nullable|array',
            'avatar' => 'nullable|image|max:4096',
            'hero_image' => 'nullable|image|max:6144',
            'about_image' => 'nullable|image|max:6144',
            'cv' => 'nullable|file|mimes:pdf|max:8192',
        ]);

        $data['avatar_path'] = $this->handleUpload($request->file('avatar'), $profile->avatar_path, 'avatars');
        $data['hero_image_path'] = $this->handleUpload($request->file('hero_image'), $profile->hero_image_path, 'profile');
        $data['about_image_path'] = $this->handleUpload($request->file('about_image'), $profile->about_image_path, 'profile');
        $data['cv_path'] = $this->handleUpload($request->file('cv'), $profile->cv_path, 'cv');
        unset($data['avatar'], $data['hero_image'], $data['about_image'], $data['cv']);

        $profile->update($data);
        return back()->with('success', 'Profile updated.');
    }
}
