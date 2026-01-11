<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Education>
 */
class EducationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'institution' => fake()->company() . ' University', // Valid way to fake university
            'degree' => fake()->randomElement(['Bachelor', 'Master', 'PhD']),
            'field_of_study' => fake()->word() . ' Science',
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'gpa' => fake()->randomFloat(2, 2.0, 4.0),
            'description' => fake()->sentence(),
            'logo' => fake()->imageUrl(),
            'order' => fake()->numberBetween(1, 5),
        ];
    }
}
