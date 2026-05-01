<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Support\HandlesUploads;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Projects/Form', ['project' => null]);
    }
    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Form', ['project' => $project]);
    }

    public function store(Request $r)
    {
        $data = $this->validated($r);
        $data['cover_path'] = $this->handleUpload($r->file('cover'), null, 'projects/covers');
        $data['gallery'] = $this->handleGallery($r, []);
        unset($data['cover'], $data['gallery_files']);
        Project::create($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function update(Request $r, Project $project)
    {
        $data = $this->validated($r);
        $data['cover_path'] = $this->handleUpload($r->file('cover'), $project->cover_path, 'projects/covers');
        $data['gallery'] = $this->handleGallery($r, $project->gallery ?? []);
        unset($data['cover'], $data['gallery_files']);
        $project->update($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        $this->deleteFile($project->cover_path);
        foreach ($project->gallery ?? [] as $g) $this->deleteFile($g);
        $project->delete();
        return back()->with('success', 'Deleted.');
    }

    private function handleGallery(Request $r, array $existing): array
    {
        $kept = $r->input('gallery', []);
        // Delete files removed from kept
        foreach ($existing as $old) {
            if (! in_array($old, $kept, true)) {
                Storage::disk('public')->delete($old);
            }
        }
        $newFiles = $r->file('gallery_files', []);
        foreach ($newFiles as $f) {
            $kept[] = $f->store('projects/gallery', 'public');
        }
        return array_values(array_unique($kept));
    }

    private function validated(Request $r): array
    {
        return $r->validate([
            'title' => 'required|string|max:200',
            'category' => 'required|string|max:60',
            'client' => 'nullable|string|max:160',
            'summary' => 'required|string',
            'summary_id' => 'nullable|string',
            'content' => 'nullable|string',
            'content_id' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'live_url' => 'nullable|url|max:500',
            'repo_url' => 'nullable|url|max:500',
            'completed_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
            'cover' => 'nullable|image|max:4096',
            'gallery' => 'nullable|array',
            'gallery_files' => 'nullable|array',
            'gallery_files.*' => 'image|max:4096',
        ]);
    }
}
