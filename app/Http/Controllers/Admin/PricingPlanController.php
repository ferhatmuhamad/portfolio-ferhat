<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingPlanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pricing/Index', ['plans' => PricingPlan::orderBy('order')->get()]);
    }
    public function create()
    {
        return Inertia::render('Admin/Pricing/Form', ['plan' => null]);
    }
    public function edit(PricingPlan $plan)
    {
        return Inertia::render('Admin/Pricing/Form', ['plan' => $plan]);
    }
    public function store(Request $r)
    {
        PricingPlan::create($this->validated($r));
        return redirect()->route('admin.pricing.index')->with('success', 'Plan created.');
    }
    public function update(Request $r, PricingPlan $plan)
    {
        $plan->update($this->validated($r));
        return redirect()->route('admin.pricing.index')->with('success', 'Plan updated.');
    }
    public function destroy(PricingPlan $plan)
    {
        $plan->delete();
        return back()->with('success', 'Deleted.');
    }
    private function validated(Request $r): array
    {
        return $r->validate([
            'name' => 'required|string|max:120',
            'name_id' => 'nullable|string|max:120',
            'tagline' => 'nullable|string|max:200',
            'tagline_id' => 'nullable|string|max:200',
            'price' => 'nullable|numeric|min:0',
            'price_usd' => 'nullable|numeric|min:0',
            'currency' => 'required|string|max:8',
            'billing_period' => 'nullable|string|max:60',
            'features' => 'nullable|array',
            'features_id' => 'nullable|array',
            'is_popular' => 'boolean',
            'cta_label' => 'nullable|string|max:60',
            'cta_url' => 'nullable|string|max:500',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
    }
}
