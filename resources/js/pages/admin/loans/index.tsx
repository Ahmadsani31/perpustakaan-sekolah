import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, CreditCardIcon, PencilIcon, PlusCircle } from 'lucide-react';

import ColumnsDatatableActionDelete from '@/components/columns-datatable-action-delete';
import { DataTable } from '@/components/data-table';
import DialogLoanCreate from '@/components/dialog-loan-create';
import DialogLoanEdit from '@/components/dialog-loan-edit';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Peminjaman',
        href: '#',
    },
];

interface propsPage {
    loans: {
        data: itemUserIndex[];
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
}

type itemUserIndex = {
    id: number;
    user: {
        name: string;
    };
    user_id: number;
    book_id: number;
    loan_code: string;
    loan_date: string;
    due_date: string;
    created_at: string;
};

export const columns: ColumnDef<itemUserIndex>[] = [
    {
        accessorKey: 'loan_code',
        header: 'Kode Peminjaman',
    },
    {
        accessorKey: 'user.name',
        header: 'Nama',
    },
    {
        accessorKey: 'book.title',
        header: 'Buku',
    },
    {
        accessorKey: 'loan_date',
        header: 'Tanggal Peminjaman',
    },
    {
        accessorKey: 'due_date',
        header: 'Batas Pengembalian',
    },
    {
        accessorKey: 'created_at',
        header: 'Dibuat Pada',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center"> Aksi </span>,
        cell: ({ row }: any) => {
            const [dialogEdit, setDialogEdit] = useState(false);
            return (
                <div className="flex items-center justify-center gap-x-1">
                    {!row.original.has_return_book ? (
                        <Button variant={'warning'} size={'sm'} asChild>
                            <Link href={route('admin.return-books.create', row.original)}>
                                <CreditCardIcon />
                            </Link>
                        </Button>
                    ) : null}
                    <Button variant={'default'} size={'sm'} onClick={() => setDialogEdit(true)}>
                        <PencilIcon />
                    </Button>

                    {/* <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('admin.loans.edit', row.original)}>
                            <PencilIcon />
                        </Link>
                    </Button> */}
                    <ColumnsDatatableActionDelete url={route('admin.loans.destroy', [row.original])} />

                    {dialogEdit && <DialogLoanEdit open={dialogEdit} onOpenChange={setDialogEdit} id={row.original.id} />}
                </div>
            );
        },
    },
];

export default function Index({ loans, page_settings }: propsPage) {
    const [dialogAdd, setDialogAdd] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Peminjaman" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />
                    <Button variant={'primary'} size={'lg'} onClick={() => setDialogAdd(true)}>
                        <PlusCircle /> Tambah
                    </Button>
                    {/* <Button variant={'primary'} size={'lg'} asChild >
                        <Link href={route('admin.loans.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button> */}
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={columns}
                            data={loans.data}
                            sortableColumns={['loan_code', 'loan_date', 'due_date', 'created_at']}
                            searchableColumns={['loan_code', 'book_title', 'user_name']} // Now searchable in name, email, and phone
                            showIndex={true}
                            dynamicIndex={true}
                        />
                    </CardContent>
                </Card>
            </div>
            <DialogLoanCreate open={dialogAdd} onOpenChange={setDialogAdd} />
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
