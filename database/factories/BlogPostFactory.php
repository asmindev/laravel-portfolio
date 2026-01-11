<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'featured_image' => fake()->imageUrl(),
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'is_published' => fake()->boolean(80),
            'is_featured' => fake()->boolean(10),
            'views_count' => fake()->numberBetween(0, 5000),
            'reading_time' => fake()->numberBetween(1, 15),
        ];
    }
}
