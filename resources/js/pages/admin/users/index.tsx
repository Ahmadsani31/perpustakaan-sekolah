import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PlusCircle } from 'lucide-react';

import { ColumnsUser } from '@/components/columns-user';
import { DataTable } from '@/components/data-table';

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
        data: itemUserIndex[];
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
    state: {
        page: number;
        search: string;
        load: string;
        field: string;
        direction: string;
    };
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
};

export default function Index({ users, page_settings }: propsPage) {
    // console.log('user', users);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild>
                        <Link href={route('admin.users.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsUser}
                            data={users.data}
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
