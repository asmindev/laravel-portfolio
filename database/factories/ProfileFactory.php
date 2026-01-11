<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'title' => fake()->jobTitle(),
            'tagline' => fake()->sentence(),
            'bio' => fake()->paragraph(),
            'profile_image' => fake()->imageUrl(),
            'resume_url' => fake()->url(),
            'location' => fake()->city(),
            'phone' => fake()->phoneNumber(),
        ];
    }
}
