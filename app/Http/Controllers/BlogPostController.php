<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogPostStoreRequest;
use App\Http\Requests\BlogPostUpdateRequest;
use App\Models\BlogPost;
use App\Models\Category;
use App\Services\BlogService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    protected $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function index()
    {
        $posts = BlogPost::with(['categories', 'user'])->latest()->paginate(10);
        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('blog/create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(BlogPostStoreRequest $request)
    {
        $this->blogService->createPost($request->validated());

        return redirect()->route('blog.index')->with('success', 'Post created successfully.');
    }

    public function edit(BlogPost $blogPost)
    {
        $blogPost->load(['categories']);
        return Inertia::render('blog/edit', [
            'post' => $blogPost,
            'categories' => Category::all(),
        ]);
    }

    public function update(BlogPostUpdateRequest $request, BlogPost $blogPost)
    {
        $this->blogService->updatePost($blogPost, $request->validated());

        return redirect()->route('blog.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(BlogPost $blogPost)
    {
        $this->blogService->deletePost($blogPost);

        return redirect()->back()->with('success', 'Post deleted successfully.');
    }
}
