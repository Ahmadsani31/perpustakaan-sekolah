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
import { propsPageEdit, publishersForm } from '@/types/publisher';

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

export default function Edit({ page_settings, publisher }: propsPageEdit) {

    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<publishersForm>>({
        name: publisher.name,
        address: publisher.address,
        email: publisher.email,
        phone: publisher.phone,
        logo: null,
        _method: page_settings.method,
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // console.log(data);
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
        if (fileInputCover.current) {
            fileInputCover.current.value = '';
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Category" />
            <div className='flex flex-col w-full pb-32  px-4 py-2'>
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 md:flex-row md:items-center'>
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild >
                        <Link href={route('admin.publishers.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className='space-y-6'>
                            <FormInput id='name' title="Name" type="text" placeholder='Name publisher...' value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
                            <FormInput id='email' title="Email" type="text" placeholder='Email...' value={data.email} onChange={(e) => setData('email', e.target.value)} errors={errors.email} />
                            <FormInput id='phone' title="No Handphone" type="number" placeholder='No handphone...' value={data.phone.replace(/\D/g, '')} onChange={(e) => setData('phone', e.target.value)} errors={errors.phone} />
                            <FormTextarea id='address' title="Address" placeholder='Alamat... (opsional)' value={data.address} onChange={(e) => setData('address', e.target.value)} errors={errors.address} />
                            <div className='grid w-full items-center gap-1.5'>
                                <Label htmlFor='cover'>Logo</Label>
                                <Input
                                    className='cursor-pointer'
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'logo',
                                            e.target.files && e.target.files[0] ? e.target.files[0] : null
                                        )
                                    }
                                    ref={fileInputCover}
                                />
                                {errors && (
                                    <p className="text-sm m-0 text-red-500">{errors.logo}</p>
                                )}
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