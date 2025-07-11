<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\AssignPermissionController;
use App\Http\Controllers\Admin\AssignUserController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FineController;
use App\Http\Controllers\Admin\FineSettingController;
use App\Http\Controllers\Admin\LoanController;
use App\Http\Controllers\Admin\LoanStatisticController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\ReturnBookController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RouteAccessController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::controller(LoanStatisticController::class)->group(function () {
        Route::get('loan-statistics', 'index')->name('admin.loan-statistics.index');
    });

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

    Route::controller(BookController::class)->group(function () {
        Route::get('books', 'index')->name('admin.books.index');
        Route::get('books/create', 'create')->name('admin.books.create');
        Route::post('books/store', 'store')->name('admin.books.store');
        Route::get('books/edit/{book}', 'edit')->name('admin.books.edit');
        Route::put('books/update/{book}', 'update')->name('admin.books.update');
        Route::delete('books/destroy/{book}', 'destroy')->name('admin.books.destroy');
    });

    // Route::resource('users', UserController::class);
    Route::controller(UserController::class)->group(function () {
        Route::get('users', 'index')->name('admin.users.index');
        Route::get('users/create', 'create')->name('admin.users.create');
        Route::post('users/store', 'store')->name('admin.users.store');
        Route::get('users/edit/{user}', 'edit')->name('admin.users.edit');
        Route::put('users/update/{user}', 'update')->name('admin.users.update');
        Route::put('users/update-password/{user}', 'update_password')->name('admin.users.update-password');
        Route::delete('users/destroy/{user}', 'destroy')->name('admin.users.destroy');
    });

    Route::controller(FineSettingController::class)->group(function () {
        Route::get('fine-settings/create', 'create')->name('admin.fine-settings.create');
        Route::put('fine-settings/store', 'store')->name('admin.fine-settings.store');
    });

    Route::controller(LoanController::class)->group(function () {
        Route::get('loans', 'index')->name('admin.loans.index');
        // Route::get('loans/create', 'create')->name('admin.loans.create');
        Route::post('loans/store', 'store')->name('admin.loans.store');
        // Route::get('loans/edit/{loan}', 'edit')->name('admin.loans.edit');
        Route::put('loans/update/{loan}', 'update')->name('admin.loans.update');
        Route::delete('loans/destroy/{loan}', 'destroy')->name('admin.loans.destroy');

        Route::get('loans/create', 'dialog_create')->name('admin.loans.create');
        Route::get('loans/edit/{loan}', 'dialog_edit')->name('admin.loans.edit');
    });

    Route::controller(ReturnBookController::class)->group(function () {
        Route::get('return-books', 'index')->name('admin.return-books.index');
        Route::get('return-books/{loan:loan_code}/create', 'create')->name('admin.return-books.create');
        Route::post('return-books/{loan:loan_code}/store', 'store')->name('admin.return-books.store');
        Route::post('return-books/test-store', 'test_store')->name('admin.return-books.test_store');
        Route::post('return-books/{returnBook:return_book_code}/approve', 'approve')->name('admin.return-books.approve');
    });

    Route::controller(FineController::class)->group(function () {
        Route::get('fines/{returnBook:return_book_code}/create', 'create')->name('admin.fines.create');
    });

    Route::controller(AnnouncementController::class)->group(function () {
        Route::get('announcements', 'index')->name('admin.announcements.index');
        Route::get('announcements/create', 'create')->name('admin.announcements.create');
        Route::post('announcements/store', 'store')->name('admin.announcements.store');
        Route::get('announcements/edit/{announcement}', 'edit')->name('admin.announcements.edit');
        Route::put('announcements/update/{announcement}', 'update')->name('admin.announcements.update');
        Route::delete('announcements/destroy/{announcement}', 'destroy')->name('admin.announcements.destroy');
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('roles', 'index')->name('admin.roles.index');
        Route::get('roles/create', 'create')->name('admin.roles.create');
        Route::post('roles/store', 'store')->name('admin.roles.store');
        Route::get('roles/edit/{role}', 'edit')->name('admin.roles.edit');
        Route::put('roles/update/{role}', 'update')->name('admin.roles.update');
        Route::delete('roles/destroy/{role}', 'destroy')->name('admin.roles.destroy');
    });

    Route::controller(PermissionController::class)->group(function () {
        Route::get('permissions', 'index')->name('admin.permissions.index');
        Route::get('permissions/create', 'create')->name('admin.permissions.create');
        Route::post('permissions/store', 'store')->name('admin.permissions.store');
        Route::get('permissions/edit/{permission}', 'edit')->name('admin.permissions.edit');
        Route::put('permissions/update/{permission}', 'update')->name('admin.permissions.update');
        Route::delete('permissions/destroy/{permission}', 'destroy')->name('admin.permissions.destroy');
    });

    Route::controller(AssignPermissionController::class)->group(function () {
        Route::get('assign-permissions', 'index')->name('admin.assign-permissions.index');
        Route::get('assign-permissions/edit/{role}', 'edit')->name('admin.assign-permissions.edit');
        Route::put('assign-permissions/update/{role}', 'update')->name('admin.assign-permissions.update');
    });

    Route::controller(AssignUserController::class)->group(function () {
        Route::get('assign-users', 'index')->name('admin.assign-users.index');
        Route::get('assign-users/edit/{user}', 'edit')->name('admin.assign-users.edit');
        Route::put('assign-users/update/{user}', 'update')->name('admin.assign-users.update');
    });

    Route::controller(RouteAccessController::class)->group(function () {
        Route::get('route-accesses', 'index')->name('admin.route-accesses.index');
        Route::get('route-accesses/create', 'create')->name('admin.route-accesses.create');
        Route::post('route-accesses/store', 'store')->name('admin.route-accesses.store');
        Route::get('route-accesses/edit/{routeAccess}', 'edit')->name('admin.route-accesses.edit');
        Route::put('route-accesses/update/{routeAccess}', 'update')->name('admin.route-accesses.update');
        Route::delete('route-accesses/destroy/{routeAccess}', 'destroy')->name('admin.route-accesses.destroy');
    });
});
