<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('status')->default('pending'); 
            $table->integer('price');
            $table->string('payment_type')->nullable(); 
            $table->date('date')->nullable(); 
            $table->text('notes')->nullable(); 
            $table->unsignedBigInteger('service_id'); 
            $table->unsignedBigInteger('buyer_id'); 
            $table->unsignedBigInteger('seller_id'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
