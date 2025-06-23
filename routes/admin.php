<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PublisherController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::controller(CategoryController::class)->group(function () {
        Route::get('categories', 'index')->name('admin.categories.index');
        Route::get('categories/create', 'create')->name('admin.categories.create');
        Route::post('categories/store', 'store')->name('admin.categories.store');
        Route::get('categories/edit/{category}', 'edit')->name('admin.categories.edit');
        Route::put('categories/update/{category}', 'update')->name('admin.categories.update');
        Route::delete('categories/destroy/{category}', 'destroy')->name('admin.categories.destroy');
    });

    Route::controller(PublisherController::class)->group(function () {
        Route::get('publishers', 'index')->name('admin.publishers.index');
        Route::get('publishers/create', 'create')->name('admin.publishers.create');
        Route::post('publishers/store', 'store')->name('admin.publishers.store');
        Route::get('publishers/edit/{publisher}', 'edit')->name('admin.publishers.edit');
        Route::put('publishers/update/{publisher}', 'update')->name('admin.publishers.update');
        Route::delete('publishers/destroy/{publisher}', 'destroy')->name('admin.publishers.destroy');
    });
});
