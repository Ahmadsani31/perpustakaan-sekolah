<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FineSettingRequest;
use App\Models\FineSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FineSettingController extends Controller
{
    public function create(): Response
    {
        $fine_setting = FineSetting::first();

        return Inertia::render('admin/fine-settings/create', [
            'page_settings' => [
                'title' => 'Pengaturan Denda',
                'subtitle' => 'Konfigurasi pengaturan denda disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.fine-settings.store'),
            ],
            'fine_setting' => $fine_setting
        ]);
    }

    public function store(FineSettingRequest $request)
    {
        try {
            FineSetting::updateOrCreate([], $request->validated());

            flashMessage('Berhasil melakukan perubahan pengaturan denda');
            return to_route('admin.fine-settings.create');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
