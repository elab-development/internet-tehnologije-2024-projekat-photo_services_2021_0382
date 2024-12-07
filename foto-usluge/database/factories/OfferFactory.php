<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $buyer = User::factory(['role' => 'buyer'])->create(); 
        $seller = User::factory(['role' => 'seller'])->create(); 

        return [
            'service_id' => Service::inRandomOrder()->first()->id,
            'buyer_id' => $buyer->id, 
            'seller_id' => $seller->id, 
            'status' => $this->faker->randomElement(['pending', 'accepted', 'rejected']), 
            'price' => $this->faker->numberBetween(10, 100), 
            'payment_type' => $this->faker->randomElement(['credit card', 'cash', 'bank transfer']), 
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'), 
            'notes' => $this->faker->sentence(), 
        ];
    }
}
