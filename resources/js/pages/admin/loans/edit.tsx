import HeaderTitle from '@/components/header-title';
import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle, PencilIcon, PlusCircle, TrashIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormInput from '@/components/form-input';
import { FormEventHandler, useRef } from 'react';
import FormTextarea from '@/components/form-textarea';
import { flashMessage } from '@/lib/utils';
import { toast } from 'react-toastify';
import FormInputFile from '@/components/form-input-file';
import ReactSelect from '@/components/react-select';

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
    loans: {
        id: number;
        user_id: string;
        book_id: string;
    },
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    }
    page_data: {
        books: {
            value: number;
            label: string;
        }[],
        users: {
            value: number;
            label: string;
        }[]
    }
}


type PropsForm = {
    id: number;
    user: string;
    book: string;
    _method: string;
};

export default function Edit({ page_settings, page_data, loans }: propsPage) {


    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        id: loans.id ?? '',
        book: loans.book_id ?? '',
        user: loans.user_id ?? '',
        _method: page_settings.method ?? 'put',
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);
        // console.log(page_settings.action);
        // return
        post(page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success)
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);

            },
        });
    };

    const onHandleReset = () => {
        reset();

    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Peminjaman" />
            <div className='flex flex-col w-full pb-32  px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 md:flex-row md:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild >
                        <Link href={route('admin.loans.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className='space-y-6' encType='multipart/form-data'>
                            <ReactSelect
                                id='user'
                                title='Pengguna'
                                dataValue={page_data.users}
                                value={data.user?.toString()}
                                onValueChange={(value) => setData('user', value)}
                                placeholder='Pilih pengguna'
                                errors={errors.user}
                            />
                            <ReactSelect
                                id='book'
                                title='Buku'
                                dataValue={page_data.books}
                                value={data.book?.toString()}
                                onValueChange={(value) => setData('book', value)}
                                placeholder='Pilih Buku'
                                errors={errors.book}
                            />
                            <div className='flex justify-end gap-x-2'>
                                <Button type='button' variant={'outline'} size={'lg'} onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type='submit' variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>

                </Card>
            </div>
        </AppLayout>
    )
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />