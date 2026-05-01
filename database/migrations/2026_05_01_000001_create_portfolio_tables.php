<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // ----- Add admin role to users -----
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false)->after('password');
        });

        // ----- General site settings (key/value) -----
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->string('group')->default('general')->index();
            $table->timestamps();
        });

        // ----- Profile (singleton-ish; first row used) -----
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('headline');
            $table->text('summary');
            $table->text('summary_id')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('location')->nullable();
            $table->string('avatar_path')->nullable();
            $table->string('cv_path')->nullable();
            $table->json('socials')->nullable(); // { github, linkedin, instagram, twitter, ... }
            $table->json('stats')->nullable();   // [{label, label_id, value, suffix}]
            $table->timestamps();
        });

        // ----- Services (apa yang ditawarkan) -----
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_id')->nullable();
            $table->string('icon')->nullable(); // lucide icon name
            $table->text('description');
            $table->text('description_id')->nullable();
            $table->json('features')->nullable();
            $table->unsignedInteger('order')->default(0)->index();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Skills -----
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->index(); // frontend / backend / cms / other
            $table->string('icon')->nullable();
            $table->unsignedTinyInteger('level')->default(80); // 0-100
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Experiences -----
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('role');
            $table->string('company');
            $table->string('location')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable(); // null = ongoing
            $table->text('description')->nullable();
            $table->text('description_id')->nullable();
            $table->json('highlights')->nullable();    // EN bullet list
            $table->json('highlights_id')->nullable(); // ID bullet list
            $table->string('logo_path')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Education -----
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('degree');
            $table->string('institution');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('description')->nullable();
            $table->text('description_id')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Certifications -----
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->date('issued_at');
            $table->string('credential_url')->nullable();
            $table->string('image_path')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Projects / Portfolio -----
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->index(); // wordpress / laravel / react / odoo / nextjs / vue
            $table->string('client')->nullable();
            $table->text('summary');
            $table->text('summary_id')->nullable();
            $table->longText('content')->nullable();
            $table->longText('content_id')->nullable();
            $table->string('cover_path')->nullable();
            $table->json('gallery')->nullable();
            $table->json('tech_stack')->nullable();
            $table->string('live_url')->nullable();
            $table->string('repo_url')->nullable();
            $table->date('completed_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // ----- Testimonials -----
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('company')->nullable();
            $table->text('quote');
            $table->text('quote_id')->nullable();
            $table->string('avatar_path')->nullable();
            $table->unsignedTinyInteger('rating')->default(5);
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Pricing plans -----
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_id')->nullable();
            $table->string('tagline')->nullable();
            $table->string('tagline_id')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->string('currency', 8)->default('IDR');
            $table->string('billing_period')->nullable(); // /project, /month
            $table->json('features')->nullable();    // EN
            $table->json('features_id')->nullable(); // ID
            $table->boolean('is_popular')->default(false);
            $table->string('cta_label')->nullable();
            $table->string('cta_url')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ----- Blog posts -----
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_id')->nullable();
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->text('excerpt_id')->nullable();
            $table->longText('content')->nullable();
            $table->longText('content_id')->nullable();
            $table->string('cover_path')->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->unsignedInteger('reading_minutes')->default(5);
            $table->timestamps();
        });

        // ----- Contact messages -----
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('ip_address')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('pricing_plans');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('services');
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('settings');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }
};
