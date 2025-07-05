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
import { FormEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';
import FormSelect from '@/components/form-select';
import { propsForm, propsPage, propsPageCreate } from '@/types/roles';

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


export default function Create({ page_settings }: propsPageCreate) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<propsForm>>({
        name: '',
        guard_name: '',
        _method: page_settings.method,
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

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

    const options = [
        { value: 'web', label: 'WEB' },
        { value: 'api', label: 'API' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Category" />
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
                        <form onSubmit={onHandleSubmit} className="space-y-6">
                            <FormInput
                                id="name"
                                title="Name"
                                type="text"
                                placeholder="Name peran..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                            <FormSelect
                                id="guard"
                                title="Guard"
                                dataValue={options}
                                value={data.guard_name}
                                onValueChange={(value) => setData('guard_name', value)}
                                placeholder="Pilih guard"
                                errors={errors.guard_name}
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
