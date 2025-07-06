<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\RouteAccessResource;
use App\Models\RouteAccess;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RouteAccessController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Akese Rute',
            'subtitle' => 'Menampilkan semua data akses rute yang tersedia pada platform ini',
        ];

        $query = RouteAccess::select('id', 'route_name', 'role_id', 'permission_id', 'created_at')->with(['roles', 'permissions'])->get();
        $routeAcces = RouteAccessResource::collection($query);
        return Inertia::render('admin/route-accesses/index', compact('routeAcces', 'page_settings'));
    }
}
