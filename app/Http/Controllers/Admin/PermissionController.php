<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionRequest;
use App\Http\Resources\Admin\PermissionResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Izin',
            'subtitle' => 'Menampilkan semua data izin yang tersedia pada platform ini',
        ];
        $permissions = PermissionResource::collection(Permission::latest()->get());
        return Inertia::render('admin/permissions/index', compact('permissions', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/permissions/create', [
            'page_settings' => [
                'title' => 'Tambah Izin',
                'subtitle' => 'Buat izin baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.permissions.store'),
            ],
        ]);
    }

    public function store(PermissionRequest $request): RedirectResponse
    {
        try {
            Permission::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? 'web',
            ]);

            flashMessage(MessageType::CREATED->message('Izin'));
            return to_route('admin.permissions.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('admin/permissions/edit', [
            'page_settings' => [
                'title' => 'Edit izin',
                'subtitle' => 'Edit izin disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.permissions.update', $permission),
            ],
            'permissions' => $permission
        ]);
    }

    public function update(Permission $permission, PermissionRequest $request): RedirectResponse
    {
        try {
            $permission->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name,
            ]);

            flashMessage(MessageType::UPDATED->message('Peran'));
            return to_route('admin.permissions.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();
            flashMessage(MessageType::DELETED->message('Peran'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
