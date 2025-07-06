import { ColumnsRuteAccess } from '@/components/columns-rute-access';
import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { propsPage } from '@/types/rute-access';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PlusCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Rute Akses',
        href: '#',
    },
];

export default function Index({ routeAccess, page_settings }: propsPage) {
    console.log(routeAccess);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_settings.title} />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild>
                        <Link href={route('admin.route-accesses.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsRuteAccess}
                            data={routeAccess.data}
                            sortableColumns={['route_name', 'role_name', 'permission_name', 'created_at']}
                            searchableColumns={['route_name', 'role_name', 'permission_name']} // Now searchable in name, email, and phone
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
