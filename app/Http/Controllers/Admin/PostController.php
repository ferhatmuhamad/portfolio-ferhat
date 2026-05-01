<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Support\HandlesUploads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        return Inertia::render('Admin/Posts/Index', ['posts' => Post::orderByDesc('created_at')->get()]);
    }
    public function create()
    {
        return Inertia::render('Admin/Posts/Form', ['post' => null]);
    }
    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Form', ['post' => $post]);
    }
    public function store(Request $r)
    {
        $data = $this->validated($r);
        $data['cover_path'] = $this->handleUpload($r->file('cover'), null, 'posts');
        unset($data['cover']);
        if (! empty($data['is_published']) && empty($data['published_at'])) $data['published_at'] = now();
        Post::create($data);
        return redirect()->route('admin.posts.index')->with('success', 'Post created.');
    }
    public function update(Request $r, Post $post)
    {
        $data = $this->validated($r);
        $data['cover_path'] = $this->handleUpload($r->file('cover'), $post->cover_path, 'posts');
        unset($data['cover']);
        if (! empty($data['is_published']) && empty($post->published_at) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }
        $post->update($data);
        return redirect()->route('admin.posts.index')->with('success', 'Post updated.');
    }
    public function destroy(Post $post)
    {
        $this->deleteFile($post->cover_path);
        $post->delete();
        return back()->with('success', 'Deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'title' => 'required|string|max:200',
            'title_id' => 'nullable|string|max:200',
            'slug' => 'nullable|string|max:200|unique:posts,slug,' . ($r->route('post')?->id ?? 'NULL'),
            'excerpt' => 'nullable|string',
            'excerpt_id' => 'nullable|string',
            'content' => 'nullable|string',
            'content_id' => 'nullable|string',
            'tags' => 'nullable|array',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'reading_minutes' => 'nullable|integer|min:1|max:120',
            'cover' => 'nullable|image|max:4096',
        ]);
    }
}
