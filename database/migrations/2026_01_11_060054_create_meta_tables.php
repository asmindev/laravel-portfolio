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
        Schema::create('analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->integer('page_views')->default(0);
            $table->integer('unique_visitors')->default(0);
            $table->integer('project_views')->default(0);
            $table->integer('blog_views')->default(0);
            $table->integer('contact_submissions')->default(0);
            $table->json('top_pages')->nullable();
            $table->json('referrers')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'date']);
        });

        Schema::create('seo_meta', function (Blueprint $table) {
            $table->id();
            $table->string('page_type'); // home, project, blog, static_page
            $table->unsignedBigInteger('reference_id')->nullable(); // project_id, blog_post_id
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('og_image')->nullable();
            $table->text('schema_markup')->nullable();
            $table->timestamps();

            $table->index(['page_type', 'reference_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seo_meta');
        Schema::dropIfExists('analytics');
    }
};
