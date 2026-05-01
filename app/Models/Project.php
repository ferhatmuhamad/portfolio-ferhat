<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $guarded = [];
    protected $casts = [
        'gallery' => 'array',
        'tech_stack' => 'array',
        'completed_at' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = ['cover_url', 'gallery_urls'];

    protected static function booted(): void
    {
        static::saving(function (self $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title) . '-' . Str::random(6);
            }
        });
    }

    public function getCoverUrlAttribute(): ?string
    {
        return $this->cover_path ? asset('storage/' . $this->cover_path) : null;
    }

    public function getGalleryUrlsAttribute(): array
    {
        return collect($this->gallery ?? [])->map(fn($p) => asset('storage/' . $p))->all();
    }
}
