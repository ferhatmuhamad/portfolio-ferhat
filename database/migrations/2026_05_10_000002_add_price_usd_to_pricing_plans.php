<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            // Optional curated USD price. When set, the public pricing page
            // uses this value verbatim for the USD currency toggle instead
            // of converting from the IDR `price` column.
            $table->decimal('price_usd', 12, 2)->nullable()->after('currency');
        });
    }

    public function down(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->dropColumn('price_usd');
        });
    }
};
