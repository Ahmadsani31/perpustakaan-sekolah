<?php

namespace App\Models;

use App\Enums\ReturnBookStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ReturnBook extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'load_id',
        'return_book_code',
        'return_date',
        'status'
    ];

    protected function casts(): array
    {
        return [
            'return_date' => 'date',
            'status' => ReturnBookStatus::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function fine(): HasOne
    {
        return $this->hasOne(Fine::class);
    }

    public function returnBookCheck(): HasOne
    {
        return $this->hasOne(ReturnBookCheck::class);
    }


    public function isOnTime(): bool
    {
        // return Carbon::lessThanOrEqualTo(Carbon::parse($this->loan->due_date));
        return Carbon::parse($this->loan->due_date)->greaterThan(Carbon::now());
    }

    public function getDaysLate(): int
    {
        return max(0, Carbon::parse($this->loan->loan_date)->diffInDays(Carbon::parse($this->return_date)));
    }
}
