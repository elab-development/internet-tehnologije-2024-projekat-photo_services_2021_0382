<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\\Database\\Factories\\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_picture',  // added to allow mass assignment
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relationship: Offers where this user is the buyer
     */
    public function buyerOffers()
    {
        return $this->hasMany(Offer::class, 'buyer_id');
    }

    /**
     * Relationship: Offers where this user is the seller
     */
    public function sellerOffers()
    {
        return $this->hasMany(Offer::class, 'seller_id');
    }

    /**
     * Usluge koje je korisnik kreirao kao prodavac
    */
    public function services()
    {
        return $this->hasMany(Service::class, 'seller_id');
    }

}
