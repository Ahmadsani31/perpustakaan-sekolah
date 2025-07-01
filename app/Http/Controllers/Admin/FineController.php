<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\FineResource;
use App\Http\Resources\Admin\ReturnFineSingleResource;
use App\Models\Fine;
use App\Models\ReturnBook;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FineController extends Controller
{
    public function create(ReturnBook $returnBook): Response
    {
        $page_settings = [
            'title' => 'Denda',
            'subtitle' => 'Selesaikan pembayaran denda terlebih dahulu',
        ];

        $return_book = new ReturnFineSingleResource($returnBook->load([
            'book',
            'fine',
            'loan',
            'user',
            'returnBookCheck',
        ]));
        return Inertia::render('admin/fines/create', compact('return_book', 'page_settings'));
    }
}
