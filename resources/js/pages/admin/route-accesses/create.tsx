import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle } from 'lucide-react';

import { flashMessage } from '@/lib/utils';
import { propsFormCreate, propsPageCreate } from '@/types/rute-access';
import { FormEventHandler } from 'react';
import { toast } from 'react-toastify';

import ReactSelect from '@/components/react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tambah Rute',
        href: '#',
    },
];

export default function Create({ page_settings, roles, permissions, routes }: propsPageCreate) {
    const { data, setData, post, reset, errors, processing } = useForm<Required<propsFormCreate>>({
        route_name: '',
        role_id: '',
        permission_id: '',
        _method: page_settings.method,
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

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
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_settings.title} />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild>
                        <Link href={route('admin.route-accesses.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6">
                            <ReactSelect
                                id="rute"
                                title="Rute"
                                dataValue={routes.filter((route) => route.value != null)}
                                value={data.route_name}
                                onValueChange={(value) => setData('route_name', value)}
                                placeholder="Pilih rute"
                                errors={errors.route_name}
                                required={true}
                            />
                            <ReactSelect
                                id="peran"
                                title="Peran"
                                dataValue={roles}
                                value={data.role_id}
                                onValueChange={(value) => setData('role_id', value)}
                                placeholder="Pilih Peran"
                                errors={errors.role_id}
                            />
                            <ReactSelect
                                id="izin"
                                title="Izin"
                                dataValue={permissions}
                                value={data.permission_id}
                                onValueChange={(value) => setData('permission_id', value)}
                                placeholder="Pilih Izin"
                                errors={errors.permission_id}
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
