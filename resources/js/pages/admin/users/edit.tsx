import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle } from 'lucide-react';

import FormInput from '@/components/form-input';
import { FormEventHandler, useRef } from 'react';
import FormTextarea from '@/components/form-textarea';
import { flashMessage } from '@/lib/utils';
import { toast } from 'react-toastify';
import FormInputFile from '@/components/form-input-file';
import FormSelect from '@/components/form-select';
import FormDatePicker from '@/components/form-date-picker';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Edit Pengguna',
        href: '#',
    },
];

interface propsPage {
    users: PropsForm,
    genders: []
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
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    address: string;
    avatar: File | null;
    _method: string;
};

export default function Edit({ page_settings, users, genders }: propsPage) {

    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        id: users.id ?? '',
        name: users.name ?? '',
        email: users.email ?? '',
        password: '',
        password_confirmation: '',
        phone: users.phone ?? '',
        gender: users.gender ?? '',
        date_of_birth: users.date_of_birth ?? '',
        address: users.address ?? '',
        avatar: null,
        _method: page_settings.method ?? 'put',
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
                reset();
                const flash = flashMessage(success);
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
                        <Link href={route('admin.users.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className='space-y-6' encType='multipart/form-data'>
                            <FormInput
                                id='name'
                                title="Name"
                                type="text"
                                placeholder='Masukan nama...'
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />

                            <div className='grid lg:grid-cols-2 items-start grid-cols-1 lg:gap-4 sm:gap-6'>
                                <FormInput
                                    id='email'
                                    title="Email"
                                    type="text"
                                    placeholder='Masukan email...'
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    errors={errors.email}
                                />
                                <FormInput
                                    id='phone'
                                    title="Nomor Handphone"
                                    type="text"
                                    placeholder='Masukan nomor handphone...'
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    errors={errors.phone}
                                />
                            </div>
                            <div className='grid lg:grid-cols-2 items-start grid-cols-1 lg:gap-4 sm:gap-6'>
                                <FormDatePicker
                                    id='date_of_birth'
                                    title='Tanggal lahir'
                                    value={data.date_of_birth}
                                    placeholder='Pilih tanggal lahir'
                                    onSelect={(val) => setData('date_of_birth', val)}
                                />
                                <FormSelect
                                    id='gender'
                                    title='Jenis Kelamin'
                                    dataValue={genders}
                                    value={data.gender}
                                    onValueChange={(value) => setData('gender', value)}
                                    placeholder='Pilih jenis kelamin'
                                    errors={errors.gender}
                                />
                            </div>
                            <FormTextarea id='address' title="Alamat" placeholder='Masukan alamat...' value={data.address} onChange={(e) => setData('address', e.target.value)} errors={errors.address} />
                            <FormInputFile id='logo' title="Logo" onChange={(e) =>
                                setData(
                                    'avatar',
                                    e.target.files && e.target.files[0] ? e.target.files[0] : null
                                )
                            } ref={fileInputCover} errors={errors.avatar} />
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