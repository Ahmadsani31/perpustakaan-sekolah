<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RouteAccessRequest;
use App\Http\Resources\Admin\RouteAccessResource;
use App\Models\RouteAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccessController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Akese Rute',
            'subtitle' => 'Menampilkan semua data akses rute yang tersedia pada platform ini',
        ];

        $query = RouteAccess::select('id', 'route_name', 'role_id', 'permission_id', 'created_at')->with(['role', 'permission'])->get();
        $routeAccess = RouteAccessResource::collection($query);
        return Inertia::render('admin/route-accesses/index', compact('routeAccess', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/route-accesses/create', [
            'page_settings' => [
                'title' => 'Tambah Akses Rute',
                'subtitle' => 'Buat akses rute baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.route-accesses.store'),
            ],
            'roles' => Role::select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'permissions' => Permission::select('id', 'name')->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'routes' => collect(Route::getRoutes())->map(fn($route) => [
                'value' => $route->getName(),
                'label' => $route->getName()
            ])
        ]);
    }

    public function store(RouteAccessRequest $request): RedirectResponse
    {
        try {
            RouteAccess::create([
                'route_name' => $request->route_name,
                'role_id' => $request->role_id,
                'permission_id' => $request->permission_id,
            ]);

            flashMessage(MessageType::CREATED->message('Akses Rute'));
            return to_route('admin.route-accesses.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(RouteAccess $routeAccess): Response
    {
        return Inertia::render('admin/route-accesses/edit', [
            'page_settings' => [
                'title' => 'Edit Akses Rute',
                'subtitle' => 'Edit akses rute disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.route-accesses.update', $routeAccess),
            ],
            'roles' => Role::select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'permissions' => Permission::select('id', 'name')->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'routes' => collect(Route::getRoutes())->map(fn($route) => [
                'value' => $route->getName(),
                'label' => $route->getName()
            ]),
            'routeAccess' => $routeAccess
        ]);
    }

    public function update(RouteAccess $routeAccess, RouteAccessRequest $request): RedirectResponse
    {
        try {
            $routeAccess->update([
                'route_name' => $request->route_name,
                'role_id' => $request->role_id,
                'permission_id' => $request->permission_id,
            ]);

            flashMessage(MessageType::UPDATED->message('Akses Rute'));
            return to_route('admin.route-accesses.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(RouteAccess $routeAccess)
    {
        try {
            $routeAccess->delete();
            flashMessage(MessageType::DELETED->message('Akses Rute'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
