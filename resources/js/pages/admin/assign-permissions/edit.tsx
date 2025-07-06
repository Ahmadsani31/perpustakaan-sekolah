import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle } from 'lucide-react';

import FormInput from '@/components/form-input';
import { FormSelectMulti } from '@/components/form-select-multi';
import { Label } from '@/components/ui/label';
import { flashMessage } from '@/lib/utils';
import { propsFormEdit, propsPageEdit } from '@/types/assign-permission';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Peran',
        href: '/admin/roles',
    },
    {
        title: 'Terapkan Izin',
        href: '#',
    },
];

export default function Edit({ page_settings, role, permissions }: propsPageEdit) {
    const [selectPermissions, setSelectPermissions] = useState<any>(Array.from(new Set(role.permissions.map((permission) => Number(permission.id)))));

    const { data, setData, post, reset, errors, processing } = useForm<Required<propsFormEdit>>({
        name: role.name ?? '',
        permissions: selectPermissions,
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
                const flash = flashMessage(success);
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);
            },
        });
    };

    const handlePermissionChange = (selected: any) => {
        console.log(selected);

        setSelectPermissions(selected);
        setData('permissions', selected);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Terapkan Izin" />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild>
                        <Link href={route('admin.roles.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6" encType="multipart/form-data">
                            <FormInput
                                id="name"
                                title="Name"
                                type="text"
                                placeholder="Name peran..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                                disabled={true}
                            />
                            <div className="grid w-full items-center">
                                <Label htmlFor="izin" className="mb-2">
                                    Izin
                                </Label>
                                <FormSelectMulti
                                    options={permissions}
                                    onValueChange={handlePermissionChange}
                                    defaultValue={selectPermissions}
                                    placeholder="pilih Izin"
                                    variant={'inverted'}
                                />
                                {errors.permissions && <p className="m-0 text-sm text-red-500">{errors.permissions}</p>}
                            </div>
                            <div className="flex justify-end gap-x-2">
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Terapkan
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
