import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle } from 'lucide-react';

import FormInput from '@/components/form-input';
import FormInputFile from '@/components/form-input-file';
import FormTextarea from '@/components/form-textarea';
import { flashMessage } from '@/lib/utils';
import { propsPageEdit, publishersForm } from '@/types/publisher';
import { FormEventHandler, useRef } from 'react';
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
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Penerbit" />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild>
                        <Link href={route('admin.publishers.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6">
                            <FormInput
                                id="name"
                                title="Name"
                                type="text"
                                placeholder="Name publisher..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                            <FormInput
                                id="email"
                                title="Email"
                                type="text"
                                placeholder="Email..."
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                errors={errors.email}
                            />
                            <FormInput
                                id="phone"
                                title="No Handphone"
                                type="number"
                                placeholder="No handphone..."
                                value={data.phone.replace(/\D/g, '')}
                                onChange={(e) => setData('phone', e.target.value)}
                                errors={errors.phone}
                            />
                            <FormTextarea
                                id="address"
                                title="Address"
                                placeholder="Alamat... (opsional)"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                errors={errors.address}
                            />
                            <FormInputFile
                                id="logo"
                                title="Logo"
                                onChange={(e) => setData('logo', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                ref={fileInputCover}
                                errors={errors.name}
                            />

                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant={'outline'} size={'lg'} onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
