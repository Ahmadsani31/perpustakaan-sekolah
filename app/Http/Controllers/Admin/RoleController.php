<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Http\Resources\Admin\RoleResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Roles',
            'subtitle' => 'Menampilkan semua data roles yang tersedia pada platform ini',
        ];

        $query = Role::select('id', 'name', 'guard_name', 'created_at')->get();
        $roles = RoleResource::collection($query);
        return Inertia::render('admin/roles/index', compact('roles', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/roles/create', [
            'page_settings' => [
                'title' => 'Tambah Peran',
                'subtitle' => 'Buat peran baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.roles.store'),
            ],
        ]);
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        try {
            Role::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name,
            ]);

            flashMessage(MessageType::CREATED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('admin/roles/edit', [
            'page_settings' => [
                'title' => 'Edit Peran',
                'subtitle' => 'Edit peran disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.roles.update', $role),
            ],
            'roles' => $role
        ]);
    }

    public function update(Role $role, RoleRequest $request): RedirectResponse
    {
        try {
            $role->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name,
            ]);

            flashMessage(MessageType::UPDATED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Role $role)
    {
        try {
            $role->delete();
            flashMessage(MessageType::DELETED->message('Peran'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
