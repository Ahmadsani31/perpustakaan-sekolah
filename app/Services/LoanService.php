<?php

namespace App\Services;

use App\Repositories\LoanRepository;


class LoanService
{

    protected $loanRepository;

    public function __construct(LoanRepository $loanRepository)
    {
        $this->loanRepository = $loanRepository;
    }

    public function checkUserLoanBook($user_id, $book_id): bool
    {
        return $this->loanRepository->checkLoanBook($user_id, $book_id);
    }

    public function stockLoan($loan)
    {
        return $this->loanRepository->updateStockBook($loan, 'available', 'loan');
    }

    public function stockLost($loan)
    {
        return $this->loanRepository->updateStockBook($loan, 'loan', 'lost');
    }

    public function stockDemaged($loan)
    {
        return $this->loanRepository->updateStockBook($loan, 'loan', 'damaged');
    }

    public function stockLoanReturn($loan)
    {
        return $this->loanRepository->updateStockBook($loan, 'loan', 'available');
    }
}
