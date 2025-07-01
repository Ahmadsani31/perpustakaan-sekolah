<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\ReturnBookCondition;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReturnBookRequest;
use App\Http\Resources\Admin\ReturnBookResource;
use App\Models\FineSetting;
use App\Models\Loan;
use App\Models\ReturnBook;
use App\Services\LoanService;
use App\Services\ReturnBookService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReturnBookController extends Controller
{
    protected $loanService;
    protected $returnBookService;

    public function __construct(LoanService $loanService, ReturnBookService $returnBookService)
    {
        $this->loanService = $loanService;
        $this->returnBookService = $returnBookService;
    }


    public function index(): Response
    {

        $page_settings = [
            'title' => 'Pengembalian',
            'subtitle' => 'Menampilkan semua pengembalian buku yang tersedia pada platform ini',
        ];
        $return_books = ReturnBook::with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest('created_at')->get();

        // dd($return_books);

        $return_books = ReturnBookResource::collection($return_books);
        return Inertia::render('admin/return-books/index', compact('return_books', 'page_settings'));
    }

    public function create(Loan $loan): Response | RedirectResponse
    {

        if ($loan->returnBook()->exists()) {
            return to_route('admin.loans.index');
        }

        if (!FineSetting::first()) {
            return back();
        }
        return Inertia::render('admin/return-books/create', [
            'page_settings' => [
                'title' => 'Pengembalian Buku',
                'subtitle' => 'Kembalikan buku yang dipinjam disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.return-books.store', $loan),
            ],
            'loan' => $loan->load([
                'user',
                'book' => fn($query) => $query->with('publisher')
            ]),
            'date' => [
                'return_date' => Carbon::now()->toDateString()
            ],
            'conditions' => ReturnBookCondition::options(),
        ]);
    }

    public function store(ReturnBookRequest $request, Loan $loan)
    {
        DB::beginTransaction();

        try {
            $return_book = $loan->returnBook()->create([
                'return_book_code' => str()->lower(str()->random(10)),
                'book_id' => $loan->book_id,
                'user_id' => $loan->user_id,
                'return_date' => $request->return_date,
            ]);

            $return_book_check =  $return_book->returnBookCheck()->create([
                'condition' => $request->condition,
                'notes' => $request->notes,
            ]);

            match ($return_book_check->condition->value) {
                ReturnBookCondition::GOOD->value =>   $this->loanService->stockLoanReturn($loan),
                ReturnBookCondition::LOST->value =>   $this->loanService->stockLost($loan),
                ReturnBookCondition::DEMAGED->value =>   $this->loanService->stockDemaged($loan),
                default => flashMessage('Kondisi buku tidak sesuai', 'error')
            };

            $isOnTime = $return_book->isOnTime();
            $daysLate = $return_book->getDaysLate();

            $fineData =   $this->returnBookService->calculateFine($return_book, $return_book_check, FineSetting::first(), $daysLate);
            DB::commit();
            if ($isOnTime) {
                if ($fineData) {
                    flashMessage($fineData['message'], 'error');
                    return to_route('admin.fines.create', $return_book->return_book_code);
                }

                flashMessage('Berhasil mengembalikan buku');
                return to_route('admin.return-books.index');
            } else {
                if ($fineData) {
                    flashMessage($fineData['message'], 'error');
                    return to_route('admin.fines.create', $return_book->return_book_code);
                }
            }
        } catch (\Throwable $ee) {
            DB::rollBack();
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function test_store(Request $request)
    {
        dd($request->all());
    }
}
