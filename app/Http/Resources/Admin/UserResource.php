<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'username' => $this->username,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth ? $this->date_of_birth->format('d M Y') : null,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : null,
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
