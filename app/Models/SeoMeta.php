<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    use HasFactory;

    protected $table = 'seo_meta';

    protected $fillable = [
        'page_type',
        'reference_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_image',
        'schema_markup',
    ];

    // Polymorphic or manual relationship approach?
    // Since page_type is string and reference_id is int, it's a manual polymorphic relation.
    // Ideally use morphTo but we named columns differently in migration.
    // Migration: page_type + reference_id.
    // Let's create a dynamic relationship method.

    public function seoable()
    {
        // This is a custom polymorphic implementation or standard if we map page_type to classes.
        // Assuming page_type is 'project', 'blog', etc.
        // We might want to use a morph map or just handle logic in service.
        // For now, no direct Eloquent relationship defined as 'seoable' unless we renaming columns or valid types.
        // Let's keep it simple.
    }
}
