<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'loan_code',
        'loan_date',
        'due_date',
    ];

    protected function casts(): array
    {
        return [
            'load_date' => 'date',
            'due_date' => 'date',
        ];
    }
}
