<?php

namespace App\Http\Requests\Admin;

use App\Enums\BookLanguage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class BookRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'author' => ['required', 'string', 'min:3', 'max:255'],
            'publication_year' => ['required', 'numeric', 'integer', 'digits:4'],
            'isbn' => ['required', 'string', 'max:13'],
            'language' => ['required', new Enum(BookLanguage::class)],
            'synopsis' => ['nullable'],
            'number_of_pages' => ['required', 'integer', 'numeric'],
            'cover' => ['nullable', 'mimes:png,jpg,webp', 'max:2048'],
            'price' => ['required', 'numeric', 'min:0'],
            'category_id' => ['required', 'exists:categories,id'],
            'publisher_id' => ['required', 'exists:publishers,id'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'Judul',
            'author' => 'Penulis',
            'publication_year' => 'Tahun Terbit',
            'isbn' => 'ISBN',
            'language' => 'Bahasa',
            'synopsis' => 'Sinopsis',
            'number_of_pages' => 'Jumlah Halaman',
            'status' => 'Status',
            'cover' => 'Sampul',
            'price' => 'Harga',
            'category_id' => 'Kategori',
            'publisher_id' => 'Penerbit',
        ];
    }
}
