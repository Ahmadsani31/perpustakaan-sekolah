<?php

namespace App\Services;

use App\Models\Bantuan;
use App\Models\Program;
use App\Notifications\UpBansos;
use App\Repositories\BantuanRepository;
use App\Repositories\LoanRepository;
use App\Traits\HasFileTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Elibyy\TCPDF\Facades\TCPDF;

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
