<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Models\Offer;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->check() || auth()->user()->role !== 'buyer') {
            return response()->json(['error' => 'Unauthorized. Only buyers can create offers.'], 403);
        }
    
        $validated = $request->validate([
            'service_id'   => 'required|exists:services,id',
            'price'        => 'required|numeric|min:0',     
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
            'price'        => $validated['price'], 
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
        $user = auth()->user();
        if (!$user || $user->role !== 'seller') {
            return response()->json(['error' => 'Unauthorized. Only sellers can update offers.'], 403);
        }

        $validated = $request->validate([
            'price'  => 'required|numeric',
            'status' => 'required|string|in:pending,accepted,rejected',
        ]);

        $offer = Offer::where('id', $id)
            ->where('seller_id', $user->id)
            ->first();

        if (!$offer) {
            return response()->json(['error' => 'Offer not found or you do not have access to update it.'], 404);
        }

        // Update this offer
        $offer->update($validated);

        // If accepted, reject all other offers for the same service
        if ($validated['status'] === 'accepted') {
            Offer::where('service_id', $offer->service_id)
                ->where('id', '!=', $offer->id)
                ->update(['status' => 'rejected']);
        }

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
    

    /**
     * GET /api/offers/seller/analytics
     */
    public function analytics()
    {
        $user = auth()->user();
        if (!$user || $user->role !== 'seller') {
            return response()->json([
                'error' => 'Unauthorized. Only sellers can view analytics.'
            ], 403);
        }

        // Base query for this seller
        $base = Offer::where('seller_id', $user->id);

        // Totals
        $totalOffers    = (clone $base)->count();
        $pendingCount   = (clone $base)->where('status', 'pending')->count();
        $acceptedCount  = (clone $base)->where('status', 'accepted')->count();
        $rejectedCount  = (clone $base)->where('status', 'rejected')->count();

        // Revenue from accepted offers
        $totalRevenue   = (clone $base)
                            ->where('status', 'accepted')
                            ->sum('price');

        // Average offer price (all statuses)
        $averageOffer   = (clone $base)->avg('price') ?: 0;

        // Build monthly data:
        // - month: "2025-01", "2025-02", etc.
        // - offers: total count in that month
        // - revenue: sum(price) of accepted offers in that month
        $monthlyRaw = (clone $base)
            ->select([
                DB::raw("DATE_FORMAT(`date`, '%Y-%m') as month"),
                DB::raw("COUNT(*) as offers"),
                DB::raw("SUM(CASE WHEN status = 'accepted' THEN price ELSE 0 END) as revenue"),
            ])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Map to plain array
        $monthlyData = $monthlyRaw->map(function($row) {
            return [
                'month'   => $row->month,
                'offers'  => (int) $row->offers,
                'revenue' => (float) $row->revenue,
            ];
        })->toArray();

        return response()->json([
            'total_offers'    => $totalOffers,
            'pending_offers'  => $pendingCount,
            'accepted_offers' => $acceptedCount,
            'rejected_offers' => $rejectedCount,
            'total_revenue'   => (float) $totalRevenue,
            'average_offer'   => round($averageOffer, 2),
            'monthly_data'    => $monthlyData,
        ]);
    }

        /**
     * List all offers for a given service (sellers only).
     */
    public function serviceOffers($serviceId)
    {
        $user = auth()->user();

        $service = Service::findOrFail($serviceId);

        // eager-load buyer
        $offers = $service->offers()->with('buyer')->get();

        return OfferResource::collection($offers);
    }
}
