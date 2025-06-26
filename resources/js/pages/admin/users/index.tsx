import HeaderTitle from '@/components/header-title';
import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowDownUpIcon, ArrowUpDown, CassetteTape, LoaderCircle, LockKeyhole, PencilIcon, PlusCircle, RefreshCwIcon, Settings, TrashIcon } from 'lucide-react';
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
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { useState } from 'react';
import useFilter from '@/hooks/use-filter';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TableLoader from '@/components/table-loader';

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '@/components/data-table';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pengguna',
        href: '#',
    },
];

interface propsPage {
    users: {
        data: itemUserIndex[]
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

type itemUserIndex = {
    id: number;
    name: string;
    email: string;
    address: string;
    avatar: string;
    gender: string;
    date_of_birth: string;
    created_at: string;
}

export const columns: ColumnDef<itemUserIndex>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "No Handphone",
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.avatar} />
                <AvatarFallback>{row.original.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "gender",
        header: "Jenis Kelamin",
    },
    {
        accessorKey: "date_of_birth",
        header: "Tanggal Lahir",
    },
    {
        accessorKey: "address",
        header: "Alamat",
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
        cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString(),
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'> Aksi  </span>),
        cell: ({ row }) => {

            const onHandleSubmit = () => {

            }

            return (
                <div className='flex items-center gap-x-1'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild className='cursor-pointer'>
                            <Button variant={'primary'} size={'sm'} >
                                <LockKeyhole />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Update Password Pengguna</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Silahkan update password pengguna dengan memasukan password baru.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <form onSubmit={onHandleSubmit} className='space-y-6'>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">Password</Label>
                                        <Input id="name-1" name="name" placeholder='Masukan password...' />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="username-1">Konfimasi Password</Label>
                                        <Input id="username-1" name="username" placeholder='Masukan konfirmasi password...' />
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction type='submit'>Update Password</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>

                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('admin.users.edit', row.original)}>
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
                                    route('admin.users.destroy', [row.original.id]), {
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

export default function Index({ users, page_settings }: propsPage) {

    console.log('user', users);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className='flex flex-col w-full px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-4 gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild >
                        <Link href={route('admin.users.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={columns}
                            data={users.data}
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