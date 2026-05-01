<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $guarded = [];
    protected $casts = ['value' => 'array'];

    public static function get(string $key, $default = null)
    {
        $row = static::where('key', $key)->first();
        return $row?->value ?? $default;
    }

    public static function set(string $key, $value, string $group = 'general'): self
    {
        return static::updateOrCreate(['key' => $key], ['value' => $value, 'group' => $group]);
    }
}
