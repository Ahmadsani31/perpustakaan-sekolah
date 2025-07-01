import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PlusCircle } from 'lucide-react';

import { propsPage } from '@/types/book';
import { DataTable } from '@/components/data-table';
import { ColumnsBook } from '@/components/columns-book';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Buku',
        href: '#',
    },
];

export default function Index({ books, page_settings }: propsPage) {

    // const { data: bookList, meta } = books;

    // const [params, setParams] = useState(state)
    // const [tableLoad, setTableLoad] = useState(false)

    // const onSortTable = (field: any) => {
    //     setParams({
    //         ...params,
    //         field: field,
    //         direction: params.direction === 'asc' ? 'desc' : 'asc'

    //     })
    // }

    // useFilter({
    //     route: route('admin.books.index'),
    //     values: params,
    //     only: ['books']
    // });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buku" />
            {/* <div className="p-3 bg-amber-100">
                <HeadingSmall title={page_settings.title} description={page_settings.subtitle} />
            </div> */}
            <div className='flex flex-col w-full px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-4 gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'primary'} size={'lg'} asChild >
                        <Link href={route('admin.books.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={ColumnsBook}
                            data={books.data}
                            sortableColumns={["book_code", "title", "author", "created_at"]}
                            searchableColumns={["book_code", "title", "author"]}// Now searchable in name, email, and phone
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