<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    public function checkLoanBook($user_id, $book_id): bool
    {
        return Loan::where('user_id', $user_id)
            ->where('book_id', $book_id)
            ->whereDoesntHave('returnBook', fn($query) => $query->where('user_id', $user_id)->where('book_id', $book_id))->exists();
    }

    public function updateStockBook($loan, $columnDikurang, $columnDitambah)
    {
        if ($loan->book->stock->$columnDikurang > 0) {
            return $loan->book->stock->update([
                $columnDikurang => $loan->book->stock->$columnDikurang - 1,
                $columnDitambah => $loan->book->stock->$columnDitambah + 1,
            ]);
        }
        return false;
    }
}
