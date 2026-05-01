<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Skills/Index', [
            'skills' => Skill::orderBy('category')->orderBy('order')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Skills/Form', ['skill' => null]);
    }
    public function edit(Skill $skill)
    {
        return Inertia::render('Admin/Skills/Form', ['skill' => $skill]);
    }
    public function store(Request $r)
    {
        Skill::create($this->validated($r));
        return redirect()->route('admin.skills.index')->with('success', 'Skill created.');
    }
    public function update(Request $r, Skill $skill)
    {
        $skill->update($this->validated($r));
        return redirect()->route('admin.skills.index')->with('success', 'Skill updated.');
    }
    public function destroy(Skill $skill)
    {
        $skill->delete();
        return back()->with('success', 'Skill deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'name' => 'required|string|max:120',
            'category' => 'required|in:frontend,backend,cms,other',
            'icon' => 'nullable|string|max:60',
            'level' => 'required|integer|min:0|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
