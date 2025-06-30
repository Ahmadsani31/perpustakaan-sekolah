<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\UserGender;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Requests\Admin\UserUpdatePasswordRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    use HasFile;
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Pengguna',
            'subtitle' => 'Menampilkan semua data pengguna yang tersedia pada platform ini',
        ];

        $users = UserResource::collection(User::all());
        return Inertia::render('admin/users/index', compact('users', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/users/create', [
            'page_settings' => [
                'title' => 'Tambah Pengguna',
                'subtitle' => 'Buat pengguna baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.users.store'),
            ],
            'genders' => UserGender::options()
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            User::create([
                'name' => ($name = $request->name),
                'username' => usernameGenerator($name),
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'address' => $request->address,
                'gender' => $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'avatar' => $this->upload_file($request, 'avatar', 'users'),
            ]);

            flashMessage(MessageType::CREATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (\Throwable $eer) {
            flashMessage(MessageType::ERROR->message($eer->getMessage()), 'error');
            return back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('admin/users/edit', [
            'page_settings' => [
                'title' => 'Edit Pengguna',
                'subtitle' => 'Edit pengguna baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.users.update', $user),
            ],
            'users' => $user,
            'genders' => UserGender::options()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, UserRequest $request)
    {
        try {
            $user->update([
                'name' => $name = $request->name,
                'username' => $name != $user->name ? usernameGenerator($name) : $user->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'gender' => $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'avatar' => $this->update_file($request, $user, 'avatar', 'users'),
            ]);

            flashMessage(MessageType::UPDATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (\Throwable $ee) {
            dd($ee->getMessage());
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }


    public function update_password(User $user, UserUpdatePasswordRequest $request)
    {
        try {
            $user->update($request->validated());

            flashMessage(MessageType::UPDATED->message('Update password pengguna'));
            return to_route('admin.users.index');
        } catch (\Throwable $ee) {
            dd($ee->getMessage());
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            $this->delete_file($user, 'avatar');
            flashMessage(MessageType::DELETED->message('Pengguna'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
