import { ColumnsRoles } from '@/components/columns-roles';
import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { itemColumns, propsPage } from '@/types/roles';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowDownUpIcon, PencilIcon, PlusCircle, RefreshCwIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '#',
    },
];


export default function Index({ roles, page_settings }: propsPage) {


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild>
                        <Link href={route('admin.roles.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsRoles}
                            data={roles.data}
                            sortableColumns={['name', 'guard_name', 'created_at']}
                            searchableColumns={['name', 'guard_name']} // Now searchable in name, email, and phone
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
