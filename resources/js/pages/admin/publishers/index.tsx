import HeaderTitle from '@/components/header-title';
import TableLoader from '@/components/table-loader';
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
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useFilter from '@/hooks/use-filter';
import AppLayout from '@/layouts/app-layout';
import { flashMessage } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { propsPage } from '@/types/publisher';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowDownUpIcon, PencilIcon, PlusCircle, RefreshCwIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Publishers',
        href: '#',
    },
];

export default function Index({ publishers, page_settings, state }: propsPage) {
    const { data: publisherList, meta } = publishers;

    const [params, setParams] = useState(state);
    const [tableLoad, setTableLoad] = useState(false);

    const onSortTable = (field: any) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.publishers.index'),
        values: params,
        only: ['publishers'],
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penerbit" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild>
                        <Link href={route('admin.publishers.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardHeader className="mt-3">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <Select value={params?.load.toString()} onValueChange={(e) => setParams({ ...params, load: e })}>
                                <SelectTrigger className="w-full sm:w-24">
                                    <SelectValue placeholder="Load" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[10, 25, 50, 75, 100].map((number, index) => (
                                        <SelectItem key={index} value={number.toString()}>
                                            {number}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex items-start gap-2">
                                <Input
                                    className="w-full"
                                    placeholder="Search..."
                                    value={params?.search}
                                    onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                                />
                                <Button variant={'destructive'} onClick={() => setParams(state)} size={'lg'}>
                                    <RefreshCwIcon /> Clear
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <div className="flex items-center justify-center gap-x-2">#</div>
                                    </TableHead>
                                    <TableHead onClick={() => onSortTable('name')} className="cursor-pointer">
                                        <div className="flex items-center justify-center gap-x-2">
                                            Name
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <ArrowDownUpIcon size={15} />
                                            </span>
                                        </div>
                                    </TableHead>
                                    <TableHead onClick={() => onSortTable('email')} className="cursor-pointer">
                                        <div className="flex items-center justify-center gap-x-2">
                                            Email
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <ArrowDownUpIcon size={15} />
                                            </span>
                                        </div>
                                    </TableHead>
                                    <TableHead onClick={() => onSortTable('address')} className="cursor-pointer">
                                        <div className="flex items-center justify-center gap-x-2">
                                            Address
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <ArrowDownUpIcon size={15} />
                                            </span>
                                        </div>
                                    </TableHead>
                                    <TableHead>
                                        <div className="flex items-center justify-center gap-x-2">Phone</div>
                                    </TableHead>
                                    <TableHead>
                                        <div className="flex items-center justify-center gap-x-2">Logo</div>
                                    </TableHead>
                                    <TableHead onClick={() => onSortTable('created_at')}>
                                        <div className="flex items-center justify-center gap-x-2">
                                            Dibuat pada
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <ArrowDownUpIcon size={15} />
                                            </span>
                                        </div>
                                    </TableHead>
                                    <TableHead>
                                        <div className="flex items-center justify-center gap-x-2">Aksi</div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            {tableLoad ? (
                                <TableLoader rows={5} columns={7} />
                            ) : (
                                <TableBody>
                                    {publisherList.length > 0 ? (
                                        publisherList.map((publisher, index) => (
                                            <TableRow key={index}>
                                                <TableHead>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableHead>
                                                <TableHead>{publisher.name}</TableHead>
                                                <TableHead>{publisher.email}</TableHead>
                                                <TableHead>{publisher.address}</TableHead>
                                                <TableHead>{publisher.phone}</TableHead>
                                                <TableHead>
                                                    <Avatar>
                                                        <AvatarImage src={publisher.logo} />
                                                        <AvatarFallback>{publisher.name.substring(0, 1)}</AvatarFallback>
                                                        {/* <img src={category.cover} alt={category.name} width={40} height={40} /> */}
                                                    </Avatar>
                                                </TableHead>
                                                <TableHead>{publisher.created_at}</TableHead>
                                                <TableHead>
                                                    {/* Add action buttons/links here */}
                                                    <div className="flex items-center gap-x-1">
                                                        <Button variant={'default'} size={'sm'} asChild>
                                                            <Link href={route('admin.publishers.edit', publisher.id)}>
                                                                <PencilIcon />
                                                            </Link>
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild className="cursor-pointer">
                                                                <Button variant={'destructive'} size={'sm'}>
                                                                    <TrashIcon />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete your account and
                                                                        remove your data from our servers. {publisher.id}
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            router.delete(route('admin.publishers.destroy', [publisher]), {
                                                                                preserveScroll: true,
                                                                                preserveState: true,
                                                                                onSuccess: (success) => {
                                                                                    const flash = flashMessage(success);
                                                                                    if (flash.type == 'success') toast.success(flash.message);
                                                                                    if (flash.type == 'error') toast.error(flash.message);
                                                                                },
                                                                            })
                                                                        }
                                                                    >
                                                                        Yes, delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableHead>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableHead colSpan={6}>
                                                <p>kosong</p>
                                            </TableHead>
                                        </TableRow>
                                    )}
                                </TableBody>
                            )}
                        </Table>
                    </CardContent>
                    <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                        <p className="mb-2 text-sm text-muted-foreground">
                            Show <span className="font-medium text-orange-500">{meta.from ?? 0}</span> from {meta.total} kategory
                        </p>
                        <div className="overflow-x-auto">
                            {meta.has_pages && (
                                <Pagination>
                                    <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                        {meta.links.map((link, index) => (
                                            <PaginationItem key={index} className="lb:mb-0 mx-1 mb-1">
                                                <PaginationLink href={link.url} isActive={link.active}>
                                                    {link.label}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
