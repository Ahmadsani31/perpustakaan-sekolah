<?php

namespace App\Models;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'category_id',
        'publisher_id',
        'book_kode',
        'title',
        'slug',
        'author',
        'publication_year',
        'isbn',
        'language',
        'synopsis',
        'number_of_pages',
        'status',
        'cover',
        'price',
    ];

    protected function casts(): array
    {
        return [
            'language' => BookLanguage::class,
            'status' => BookStatus::class,
        ];
    }
}
