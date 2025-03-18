<?php

namespace Database\Seeders;

use App\Models\ServiceCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Portrait Photography',
            'Wedding Photography',
            'Commercial Photography',
            'Product Photography',
            'Nature Photography',
            'Sports Photography',
            'Architectural Photography',
        ];

        foreach ($categories as $category) {
            ServiceCategory::factory()->create([
                'name' => $category, 
            ]);
        }
    }
}
