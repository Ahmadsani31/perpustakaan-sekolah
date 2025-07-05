import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowDownUpIcon, CassetteTape, CreditCardIcon, LoaderCircle, PencilIcon, PlusCircle, RefreshCwIcon, Settings, TrashIcon } from 'lucide-react';
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
import { flashMessage } from '@/lib/utils';
import { toast } from 'react-toastify';

import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

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
    announcement: {
        data: []
    },
    page_settings: {
        title: string;
        subtitle: string;
    },
}

type itemUserIndex = {
    id: number;
    user: {
        name: string;
    }
    user_id: number;
    book_id: number;
    loan_code: string;
    loan_date: string;
    due_date: string;
    created_at: string;
}

export const columns: ColumnDef<itemUserIndex>[] = [
    {
        accessorKey: "message",
        header: "Pesan",
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }: any) => (<p>{row.original.url ? row.original.url : '-'}</p>)
    },
    {
        accessorKey: "is_active",
        header: "Aktif",
    },
    {
        accessorKey: "created_at",
        header: "Dibuat Pada",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'> Aksi  </span>),
        cell: ({ row }: any) => {
            return (
                <div className='flex items-center justify-center gap-x-1'>

                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('admin.announcements.edit', row.original)}>
                            <PencilIcon />
                        </Link>
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild className='cursor-pointer'>
                            <Button variant={'destructive'} size={'sm'} >
                                <TrashIcon />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah anda sudah yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini dapat menghapus data secara permanent dan tidak bisa dibatalkan. "Yes", berarti kamu sudah yakin untuk menghapus data secara permanent dari server.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => router.delete(
                                    route('admin.announcements.destroy', [row.original.id]), {
                                    preserveScroll: true,
                                    preserveState: true,
                                    onSuccess: (success) => {
                                        const flash = flashMessage(success)
                                        if (flash.type == 'success') toast.success(flash.message);
                                        if (flash.type == 'error') toast.error(flash.message);
                                    }
                                }
                                )}>Yes, delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]

export default function Index({ announcement, page_settings }: propsPage) {

    console.log(announcement);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengumuman" />
            <div className='flex flex-col w-full px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-4 gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild >
                        <Link href={route('admin.announcements.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={columns}
                            data={announcement.data}
                            sortableColumns={["name", "email", "date_of_birth", "created_at"]}
                            searchableColumns={["name", "email", "address"]}// Now searchable in name, email, and phone
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