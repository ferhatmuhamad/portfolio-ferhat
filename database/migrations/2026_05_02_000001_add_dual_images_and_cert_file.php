<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('hero_image_path')->nullable()->after('avatar_path');
            $table->string('about_image_path')->nullable()->after('hero_image_path');
        });

        Schema::table('certifications', function (Blueprint $table) {
            $table->string('file_path')->nullable()->after('image_path');
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['hero_image_path', 'about_image_path']);
        });

        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn('file_path');
        });
    }
};
