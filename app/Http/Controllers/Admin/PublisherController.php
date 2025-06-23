<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Publisher',
            'subtitle' => 'Menampilkan semua data publisher yang tersedia pada platform ini',
        ];
        $state = [
            'page' => request()->page ?? 1,
            'search' => request()->search ?? '',
            'load' => 10,
        ];
        $query = Publisher::query()->select('id', 'name', 'slug', 'address', 'logo', 'email', 'phone', 'created_at')
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        $publishers = PublisherResource::collection($query)->additional([
            'meta' => [
                'has_pages' => $query->hasPages()
            ]
        ]);
        return Inertia::render('admin/publishers/index', compact('publishers', 'page_settings', 'state'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/publishers/create', [
            'page_settings' => [
                'title' => 'Tambah publishers',
                'subtitle' => 'Buat publishers baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.publishers.store'),
            ],
        ]);
    }
}
