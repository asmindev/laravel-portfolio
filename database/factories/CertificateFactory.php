<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Certificate>
 */
class CertificateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'issuer' => fake()->company(),
            'issue_date' => fake()->date(),
            'expiry_date' => fake()->date(),
            'credential_id' => fake()->uuid(),
            'credential_url' => fake()->url(),
            'image_url' => fake()->imageUrl(),
            'order' => fake()->numberBetween(1, 20),
        ];
    }
}
