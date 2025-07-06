<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignUserRequest;
use App\Http\Resources\Admin\AssignUserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AssignUserController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Tetapkan Peran',
            'subtitle' => 'Menampilkan semua data tetapkan peran yang tersedia pada platform ini',
        ];

        $query = User::select('id', 'name', 'username')
            ->with('roles')->get();
        $users = AssignUserResource::collection($query);
        return Inertia::render('admin/assign-users/index', compact('users', 'page_settings'));
    }

    public function edit(User $user): Response
    {
        return Inertia::render('admin/assign-users/edit', [
            'page_settings' => [
                'title' => 'Sinkronisasi Peran',
                'subtitle' => 'Sinkronisasi peran disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-users.update', $user),
            ],
            'user' => $user->load('roles'),
            'roles' => Role::select('id', 'name')->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
        ]);
    }

    public function update(User $user, AssignUserRequest $request): RedirectResponse
    {
        try {
            $user->syncRoles($request->roles);

            flashMessage("Berhasil menyingkronkan peran ke pengguna {$user->name}");
            return to_route('admin.roles.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
