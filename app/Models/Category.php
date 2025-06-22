<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'cover'
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function scopeFilter(Builder $query, array $filter): void
    {
        $query->when($filter['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->whereAny([
                    'name',
                    'slug',
                    'description'
                ], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        // dd($sorts);
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction'] ?? '');
        });
    }
}
