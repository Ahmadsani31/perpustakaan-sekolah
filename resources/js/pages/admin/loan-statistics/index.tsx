import HeaderTitle from '@/components/header-title';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, Calendar, Calendar1, CalendarDays, CalendarRange } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Peminjaman',
        href: '#',
    },
];

interface propsPage {
    page_data: any;
    page_settings: {
        title: string;
        subtitle: string;
    };
}

type ItemDatatable = {
    loans_count: number;
    title: string;
    author: string;
};

export const columnsA: ColumnDef<ItemDatatable>[] = [
    {
        accessorKey: 'title',
        header: 'Buku',
    },
    {
        accessorKey: 'author',
        header: 'Penulis',
    },
    {
        accessorKey: 'loans_count',
        header: 'Jumlah',
    },
];

export const columnsB: ColumnDef<ItemDatatable>[] = [
    {
        accessorKey: 'title',
        header: 'Buku',
    },
    {
        accessorKey: 'author',
        header: 'Penulis',
    },
    {
        accessorKey: 'loans_count',
        header: 'Jumlah',
    },
];

export default function Index({ page_settings, page_data }: propsPage) {
    console.log(page_data.total_loan);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_settings.title} />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className="flex w-full flex-col px-4 py-2">
                <div className="mb-4 flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <div className="mb-5 grid auto-rows-min gap-4 md:grid-cols-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <SectionCards name="Harian" icon={Calendar} value={page_data.total_loan.days} />
                    <SectionCards name="Mingguan" icon={CalendarDays} value={page_data.total_loan.weeks} />
                    <SectionCards name="Bulanan" icon={CalendarRange} value={page_data.total_loan.months} />
                    <SectionCards name="Tahunan" icon={Calendar1} value={page_data.total_loan.years} />
                </div>
                <h2 className="mb-3 leading-relaxed font-semibold text-foreground">Peminjaman Per Buku</h2>
                <div className="grid auto-rows-min gap-4 lg:grid-cols-2">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Buku Paling Banyak Dipinjam</CardTitle>
                        </CardHeader>
                        <CardContent className="[&-td]:whitespace-nowrap">
                            <DataTable
                                columns={columnsA}
                                data={page_data.most_loan_books.data}
                                sortableColumns={[]}
                                searchableColumns={[]} // Now searchable in name, email, and phone
                                showIndex={true}
                                dynamicIndex={true}
                            />
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Buku Paling Sedikit Dipinjam</CardTitle>
                        </CardHeader>
                        <CardContent className="[&-td]:whitespace-nowrap">
                            <DataTable
                                columns={columnsB}
                                data={page_data.least_loan_books.data}
                                sortableColumns={[]}
                                searchableColumns={[]} // Now searchable in name, email, and phone
                                showIndex={true}
                                dynamicIndex={true}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
