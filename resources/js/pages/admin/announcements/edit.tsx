import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle } from 'lucide-react';

import FormInput from '@/components/form-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { propsEdit, propsEditForm } from '@/types/announcement';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Edit Pengumuman',
        href: '#',
    },
];

export default function Edit({ announcement, page_settings }: propsEdit) {
    const { data, setData, post, reset, errors, processing } = useForm<Required<propsEditForm>>({
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
                // const flash = flashMessage(success);
                // if (flash.type == 'success') toast.success(flash.message);
                // if (flash.type == 'error') toast.error(flash.message);
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
                        <Link href={route('admin.announcements.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6">
                            <FormInput
                                id="message"
                                title="Pesan"
                                type="text"
                                placeholder="Isi Pesan..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                errors={errors.message}
                            />
                            <FormInput
                                id="url"
                                title="URL"
                                type="text"
                                placeholder="Isi url..."
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                errors={errors.url}
                            />
                            <div className="flex items-center gap-3">
                                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={() => setData('is_active', !data.is_active)} />
                                <Label htmlFor="is_active">Apakah Aktif</Label>
                            </div>
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
