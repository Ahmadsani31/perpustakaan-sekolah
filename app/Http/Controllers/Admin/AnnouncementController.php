<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AnnouncementRequest;
use App\Http\Resources\Admin\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function index(): Response
    {
        $page_settings = [
            'title' => 'Pengumuman',
            'subtitle' => 'Menampilkan semua data pengumuman yang tersedia pada platform ini',
        ];
        $query = Announcement::latest()->get();
        $announcement = AnnouncementResource::collection($query);
        return Inertia::render('admin/announcements/index', compact('announcement', 'page_settings'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/announcements/create', [
            'page_settings' => [
                'title' => 'Pengumuman Baru',
                'subtitle' => 'Buat pengumuman baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.announcements.store'),
            ],
        ]);
    }

    public function store(AnnouncementRequest $request): RedirectResponse
    {
        // dd($request->validated());
        try {

            if ($request->is_active) {
                Announcement::where('is_active', true)->update(['is_active' => false]);
            }
            Announcement::create([
                'message' => $request->message,
                'url' =>  $request->url,
                'is_active' => $request->is_active,
            ]);

            flashMessage(MessageType::CREATED->message('Pengumuman'));
            return to_route('admin.announcements.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function edit(Announcement $announcement): Response
    {
        return Inertia::render('admin/announcements/edit', [
            'page_settings' => [
                'title' => 'Edit Pengumuman',
                'subtitle' => 'Edit pengumuman baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.announcements.update', $announcement),
            ],
            'announcement' => $announcement
        ]);
    }

    public function update(Announcement $announcement, AnnouncementRequest $request): RedirectResponse
    {
        // dd($request->validated());
        try {

            if ($request->is_active) {
                Announcement::where('is_active', true)
                    ->where('id', '!=', $announcement->id)
                    ->update(['is_active' => false]);
            }
            $announcement->update([
                'message' => $request->message,
                'url' =>  $request->url,
                'is_active' => $request->is_active,
            ]);

            flashMessage(MessageType::UPDATED->message('Pengumuman'));
            return to_route('admin.announcements.index');
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }

    public function destroy(Announcement $announcement)
    {
        try {
            $announcement->delete();
            flashMessage(MessageType::DELETED->message('Katagori'));
            return back();
        } catch (\Throwable $ee) {
            flashMessage(MessageType::ERROR->message($ee->getMessage()), 'error');
            return back();
        }
    }
}
