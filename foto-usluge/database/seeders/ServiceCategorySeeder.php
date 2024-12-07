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
            'Portretna fotografija',
            'Fotografisanje venčanja',
            'Komercijalna fotografija',
            'Fotografisanje proizvoda',
            'Prirodna fotografija',
            'Sportska fotografija',
            'Arhitektonska fotografija',
        ];

        foreach ($categories as $category) {
            ServiceCategory::factory()->create([
                'name' => $category, 
            ]);
        }
    }
}
