import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AlignCenterHorizontalIcon } from 'lucide-react';

import FineStatusBadge from '@/components/fine-status-badge';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { formatToRupiah } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Category',
        href: '#',
    },
];

interface propsPage {
    return_book: {
        data: string[];
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
}

type itemCategory = {
    id: number;
    name: string;
    slug: string;
    description: string;
    cover: string;
    created_at: string;
};

export default function Create({ return_book, page_settings }: propsPage) {
    // console.log(return_book);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <Card>
                    <div className="grid grid-cols-3 gap-1.5 p-4">
                        <CardContent className="flex flex-col items-center justify-center rounded border p-3">
                            <span className="text-center font-bold">Kode Peminjaman</span>
                            <p>{return_book.data.loan.loan_code}</p>
                        </CardContent>
                        <CardContent className="flex flex-col items-center justify-center rounded border p-3">
                            <span className="text-center font-bold">Kode Pengembalian</span>
                            <p>{return_book.data.return_book_code}</p>
                        </CardContent>
                        <CardContent className="flex flex-col items-center justify-center rounded border p-3">
                            <span className="text-center font-bold">Tanggal Peminjaman</span>
                            <p>{return_book.data.loan.loan_date}</p>
                        </CardContent>
                        <CardContent className="flex flex-col items-center justify-center rounded border p-3">
                            <span className="text-center font-bold">Batas Pengembalian</span>
                            <p>{return_book.data.loan.due_date}</p>
                        </CardContent>
                        <CardContent className="flex flex-col items-center justify-center rounded border p-3">
                            <span className="text-center font-bold">Tanggal Pengembalian</span>
                            <p>{return_book.data.return_date}</p>
                        </CardContent>
                        <CardContent className="flex flex-col items-center justify-center rounded border p-3">
                            <span className="font-bold">Total Denda</span>
                            <p>{formatToRupiah(return_book.data.fine.total_fee)}</p>
                        </CardContent>
                    </div>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Pengguna</TableHead>
                                    <TableHead className="text-center">Buku</TableHead>
                                    <TableHead className="text-center">Denda Keterlambatan</TableHead>
                                    <TableHead className="text-center">Denda Lain-lain</TableHead>
                                    <TableHead className="text-center">Total Denda</TableHead>
                                    <TableHead className="text-center">Status Pembayaran</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="text-center">
                                    <TableCell>{return_book.data.user.name}</TableCell>
                                    <TableCell>{return_book.data.book.title}</TableCell>
                                    <TableCell>
                                        {formatToRupiah(return_book.data.fine.late_fee)}
                                        <p className="text-red-500">{return_book.data.daysLate}</p>
                                    </TableCell>
                                    <TableCell>
                                        {formatToRupiah(return_book.data.fine.other_fee)}
                                        <p className="text-red-500">{return_book.data.return_book_check.condition}</p>
                                    </TableCell>
                                    <TableCell>{formatToRupiah(return_book.data.fine.total_fee)}</TableCell>
                                    <TableCell>
                                        <FineStatusBadge status={return_book.data.fine.payment_status} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="mt-6 grid w-full items-center gap-1.5">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="notes">Catatan</Label>
                                <Textarea id="notes" value={return_book.data.return_book_check.notes ?? '-'} readOnly />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
