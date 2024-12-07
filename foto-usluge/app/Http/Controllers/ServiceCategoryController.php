<?php
namespace App\Http\Controllers;

use App\Http\Resources\ServiceCategoryResource;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::all();

        return response()->json([
            'message' => 'All service categories retrieved successfully!',
            'categories' => ServiceCategoryResource::collection($categories),
        ]);
    }

}