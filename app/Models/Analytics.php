<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Analytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'page_views',
        'unique_visitors',
        'project_views',
        'blog_views',
        'contact_submissions',
        'top_pages',
        'referrers',
    ];

    protected $casts = [
        'date' => 'date',
        'top_pages' => 'array',
        'referrers' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
