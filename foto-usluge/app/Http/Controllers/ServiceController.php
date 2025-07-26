<?php
namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 5);

        $services = Service::paginate($perPage);

        return response()->json([
            'message' => 'All services retrieved successfully!',
            'services' => ServiceResource::collection($services->items()),
            'pagination' => [
                'current_page' => $services->currentPage(),
                'last_page' => $services->lastPage(),
                'per_page' => $services->perPage(),
                'total' => $services->total(),
            ],
        ]);
    }


    public function show($id)
    {
        $service = Service::with('serviceCategory')->find($id);

        if (!$service) {
            return response()->json([
                'message' => 'Service not found!',
            ], 404);
        }

        return response()->json([
            'message' => 'Service retrieved successfully!',
            'service' => new ServiceResource($service),
        ]);
    }

    public function store(Request $request)
    {
        // Only allow sellers to create services
        if (!auth()->check() || auth()->user()->role !== 'seller') {
            return response()->json(['error' => 'Unauthorized. Only sellers can create services.'], 403);
        }

        $validated = $request->validate([
            'name'                => 'required|string|max:255',
            'description'         => 'required|string',
            'price'               => 'required|numeric',
            'service_category_id' => 'required|exists:service_categories,id',
            // you don’t need seller_id in the request — we’ll pull from auth()
        ]);

        $service = Service::create([
            'name'                => $validated['name'],
            'description'         => $validated['description'],
            'price'               => $validated['price'],
            'service_category_id' => $validated['service_category_id'],
            'seller_id'           => auth()->id(),     // ← link current user
        ]);

        return response()->json([
            'message' => 'Service created!',
            'service' => new ServiceResource($service),
        ], 201);
    }

    public function updatePrice(Request $request, $id)
    {
        if (!auth()->check() || auth()->user()->role !== 'seller') {
            return response()->json(['error' => 'Unauthorized. Only sellers can update services.'], 403);
        }

        $validated = $request->validate([
            'price' => 'required',
        ]);

        $service = Service::find($id);

        if (!$service) {
            return response()->json(['error' => 'Service not found.'], 404);
        }

        $service->update(['price' => $validated['price']]);

        return response()->json([
            'message' => 'Price updated successfully!',
            'service' => new ServiceResource($service),
        ]);
    }




    

    
}