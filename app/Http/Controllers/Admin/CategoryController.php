<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Kategori',
            'subtitle' => 'Menampilkan semua data kategori yang tersedia pada platform ini'
        ];
        $query = Category::query()
            ->select('id', 'name', 'slug', 'cover', 'created_at')
            ->get();
        $categories = CategoryResource::collection($query);
        return Inertia::render('admin/categories/index', compact('categories', 'page_settings'));
    }
}
