<?php

namespace App\Services;

use App\Models\BlogPost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BlogService
{
    public function createPost(array $data)
    {
        return DB::transaction(function () use ($data) {
            $data['slug'] = Str::slug($data['title']);
            if (!isset($data['user_id'])) {
                $data['user_id'] = auth()->id();
            }
            $post = BlogPost::create($data);

            if (isset($data['categories'])) {
                $post->categories()->sync($data['categories']);
            }

            return $post;
        });
    }

    public function updatePost(BlogPost $post, array $data)
    {
        return DB::transaction(function () use ($post, $data) {
            if (isset($data['title'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            $post->update($data);

            if (isset($data['categories'])) {
                $post->categories()->sync($data['categories']);
            }

            return $post;
        });
    }

    public function deletePost(BlogPost $post)
    {
        return $post->delete();
    }
}
