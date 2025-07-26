<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'price' => $this->price,
            'payment_type' => $this->payment_type,
            'date' => $this->date ? $this->date->format('Y-m-d') : null,
            'notes' => $this->notes,
            'service' => [
                'id' => $this->service->id,
                'name' => $this->service->name,
                'description' => $this->service->description,
                'category' => $this->service->serviceCategory->name ?? 'No Category',
            ],
            'buyer' => [
                'id' => $this->buyer->id,
                'email' => $this->buyer->email,
            ],
            'seller' => [
                'id' => $this->seller->id,
                'email' => $this->seller->email,
            ],
        ];
    }
}
