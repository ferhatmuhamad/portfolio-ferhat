<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Educations/Index', [
            'educations' => Education::orderByDesc('start_date')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Educations/Form', ['education' => null]);
    }
    public function edit(Education $education)
    {
        return Inertia::render('Admin/Educations/Form', ['education' => $education]);
    }
    public function store(Request $r)
    {
        Education::create($this->validated($r));
        return redirect()->route('admin.educations.index')->with('success', 'Education created.');
    }
    public function update(Request $r, Education $education)
    {
        $education->update($this->validated($r));
        return redirect()->route('admin.educations.index')->with('success', 'Education updated.');
    }
    public function destroy(Education $education)
    {
        $education->delete();
        return back()->with('success', 'Deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'degree' => 'required|string|max:200',
            'institution' => 'required|string|max:200',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
            'description_id' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
