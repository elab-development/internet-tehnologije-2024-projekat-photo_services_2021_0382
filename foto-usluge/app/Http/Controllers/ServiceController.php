<?php
namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'message' => 'All services retrieved successfully!',
            'services' => ServiceResource::collection($services),
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

}