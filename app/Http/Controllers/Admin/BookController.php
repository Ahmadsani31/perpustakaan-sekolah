<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BookRequest;
use App\Http\Resources\Admin\BookResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    use HasFile;

    public function index(): Response
    {

        $page_settings = [
            'title' => 'Buku',
            'subtitle' => 'Menampilkan semua data buku yang tersedia pada platform ini',
        ];
        // $state = [
        //     'page' => request()->page ?? 1,
        //     'search' => request()->search ?? '',
        //     'load' => 10,
        // ];
        // $query = Book::with(['category', 'publisher', 'stock'])
        //     ->filter(request()->only(['search']))
        //     ->sorting(request()->only(['field', 'direction']))
        //     ->latest('created_at')
        //     ->paginate(request()->load ?? 10)
        //     ->withQueryString();
        // $books = BookResource::collection($query)->additional([
        //     'meta' => [
        //         'has_pages' => $query->hasPages()
        //     ]
        // ]);

        $query = Book::with(['category', 'publisher', 'stock'])->latest()->get();
        $books = BookResource::collection($query);
        return Inertia::render('admin/books/index', compact('books', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/books/create', [
            'page_settings' => [
                'title' => 'Tambah Buku',
                'subtitle' => 'Buat buku baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.books.store'),
            ],
            'page_data' => [
                'languages' => BookLanguage::options(),
                'categories' => Category::select('id', 'name')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
                'publishers' => Publisher::select('id', 'name')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ],
        ]);
    }

    public function store(BookRequest $request)
    {
        try {
            Book::create([
                'book_code' => $this->_bookCode($request->publication_year, $request->category_id),
                'title' => ($title = $request->title),
                'slug' => str()->lower(str()->slug($title) . str()->random(4)),
                'author' => $request->author,
                'publication_year' => $request->publication_year,
                'isbn' => $request->isbn,
                'language' => $request->language,
                'synopsis' => $request->synopsis,
                'number_of_pages' => $request->number_of_pages,
                'status' => $request->total > 0 ? BookStatus::AVAILABLE->value : BookStatus::UNAVAILABLE->value,
                'cover' => $this->upload_file($request, 'cover', 'books'),
                'price' => $request->price,
                'category_id' => $request->category_id,
                'publisher_id' => $request->publisher_id,
            ]);

            flashMessage(MessageType::CREATED->message('Buku'));
            return to_route('admin.books.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Book $book): Response
    {
        return Inertia::render('admin/books/edit', [
            'page_settings' => [
                'title' => 'Edit Buku',
                'subtitle' => 'Edit buku baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.books.update', $book),
            ],
            'books' => $book,
            'page_data' => [
                'languages' => BookLanguage::options(),
                'categories' => Category::select('id', 'name')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
                'publishers' => Publisher::select('id', 'name')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ],
        ]);
    }

    public function update(Book $book, BookRequest $request)
    {
        try {
            $book->update([
                'book_code' => $this->_bookCode($request->publication_year, $request->category_id),
                'title' => $title = $request->title,
                'slug' => $title !== $book->title ? str()->lower(str()->slug($title) . str()->random(4)) : $book->title,
                'author' => $request->author,
                'publication_year' => $request->publication_year,
                'isbn' => $request->isbn,
                'language' => $request->language,
                'synopsis' => $request->synopsis,
                'number_of_pages' => $request->number_of_pages,
                'status' => $request->total > 0 ? BookStatus::AVAILABLE->value : BookStatus::UNAVAILABLE->value,
                'cover' => $this->update_file($request, $book, 'cover', 'books'),
                'price' => $request->price,
                'category_id' => $request->category_id,
                'publisher_id' => $request->publisher_id,
            ]);

            flashMessage(MessageType::UPDATED->message('Buku'));
            return to_route('admin.books.index');
        } catch (\Throwable $ee) {
            dd($ee->getMessage());
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Book $book)
    {
        try {
            $book->delete();
            $this->delete_file($book, 'cover');
            flashMessage(MessageType::DELETED->message('Buku'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    // untuk update ke depan tambah kan where code ke book untuk membuat code berdasarkan category
    private function _bookCode($publication_year, $category_id): string
    {
        $cat = Category::find($category_id);
        // dd($cat->name, $cat->code);

        $last_book = Book::orderByDesc('book_code')->first();

        $order = 1;
        if ($last_book) {
            $last_order = (int)  substr($last_book->book_code, -4);
            $order = $last_order + 1;

            // $last_code = $last_book->book_code;
            // $order = (int) substr($last_code, -3) + 1;
        }

        $ordering = str_pad($order, 4, '0', STR_PAD_LEFT);


        return 'CA' . $publication_year . '-' . str()->upper(str()->slug($cat->name))  . '-' . $ordering;
    }
}
