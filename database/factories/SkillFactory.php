<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Skill>
 */
class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'category' => fake()->randomElement(['Language', 'Framework', 'Tool', 'Soft Skill']),
            'proficiency_level' => fake()->numberBetween(1, 100),
            'icon' => null,
            'order' => fake()->numberBetween(1, 50),
        ];
    }
}
