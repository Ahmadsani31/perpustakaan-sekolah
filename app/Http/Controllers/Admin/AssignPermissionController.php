<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignPermissionRequest;
use App\Http\Resources\Admin\AssignPermissionResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AssignPermissionController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Tetapkan Izin',
            'subtitle' => 'Menampilkan semua data roles yang tersedia pada platform ini',
        ];

        $query = Role::select('id', 'name', 'guard_name', 'created_at')
            ->with('permissions')->get();
        $roles = AssignPermissionResource::collection($query);
        return Inertia::render('admin/assign-permissions/index', compact('roles', 'page_settings'));
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('admin/assign-permissions/edit', [
            'page_settings' => [
                'title' => 'Sinkronisasi Izin',
                'subtitle' => 'Sinkronisasi izin disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-permissions.update', $role),
            ],
            'role' => $role->load('permissions'),
            'permissions' => Permission::select('id', 'name')->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
        ]);
    }

    public function update(Role $role, AssignPermissionRequest $request): RedirectResponse
    {
        try {
            $role->syncPermissions($request->permissions);

            flashMessage("Berhasil menyingkronkan izin ke peran {$role->name}");
            return to_route('admin.roles.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
