import HeaderTitle from '@/components/header-title';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { flashMessage } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PencilIcon, PlusCircle, TrashIcon } from 'lucide-react';
import { toast } from 'react-toastify';

import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import ColumnsDatatableActionDelete from '@/components/columns-datatable-action-delete';
import { ColumnsAnnouncement } from '@/components/columns-announcement';
import { propsIndex } from '@/types/announcement';

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

export default function Index({ announcement, page_settings }: propsIndex) {
    console.log(announcement);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengumuman" />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild>
                        <Link href={route('admin.announcements.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsAnnouncement}
                            data={announcement.data}
                            sortableColumns={['name', 'email', 'date_of_birth', 'created_at']}
                            searchableColumns={['name', 'email', 'address']} // Now searchable in name, email, and phone
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
