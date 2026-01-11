<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Certificate;
use App\Models\Comment;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\Tag;
use App\Models\Technology;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Tags and Technologies
        $tags = Tag::factory()->count(10)->create();
        $technologies = Technology::factory()->count(15)->create();
        $categories = Category::factory()->count(5)->create();

        // 2. Create Main User (Admin/Owner)
        $user = User::factory()->create([
            'name' => 'Portfolio Owner',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        // 3. Create Profile
        Profile::factory()->create(['user_id' => $user->id]);

        // 4. Create Skills, Experiences, Education
        Skill::factory()->count(10)->create(['user_id' => $user->id]);
        Experience::factory()->count(3)->create(['user_id' => $user->id]);
        Education::factory()->count(2)->create(['user_id' => $user->id]);
        Certificate::factory()->count(5)->create(['user_id' => $user->id]);
        SocialLink::factory()->count(4)->create(['user_id' => $user->id]);

        // 5. Create Projects
        Project::factory()
            ->count(6)
            ->for($user)
            ->has(ProjectImage::factory()->count(3), 'images')
            ->create()
            ->each(function ($project) use ($tags, $technologies) {
                $project->tags()->attach($tags->random(3));
                $project->technologies()->attach($technologies->random(4));
            });

        // 6. Create Blog Posts
        BlogPost::factory()
            ->count(10)
            ->for($user)
            ->has(Comment::factory()->count(3)) // Comments
            ->create()
            ->each(function ($post) use ($categories) {
                $post->categories()->attach($categories->random(2));
            });

        // 7. Testimonials
        Testimonial::factory()->count(5)->create(['user_id' => $user->id]);
    }
}
