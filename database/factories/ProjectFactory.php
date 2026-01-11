<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraph(),
            'detailed_description' => fake()->paragraphs(3, true),
            'thumbnail' => fake()->imageUrl(),
            'project_url' => fake()->url(),
            'github_url' => fake()->url(),
            'demo_url' => fake()->url(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'status' => fake()->randomElement(['completed', 'ongoing', 'archived']),
            'order' => fake()->numberBetween(1, 100),
            'is_featured' => fake()->boolean(20),
            'is_published' => fake()->boolean(90),
            'views_count' => fake()->numberBetween(0, 1000),
        ];
    }
}
