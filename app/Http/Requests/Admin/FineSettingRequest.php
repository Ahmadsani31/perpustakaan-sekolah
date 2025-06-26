<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FineSettingRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'late_fee_per_day' => ['required', 'numeric'],
            'damage_fee_percentage' => ['required', 'numeric'],
            'lost_fee_percentage' => ['required', 'numeric'],
        ];
    }

    public function attributes(): array
    {
        return [
            'late_fee_per_day' => 'Denda Keterlambatan',
            'damage_fee_percentage' => 'Denda Rusak',
            'lost_fee_percentage' => 'Denda Hilang',
        ];
    }
}
