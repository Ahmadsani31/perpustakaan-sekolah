import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatToRupiah } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { AlignCenterHorizontalIcon, EyeIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pengembalian Buku',
        href: '#',
    },
];

interface propsPage {
    return_books: {
        data: itemData[];
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
    state: {
        page: number;
        search: string;
        load: string;
        field: string;
        direction: string;
    };
}

type itemData = {
    id: number;
    return_book_codes: string;
    status: string;
    loan: [];
    user: [];
    book: [];
    return_date: string;
    created_at: string;
};

export const columns: ColumnDef<itemData>[] = [
    {
        accessorKey: 'return_book_code',
        header: 'Kode Pengembalian',
    },
    {
        accessorKey: 'loan.loan_code',
        header: 'Kode Peminjaman',
    },
    {
        accessorKey: 'user.name',
        header: 'Name',
    },
    {
        accessorKey: 'book.title',
        header: 'Buku',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'loan.loan_date',
        header: 'Tanggal Peminjaman',
    },
    {
        accessorKey: 'loan.due_date',
        header: 'Batas Peminjaman',
    },
    {
        accessorKey: 'return_date',
        header: 'Tanggal Pengembalian',
    },
    {
        accessorKey: 'return_book.fine',
        header: 'Denda',
        cell: ({ row }: any) => {
            return <p className="font-bold text-red-500">{formatToRupiah(row.original.fine)}</p>;
        },
    },
    {
        accessorKey: 'return_book_check',
        header: 'Kondisi',
    },
    {
        accessorKey: 'created_at',
        header: 'Dibuat Pada',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }: any) => {
            return (
                <div className="flex items-center gap-x-1">
                    {row.original.fine && (
                        <Button variant={'default'} size={'sm'} asChild>
                            <Link href={route('admin.fines.create', row.original.return_book_code)}>
                                <EyeIcon />
                            </Link>
                        </Button>
                    )}
                </div>
            );
        },
    },
];

export default function Index({ return_books, page_settings }: propsPage) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_settings.title} />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={columns}
                            data={return_books.data}
                            sortableColumns={['loan_code', 'loan_date', 'due_date', 'created_at']}
                            searchableColumns={['loan_code', 'book_title', 'user_name']} // Now searchable in name, email, and phone
                            showIndex={true}
                            dynamicIndex={true}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
