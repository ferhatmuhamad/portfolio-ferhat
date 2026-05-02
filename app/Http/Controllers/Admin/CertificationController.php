<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Support\HandlesUploads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificationController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        return Inertia::render('Admin/Certifications/Index', [
            'certifications' => Certification::orderByDesc('issued_at')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Certifications/Form', ['certification' => null]);
    }
    public function edit(Certification $certification)
    {
        return Inertia::render('Admin/Certifications/Form', ['certification' => $certification]);
    }
    public function store(Request $r)
    {
        $data = $this->validated($r);
        $data['image_path'] = $this->handleUpload($r->file('image'), null, 'certs');
        $data['file_path'] = $this->handleUpload($r->file('file'), null, 'certs');
        unset($data['image'], $data['file']);
        Certification::create($data);
        return redirect()->route('admin.certifications.index')->with('success', 'Certification created.');
    }
    public function update(Request $r, Certification $certification)
    {
        $data = $this->validated($r);
        $data['image_path'] = $this->handleUpload($r->file('image'), $certification->image_path, 'certs');
        $data['file_path'] = $this->handleUpload($r->file('file'), $certification->file_path, 'certs');
        unset($data['image'], $data['file']);
        $certification->update($data);
        return redirect()->route('admin.certifications.index')->with('success', 'Certification updated.');
    }
    public function destroy(Certification $certification)
    {
        $this->deleteFile($certification->image_path);
        $this->deleteFile($certification->file_path);
        $certification->delete();
        return back()->with('success', 'Deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'title' => 'required|string|max:200',
            'issuer' => 'required|string|max:160',
            'issued_at' => 'required|date',
            'credential_url' => 'nullable|url|max:500',
            'image' => 'nullable|image|max:4096',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:8192',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
