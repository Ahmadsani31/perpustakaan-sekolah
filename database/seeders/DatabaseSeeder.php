<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(1150)->create();
        // User::factory()->create([
        //     'name' => 'Darma sani',
        //     'username' => 'darma',
        //     'email' => 'darma@gmail.com'
        // ]);

        // $this->call(CategorySeeder::class);
        // $this->call(PublisherSeeder::class);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
