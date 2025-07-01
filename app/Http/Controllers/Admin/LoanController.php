<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoanRequest;
use App\Http\Resources\Admin\LoanResource;
use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use App\Services\LoanService;
use Inertia\Inertia;
use Inertia\Response;

class LoanController extends Controller
{

    protected $loanService;

    public function __construct(LoanService $loanService)
    {
        $this->loanService = $loanService;
    }

    public function index(): Response
    {
        $page_settings = [
            'title' => 'Peminjaman',
            'subtitle' => 'Menampilkan semua data peminjaman yang tersedia pada platform ini',
        ];

        $loans = LoanResource::collection(Loan::with(['book', 'user', 'returnBook'])->latest()->get());
        return Inertia::render('admin/loans/index', compact('loans', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/loans/create', [
            'page_settings' => [
                'title' => 'Tambah Peminjaman',
                'subtitle' => 'Buat peminjaman buku baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.loans.store'),
            ],
            'page_data' => [
                'books' => Book::select('id', 'title')->whereHas('stock', fn($query) => $query->where('available', '>', 0))->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->title,
                    ]),
                'users' => User::select('id', 'name')->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->name,
                    ]),
            ],
        ]);
    }

    public function store(LoanRequest $request)
    {
        try {

            $book = Book::findOrFail($request->book);
            User::findOrFail($request->user);

            if ($this->loanService->checkUserLoanBook($request->user, $request->book)) {
                flashMessage('Pengguna sudah terdaftar meminjam buku ini', 'error');
                return back();
            }

            $book->stock->available > 0 ?
                tap(Loan::create([
                    'loan_code' => str()->lower(str()->random(10)),
                    'user_id' =>  $request->user,
                    'book_id' =>  $request->book,
                    'loan_date' => Carbon::now()->toDateString(),
                    'due_date' => Carbon::now()->addDay(7)->toDateString(),
                ]), function ($loan) {
                    $this->loanService->stockLoan($loan);
                    flashMessage('Berhasil menambahkan peminjamana');
                }) :  flashMessage('Stock buku tidak tersedia', 'error');

            return to_route('admin.loans.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Loan $loan): Response
    {
        return Inertia::render('admin/loans/edit', [
            'page_settings' => [
                'title' => 'Edit Peminjaman',
                'subtitle' => 'Edit peminjaman buku disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.loans.update', $loan),
            ],
            'loans' => $loan->load(['user', 'book']),
            'page_data' => [
                'books' => Book::select('id', 'title')->whereHas('stock', fn($query) => $query->where('available', '>', 0))->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->title,
                    ]),
                'users' => User::select('id', 'name')->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->name,
                    ]),
            ],
        ]);
    }

    public function update(Loan $loan, LoanRequest $request)
    {
        try {

            Book::findOrFail($request->book);
            User::findOrFail($request->user);

            if ($this->loanService->checkUserLoanBook($request->user, $request->book)) {
                flashMessage('Pengguna sudah terdaftar meminjam buku ini', 'error');
                return back();
            }


            $loan->update([
                'user_id' =>  $request->user,
                'book_id' =>  $request->book,
            ]);

            flashMessage(MessageType::UPDATED->message('Peminjaman'));
            return to_route('admin.loans.index');
        } catch (\Throwable $ee) {
            dd($ee->getMessage());
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Loan $loan)
    {
        try {
            $loan->delete();
            flashMessage(MessageType::DELETED->message('Peminjaman'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function load_data()
    {
        return response()->json([
            'page_data' => [
                'books' => Book::select('id', 'title')->whereHas('stock', fn($query) => $query->where('available', '>', 0))->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->title,
                    ]),
                'users' => User::select('id', 'name')->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->name,
                    ]),
            ],
        ]);
    }
}
