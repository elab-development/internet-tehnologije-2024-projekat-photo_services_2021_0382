<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Models\Offer;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->check() || auth()->user()->role !== 'buyer') {
            return response()->json(['error' => 'Unauthorized. Only buyers can create offers.'], 403);
        }
    
        $validated = $request->validate([
            'service_id'   => 'required|exists:services,id',
            'seller_id'    => 'required|exists:users,id',
            'payment_type' => 'required|string|in:credit card,cash,bank transfer',
            'date'         => 'required|date',
            'notes'        => 'nullable|string',
        ]);
    
        $service = Service::find($validated['service_id']);
        $seller  = User::find($validated['seller_id']);
    
        if ($seller->role !== 'seller') {
            return response()->json(['error' => 'Seller ID must belong to a user with the seller role.'], 403);
        }
    
        $offer = Offer::create([
            'service_id'   => $service->id,
            'seller_id'    => $seller->id,
            'buyer_id'     => auth()->id(),
            'price'        => $service->price,
            'payment_type' => $validated['payment_type'],
            'date'         => $validated['date'],
            'notes'        => $validated['notes'] ?? null,
            'status'       => 'pending',
        ]);
    
        return response()->json([
            'message' => 'Offer created successfully!',
            'offer'   => new OfferResource($offer),
        ], 201);
    }
    
    public function updateByBuyer(Request $request, $id)
    {
        if (!auth()->check() || auth()->user()->role !== 'buyer') {
            return response()->json(['error' => 'Unauthorized. Only buyers can update their offers.'], 403);
        }

        $validated = $request->validate([
            'payment_type' => 'required|string|in:credit card,cash,bank transfer',
            'date'         => 'required|date',
            'notes'        => 'required|string',
        ]);

        $offer = Offer::where('id', $id)
            ->where('buyer_id', auth()->id())
            ->first();

        if (!$offer) {
            return response()->json(['error' => 'Offer not found or you do not have access to update it.'], 404);
        }

        $offer->update($validated);

        return response()->json([
            'message' => 'Offer updated successfully!',
            'offer'   => new OfferResource($offer),
        ]);
    }

    public function updateBySeller(Request $request, $id)
    {
        if (!auth()->check() || auth()->user()->role !== 'seller') {
            return response()->json(['error' => 'Unauthorized. Only sellers can update offers.'], 403);
        }

        $validated = $request->validate([
            'price'  => 'required|integer',
            'status' => 'nullable|string|in:pending,accepted,rejected',
        ]);

        $offer = Offer::where('id', $id)
            ->where('seller_id', auth()->id())
            ->first();

        if (!$offer) {
            return response()->json(['error' => 'Offer not found or you do not have access to update it.'], 404);
        }

        $offer->update($validated);

        return response()->json([
            'message' => 'Offer updated successfully!',
            'offer'   => new OfferResource($offer),
        ]);
    }

    public function delete(Request $request, $id)
    {
        if (!auth()->check() || auth()->user()->role !== 'buyer') {
            return response()->json(['error' => 'Unauthorized. Only buyers can delete their offers.'], 403);
        }

        $offer = Offer::where('id', $id)
            ->where('buyer_id', auth()->id())
            ->first();

        if (!$offer) {
            return response()->json(['error' => 'Offer not found or you do not have access to delete it.'], 404);
        }

        $offer->delete();

        return response()->json([
            'message' => 'Offer deleted successfully!',
        ]);
    }

    /**
     * Retrieve all offers for the authenticated buyer.
     */
    public function buyerOffers()
    {
        $user = auth()->user();
        if (!$user || $user->role !== 'buyer') {
            return response()->json(['error' => 'Unauthorized. Only buyers can view their offers.'], 403);
        }

        $offers = Offer::where('buyer_id', $user->id)->get();
        return OfferResource::collection($offers);
    }

    /**
     * Retrieve all offers for the authenticated seller.
     */
    public function sellerOffers()
    {
        $user = auth()->user();
        if (!$user || $user->role !== 'seller') {
            return response()->json(['error' => 'Unauthorized. Only sellers can view their offers.'], 403);
        }

        $offers = Offer::where('seller_id', $user->id)->get();
        return OfferResource::collection($offers);
    }
}
