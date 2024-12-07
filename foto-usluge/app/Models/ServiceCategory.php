<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ServiceCategory extends Model
{
    use HasFactory;

    protected $table = 'service_categories';

    protected $fillable = [
        'name', 
        'description', 
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}