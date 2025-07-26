<?php

namespace Database\Factories;

use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'price' => $this->faker->numberBetween(10, 100), 
            'description' => $this->faker->paragraph(), 
            'service_category_id' => ServiceCategory::inRandomOrder()->first()->id,
            'seller_id'           => User::factory()->state(['role' => 'seller']),
        ];
    }
}
