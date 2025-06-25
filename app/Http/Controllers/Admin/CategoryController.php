<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\MessageType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    use HasFile;

    public function index(): Response
    {
        $page_settings = [
            'title' => 'Kategori',
            'subtitle' => 'Menampilkan semua data kategori yang tersedia pada platform ini',
        ];
        $state = [
            'page' => request()->page ?? 1,
            'search' => request()->search ?? '',
            'load' => 10,
        ];
        $query = Category::query()->select('id', 'name', 'slug', 'description', 'cover', 'created_at')
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        $categories = CategoryResource::collection($query)->additional([
            'meta' => [
                'has_pages' => $query->hasPages()
            ]
        ]);
        return Inertia::render('admin/categories/index', compact('categories', 'page_settings', 'state'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/categories/create', [
            'page_settings' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Buat kategori baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.categories.store'),
            ],
        ]);
    }

    public function store(CategoryRequest $request)
    {
        try {
            Category::create([
                'name' => ($name = $request->name),
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'description' => $request->description,
                'cover' => $this->upload_file($request, 'cover', 'categories'),
            ]);

            flashMessage(MessageType::CREATED->message('katagori'));
            return to_route('admin.categories.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('admin/categories/edit', [
            'page_settings' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit kategori baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.categories.update', $category),
            ],
            'category' => $category
        ]);
    }

    public function update(Category $category, CategoryRequest $request)
    {
        try {
            $category->update([
                'name' => $name = $request->name,
                'slug' => $name != $category->name ? str()->lower(str()->slug($name) . str()->random(4)) : $category->slug,
                'description' => $request->description,
                'cover' => $this->update_file($request, $category, 'cover', 'categories'),
            ]);

            flashMessage(MessageType::UPDATED->message('Katagori'));
            return to_route('admin.categories.index');
        } catch (\Throwable $ee) {
            dd($ee->getMessage());
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Category $category)
    {
        try {
            $category->delete();
            $this->delete_file($category, 'cover');
            flashMessage(MessageType::DELETED->message('Katagori'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
