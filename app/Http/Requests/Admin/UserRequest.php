<?php

namespace App\Http\Requests\Admin;

use App\Enums\UserGender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UserRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user)],
            'password' => [
                Rule::when($this->routeIs('admin.users.store'), [
                    'required',
                    'min:6',
                    'max:255',
                    'confirmed'
                ]),
                Rule::when($this->routeIs('admin.users.update'), [
                    'nullable',
                    'min:6',
                    'max:255',
                    'confirmed'
                ])
            ],
            'gender' => ['required', new Enum(UserGender::class)],
            'phone' => ['nullable', 'min:10', 'max:15'],
            'avatar' => ['nullable', 'mimes:png,jpg,webp', 'max:2048'],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['nullable', 'string', 'min:3', 'max:255'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'email' => 'Email',
            'password' => 'Password',
            'phone' => 'Nomor Handphone',
            'avatar' => 'Avatar',
            'date_of_birth' => 'Bulan Lahir',
            'address' => 'Alamat',
            'gender' => 'Jenis Kelamin',
        ];
    }
}
