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
import { ArrowLeft, CassetteTape, PencilIcon, PlusCircle, TrashIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormInput from '@/components/form-input';
import { FormEventHandler, useRef } from 'react';
import FormTextarea from '@/components/form-textarea';
import { flashMessage } from '@/lib/utils';
import { toast } from 'react-toastify';

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
    category: PropsForm,
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    }
}


type PropsForm = {
    id: number;
    name: string;
    description: string;
    cover: File | null;
};

export default function Edit({ page_settings, category }: propsPage) {

    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, put, reset, errors, processing } = useForm<Required<PropsForm>>({
        id: category.id ?? '',
        name: category.name ?? '',
        description: category.description ?? '',
        cover: null,
    });

    console.log(errors);

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        put(route(page_settings.action, [category]), {
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
        if (fileInputCover.current) {
            fileInputCover.current.value = '';
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Category" />
            <div className='flex flex-col w-full pb-32  px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'destructive'} size={'lg'} asChild >
                        <Link href={route('admin.categories.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className='space-y-6'>
                            <FormInput id='name' title="Name" type="text" placeholder='Name katagory...' value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
                            <FormTextarea id='description' title="Description" placeholder='Masukan description... (opsional)' value={data.description} onChange={(e) => setData('description', e.target.value)} errors={errors.description} />
                            <div className='grid w-full items-center gap-1.5'>
                                <Label htmlFor='cover'>Cover</Label>
                                <Input
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'cover',
                                            e.target.files && e.target.files[0] ? e.target.files[0] : null
                                        )
                                    }
                                    ref={fileInputCover}
                                />
                                {errors && (
                                    <p className="text-sm m-0 text-red-500">{errors.cover}</p>
                                )}
                            </div>
                            <div className='flex justify-end gap-x-2'>
                                <Button type='button' variant={'outline'} size={'lg'} onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type='submit' variant={'default'} size={'lg'} disabled={processing}>
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