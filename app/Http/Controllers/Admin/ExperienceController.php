<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Support\HandlesUploads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => Experience::orderByDesc('start_date')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Experiences/Form', ['experience' => null]);
    }
    public function edit(Experience $experience)
    {
        return Inertia::render('Admin/Experiences/Form', ['experience' => $experience]);
    }
    public function store(Request $r)
    {
        $data = $this->validated($r);
        $data['logo_path'] = $this->handleUpload($r->file('logo'), null, 'logos');
        unset($data['logo']);
        Experience::create($data);
        return redirect()->route('admin.experiences.index')->with('success', 'Experience created.');
    }
    public function update(Request $r, Experience $experience)
    {
        $data = $this->validated($r);
        $data['logo_path'] = $this->handleUpload($r->file('logo'), $experience->logo_path, 'logos');
        unset($data['logo']);
        $experience->update($data);
        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated.');
    }
    public function destroy(Experience $experience)
    {
        $this->deleteFile($experience->logo_path);
        $experience->delete();
        return back()->with('success', 'Experience deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'role' => 'required|string|max:160',
            'company' => 'required|string|max:160',
            'location' => 'nullable|string|max:160',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
            'description_id' => 'nullable|string',
            'highlights' => 'nullable|array',
            'highlights_id' => 'nullable|array',
            'logo' => 'nullable|image|max:2048',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
