import { ColumnsAssignUsers } from '@/components/columns-assign-users';
import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';

import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { propsPage } from '@/types/assign-user';
import { Head } from '@inertiajs/react';
import { AlignCenterHorizontalIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Terapkan Peran',
        href: '#',
    },
];

export default function Index({ users, page_settings }: propsPage) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Terapkan Peran" />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsAssignUsers}
                            data={users.data}
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
