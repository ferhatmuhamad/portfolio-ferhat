<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    protected $guarded = [];
    protected $casts = [
        'features' => 'array',
        'features_id' => 'array',
        'is_popular' => 'boolean',
        'is_active' => 'boolean',
    ];
}
