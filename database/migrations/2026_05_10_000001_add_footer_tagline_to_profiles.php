<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('footer_tagline', 280)->nullable()->after('summary_id');
            $table->string('footer_tagline_id', 280)->nullable()->after('footer_tagline');
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['footer_tagline', 'footer_tagline_id']);
        });
    }
};
