import HeaderTitle from '@/components/header-title';
import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CassetteTape, PencilIcon, PlusCircle, TrashIcon } from 'lucide-react';
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
    },
    page_settings: {
        title: string;
        subtitle: string;
    }
}

type itemCategory = {
    id: number;
    name: string;
    slug: string;
    cover: string;
    created_at: string;
}

export default function Index({ categories, page_settings }: propsPage) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className='flex flex-col w-full pb-32  px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />

                    <Button variant={'outline'} size={'lg'} asChild >
                        <Link href={route('admin.categories.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card>
                    <CardContent className='[&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6'>
                        <Table className='w-full'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Cover</TableHead>
                                    <TableHead>Dibuat</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.length > 0 ? (
                                    categories.data.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableHead>{index + 1}</TableHead>
                                            <TableHead>{category.name}</TableHead>
                                            <TableHead>{category.slug}</TableHead>
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
                                                        <AlertDialogTrigger>
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
                                                                <AlertDialogAction>Yes, delete</AlertDialogAction>
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
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />