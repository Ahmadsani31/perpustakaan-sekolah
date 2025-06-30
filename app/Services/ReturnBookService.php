<?php

namespace App\Services;

use App\Enums\ReturnBookCondition;
use App\Enums\ReturnBookStatus;
use App\Repositories\ReturnBookRepository;
use Illuminate\Database\Eloquent\Model;

class ReturnBookService
{

    protected $returnBookRepository;

    public function __construct(ReturnBookRepository $returnBookRepository)
    {
        $this->returnBookRepository = $returnBookRepository;
    }

    public function calculateFine(Model $returnBook, Model $returnBookCheck, Model $fineSetting, int $daysLate): ?array
    {
        $late_fee = $fineSetting->late_fee_per_day * $daysLate;

        switch ($returnBookCheck->condition->value) {
            case ReturnBookCondition::DEMAGED->value:
                $other_fee = ($fineSetting->damage_fee_percentage / 100) * $returnBook->book->price;
                $returnBook->update([
                    'status' => ReturnBookStatus::FINE->value
                ]);

                $this->returnBookRepository->createFine($returnBook, $late_fee, $other_fee);
                return [
                    'message' => 'Kondisi buku rusak, Harus membayar denda kerusakan'
                ];
                break;
            case ReturnBookCondition::LOST->value:
                $other_fee = ($fineSetting->lost_fee_percentage / 100) * 2 * $returnBook->book->price;
                $returnBook->update([
                    'status' => ReturnBookStatus::FINE->value
                ]);

                $this->returnBookRepository->createFine($returnBook, $late_fee, $other_fee);
                return [
                    'message' => 'Kondisi buku hilang, Harus membayar denda kehilangan'
                ];
                break;

            default:
                if ($daysLate > 0) {
                    $returnBook->update([
                        'status' => ReturnBookStatus::FINE->value
                    ]);

                    $this->returnBookRepository->createFine($returnBook, $late_fee, 0);
                    return [
                        'message' => 'Terlambat mengembalikan buku, Harus membayar denda keterlambatan'
                    ];
                } else {
                    $returnBook->update([
                        'status' => ReturnBookStatus::RETURNED->value
                    ]);
                    return null;
                }

                break;
        }
    }
}
