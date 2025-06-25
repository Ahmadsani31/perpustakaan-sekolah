<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublisherRequest;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    use HasFile;

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
        $query = Publisher::query()->select('id', 'name', 'slug', 'address', 'logo', 'email', 'phone', 'created_at')->orderBy('created_at', 'desc')
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

    public function edit(Publisher $publisher): Response
    {
        return Inertia::render('admin/publishers/edit', [
            'page_settings' => [
                'title' => 'Edit publishers',
                'subtitle' => 'Edit publishers baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.publishers.update', $publisher),
            ],
            'publisher' => $publisher
        ]);
    }

    public function store(PublisherRequest $request)
    {
        try {
            Publisher::create([
                'name' => ($name = $request->name),
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'email' => $request->email,
                'address' => $request->address,
                'phone' => $request->phone,
                'logo' => $this->upload_file($request, 'logo', 'categories'),
            ]);

            flashMessage(MessageType::CREATED->message('publisher'));
            return to_route('admin.publishers.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function update(Publisher $publisher, PublisherRequest $request)
    {
        try {
            $publisher->update([
                'name' => $name = $request->name,
                'slug' => $name != $publisher->name ? str()->lower(str()->slug($name) . str()->random(4)) : $publisher->slug,
                'email' => $request->email,
                'address' => $request->address,
                'phone' => $request->phone,
                'logo' => $this->update_file($request, $publisher, 'logo', 'publishers'),
            ]);

            flashMessage(MessageType::UPDATED->message('Katagori'));
            return to_route('admin.publishers.index');
        } catch (\Throwable $ee) {
            dd($ee->getMessage());
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Publisher $publisher)
    {
        try {
            $publisher->delete();
            $this->delete_file($publisher, 'logo');
            flashMessage(MessageType::DELETED->message('Publisher'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
