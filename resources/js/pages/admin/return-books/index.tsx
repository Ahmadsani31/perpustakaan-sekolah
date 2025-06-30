import HeaderTitle from '@/components/header-title';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowDownUpIcon, CassetteTape, LoaderCircle, PencilIcon, PlusCircle, RefreshCwIcon, Settings, TrashIcon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { flashMessage, formatToRupiah } from '@/lib/utils';
import { toast } from 'react-toastify';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TableLoader from '@/components/table-loader';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

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
        data: itemData[]
    },
    page_settings: {
        title: string;
        subtitle: string;
    },
    state: {
        page: number;
        search: string;
        load: string;
        field: string;
        direction: string;
    }
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
}

export const columns: ColumnDef<itemData>[] = [
    {
        accessorKey: "return_book_code",
        header: "Kode Pengembalian",
    },
    {
        accessorKey: "loan.loan_code",
        header: "Kode Peminjaman",
    },
    {
        accessorKey: "user.name",
        header: "Name",
    },
    {
        accessorKey: "book.title",
        header: "Buku",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "loan.loan_date",
        header: "Tanggal Peminjaman",
    },
    {
        accessorKey: "loan.due_date",
        header: "Batas Peminjaman",
    },
    {
        accessorKey: "return_date",
        header: "Tanggal Pengembalian",
    },
    {
        accessorKey: "return_book.fine",
        header: "Denda",
        cell: ({ row }: any) => {
            return (
                <p className='font-bold text-red-500'>
                    {formatToRupiah(row.original.fine)}
                </p>
            )
        }
    },
    {
        accessorKey: "return_book_check",
        header: "Kondisi",
    },
    {
        accessorKey: "created_at",
        header: "Dibuat Pada",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'>Aksi</span>),
        cell: ({ row }) => {

            return (
                <div className='flex items-center gap-x-1'>

                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href="#">
                            <PencilIcon />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
]

export default function Index({ return_books, page_settings }: propsPage) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengembalian Buku" />
            <div className='flex flex-col w-full px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-4 gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild >
                        <Link href={'#'}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>

                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={columns}
                            data={return_books.data}
                            sortableColumns={["loan_code", "loan_date", "due_date", "created_at"]}
                            searchableColumns={["loan_code", "book_title", "user_name"]}// Now searchable in name, email, and phone
                            showIndex={true}
                            dynamicIndex={true}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />