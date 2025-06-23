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
import { AlignCenterHorizontalIcon, ArrowDownUpIcon, CassetteTape, LoaderCircle, PencilIcon, PlusCircle, RefreshCwIcon, TrashIcon } from 'lucide-react';
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
    categories: {
        data: itemCategory[]
        meta: {
            from: number;
            total: number;
            current_page: number;
            per_page: number;
            has_pages: boolean;
            links: {
                url: string,
                label: string,
                active: boolean
            }[]
        }
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

type itemCategory = {
    id: number;
    name: string;
    slug: string;
    description: string;
    cover: string;
    created_at: string;
}

export default function Index({ categories, page_settings, state }: propsPage) {



    const { data: categoryList, meta } = categories;

    const [params, setParams] = useState(state)
    const [tableLoad, setTableLoad] = useState(false)

    const onSortTable = (field: any) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc'

        })
    }

    const onHendlerParams = () => {

    }

    useFilter({
        route: route('admin.categories.index'),
        values: params,
        only: ['categories']
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className='flex flex-col w-full px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-4 gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'outline'} size={'lg'} asChild >
                        <Link href={route('admin.categories.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardHeader className='mt-3'>
                        <div className='flex w-full flex-col gap-4 justify-between sm:flex-row sm:items-center'>
                            <Select value={params?.load.toString()} onValueChange={(e) => setParams({ ...params, load: e })}>
                                <SelectTrigger className='w-full sm:w-24'>
                                    <SelectValue placeholder='Load' />
                                </SelectTrigger>
                                <SelectContent>
                                    {[10, 25, 50, 75, 100].map((number, index) => (
                                        <SelectItem key={index} value={number.toString()}>{number}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className='flex items-start gap-2'>

                                <Input className='w-full' placeholder='cari...' value={params?.search} onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))} />
                                <Button variant={'destructive'} onClick={() => setParams(state)} size={'lg'}><RefreshCwIcon /> Clear</Button>
                            </div>

                        </div>

                    </CardHeader>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <Table className='w-full'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>
                                        <Button variant={'ghost'} className='inline-flex group' onClick={() => onSortTable('name')}>
                                            Name
                                            <span className='flex-none ml-2 rounded text-muted-foreground'>
                                                <ArrowDownUpIcon />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button variant={'ghost'} className='inline-flex group' onClick={() => onSortTable('slug')}>
                                            Slug
                                            <span className='flex-none ml-2 rounded text-muted-foreground'>
                                                <ArrowDownUpIcon />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button variant={'ghost'} className='inline-flex group' onClick={() => onSortTable('description')}>
                                            Description
                                            <span className='flex-none ml-2 rounded text-muted-foreground'>
                                                <ArrowDownUpIcon />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>Cover</TableHead>
                                    <TableHead>
                                        <Button variant={'ghost'} className='inline-flex group' onClick={() => onSortTable('created_at')}>
                                            Dibuat pada
                                            <span className='flex-none ml-2 rounded text-muted-foreground'>
                                                <ArrowDownUpIcon />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            {tableLoad ? (<TableLoader rows={5} columns={7} />) : (

                                <TableBody>
                                    {categoryList.length > 0 ? (
                                        categoryList.map((category, index) => (
                                            <TableRow key={index}>
                                                <TableHead>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableHead>
                                                <TableHead>{category.name}</TableHead>
                                                <TableHead>{category.slug}</TableHead>
                                                <TableHead>{category.description}</TableHead>
                                                <TableHead>
                                                    <Avatar>
                                                        <AvatarImage src={category.cover} />
                                                        <AvatarFallback>{category.name.substring(0, 1)}</AvatarFallback>
                                                        {/* <img src={category.cover} alt={category.name} width={40} height={40} /> */}
                                                    </Avatar>
                                                </TableHead>
                                                <TableHead>{category.created_at}</TableHead>
                                                <TableHead>
                                                    {/* Add action buttons/links here */}
                                                    <div className='flex items-center gap-x-1'>


                                                        <Button variant={'default'} size={'sm'} asChild >
                                                            <Link href={route('admin.categories.edit', category.id)}>
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
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete your account
                                                                        and remove your data from our servers. {category.id}
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => router.delete(
                                                                        route('admin.categories.destroy', [category]), {
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
                    <CardFooter className='flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row'>
                        <p className='mb-2 text-sm text-muted-foreground'>
                            Show <span className='font-medium text-orange-500'>{meta.from ?? 0}</span> from {meta.total} kategory
                        </p>
                        <div className='overflow-x-auto'>
                            {meta.has_pages && (
                                <Pagination>
                                    <PaginationContent className='flex flex-wrap justify-center lg:justify-end'>
                                        {meta.links.map((link, index) => (
                                            <PaginationItem key={index} className='mx-1 mb-1 lb:mb-0'>
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
    )
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />