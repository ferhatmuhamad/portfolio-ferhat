<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $guarded = [];
    protected $casts = ['features' => 'array', 'is_active' => 'boolean'];
}
