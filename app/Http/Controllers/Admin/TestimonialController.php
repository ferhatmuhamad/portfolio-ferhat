<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Support\HandlesUploads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        return Inertia::render('Admin/Testimonials/Index', ['testimonials' => Testimonial::orderBy('order')->get()]);
    }
    public function create()
    {
        return Inertia::render('Admin/Testimonials/Form', ['testimonial' => null]);
    }
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Form', ['testimonial' => $testimonial]);
    }

    public function store(Request $r)
    {
        $data = $this->validated($r);
        $data['avatar_path'] = $this->handleUpload($r->file('avatar'), null, 'testimonials');
        unset($data['avatar']);
        Testimonial::create($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created.');
    }
    public function update(Request $r, Testimonial $testimonial)
    {
        $data = $this->validated($r);
        $data['avatar_path'] = $this->handleUpload($r->file('avatar'), $testimonial->avatar_path, 'testimonials');
        unset($data['avatar']);
        $testimonial->update($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }
    public function destroy(Testimonial $testimonial)
    {
        $this->deleteFile($testimonial->avatar_path);
        $testimonial->delete();
        return back()->with('success', 'Deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'name' => 'required|string|max:160',
            'role' => 'required|string|max:160',
            'company' => 'nullable|string|max:160',
            'quote' => 'required|string',
            'quote_id' => 'nullable|string',
            'rating' => 'required|integer|min:1|max:5',
            'avatar' => 'nullable|image|max:2048',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
