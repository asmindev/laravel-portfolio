<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_name' => fake()->name(),
            'client_position' => fake()->jobTitle(),
            'client_company' => fake()->company(),
            'client_image' => fake()->imageUrl(),
            'content' => fake()->paragraph(),
            'rating' => fake()->numberBetween(4, 5),
            'is_published' => true,
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
