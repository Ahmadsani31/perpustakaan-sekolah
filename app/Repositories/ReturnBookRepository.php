<?php

namespace App\Repositories;

use App\Models\Loan;
use Carbon\Carbon;

class ReturnBookRepository
{
    public function createFine($returnBook, $lateFee, $otherFee)
    {
        return $returnBook->fine()->create([
            'user_id' => $returnBook->user_id,
            'late_fee' => $lateFee,
            'other_fee' => $otherFee,
            'total_fee' =>  $lateFee + $otherFee,
            'fine_date' => Carbon::today()
        ]);
    }
}
