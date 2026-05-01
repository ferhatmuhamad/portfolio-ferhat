<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::orderBy('order')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Services/Form', ['service' => null]);
    }
    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Form', ['service' => $service]);
    }
    public function store(Request $r)
    {
        Service::create($this->validated($r));
        return redirect()->route('admin.services.index')->with('success', 'Service created.');
    }
    public function update(Request $r, Service $service)
    {
        $service->update($this->validated($r));
        return redirect()->route('admin.services.index')->with('success', 'Service updated.');
    }
    public function destroy(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Service deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'title' => 'required|string|max:160',
            'title_id' => 'nullable|string|max:160',
            'icon' => 'nullable|string|max:60',
            'description' => 'required|string',
            'description_id' => 'nullable|string',
            'features' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
