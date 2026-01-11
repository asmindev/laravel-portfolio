<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialLink>
 */
class SocialLinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'platform' => fake()->randomElement(['GitHub', 'LinkedIn', 'Twitter', 'Facebook']),
            'url' => fake()->url(),
            'icon' => null,
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
