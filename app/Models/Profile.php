<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded = [];

    protected $casts = [
        'socials' => 'array',
        'stats' => 'array',
    ];

    protected $appends = ['avatar_url', 'cv_url', 'hero_image_url', 'about_image_url'];

    public function getAvatarUrlAttribute(): ?string
    {
        return $this->avatar_path ? asset('storage/' . $this->avatar_path) : null;
    }

    public function getCvUrlAttribute(): ?string
    {
        return $this->cv_path ? asset('storage/' . $this->cv_path) : null;
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        return $this->hero_image_path ? asset('storage/' . $this->hero_image_path) : null;
    }

    public function getAboutImageUrlAttribute(): ?string
    {
        return $this->about_image_path ? asset('storage/' . $this->about_image_path) : null;
    }
}
