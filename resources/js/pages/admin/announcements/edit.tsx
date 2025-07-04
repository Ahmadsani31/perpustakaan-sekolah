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
import { Checkbox } from '@/components/ui/checkbox';

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
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    },
    announcement: {
        id: number;
        message: string;
        url: string;
        is_active: boolean;
    }
}


type PropsForm = {
    id: number;
    message: string;
    url: string;
    is_active: boolean;
    _method: string;
};

export default function Edit({ announcement, page_settings }: propsPage) {


    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        id: announcement.id ?? '',
        message: announcement.message ?? '',
        url: announcement.url ?? '',
        is_active: announcement.is_active ?? false,
        _method: page_settings.method,
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

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
            <Head title="Tambah Pengumuman" />
            <div className='flex flex-col w-full pb-32  px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 md:flex-row md:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild >
                        <Link href={route('admin.announcements.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className='space-y-6'>
                            <FormInput
                                id='message'
                                title="Pesan"
                                type="text"
                                placeholder='Isi Pesan...'
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                errors={errors.message}
                            />
                            <FormInput
                                id='url'
                                title="URL"
                                type="text"
                                placeholder='Isi url...'
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                errors={errors.url}
                            />
                            <div className="flex items-center gap-3">
                                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={() => setData('is_active', !data.is_active)} />
                                <Label htmlFor="is_active">Apakah Aktif</Label>
                            </div>
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