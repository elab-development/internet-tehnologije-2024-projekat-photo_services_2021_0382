<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', 
        'price',
        'payment_type', 
        'date',
        'notes', 
        'service_id', 
        'buyer_id', 
        'seller_id', 
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    // Relacija sa kupcem
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    // Relacija sa prodavcem
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    protected $casts = [
        'date' => 'datetime',
    ];
}