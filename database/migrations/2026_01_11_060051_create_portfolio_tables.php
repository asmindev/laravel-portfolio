<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('detailed_description')->nullable();
            $table->longText('content')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('project_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('status')->default('completed'); // ongoing, completed, etc.
            $table->integer('order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->integer('views_count')->default(0);
            $table->timestamps();
        });

        Schema::create('project_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('image_url');
            $table->string('caption')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('color')->nullable();
            $table->timestamps();
        });

        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->string('category')->nullable(); // frontend, backend, devops, etc.
            $table->timestamps();
        });

        Schema::create('project_tag', function (Blueprint $table) {
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->primary(['project_id', 'tag_id']);
        });

        Schema::create('project_technology', function (Blueprint $table) {
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('technology_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->primary(['project_id', 'technology_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_technology');
        Schema::dropIfExists('project_tag');
        Schema::dropIfExists('technologies');
        Schema::dropIfExists('tags');
        Schema::dropIfExists('project_images');
        Schema::dropIfExists('projects');
    }
};
