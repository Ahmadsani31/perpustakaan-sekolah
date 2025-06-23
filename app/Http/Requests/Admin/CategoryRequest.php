<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'description' => ['nullable'],
            'cover' => ['nullable', 'mimes:png,jpg,webp', 'max:2048'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'description' => 'Deskripsi',
            'cover' => 'Cover',
        ];
    }
}
