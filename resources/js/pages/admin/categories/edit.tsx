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
import { propsEdit, PropsEditForm } from '@/types/category';

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


export default function Edit({ page_settings, category }: propsEdit) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsEditForm>>({
        id: category.id ?? '',
        name: category.name ?? '',
        description: category.description ?? '',
        cover: null,
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
                // const flash = flashMessage(success);
                // if (flash.type == 'success') toast.success(flash.message);
                // if (flash.type == 'error') toast.error(flash.message);
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
            <Head title={page_settings.title} />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild>
                        <Link href={route('admin.categories.index')}>
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
                                placeholder="Name katagory..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                            <FormTextarea
                                id="description"
                                title="Description"
                                placeholder="Masukan description... (opsional)"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                errors={errors.description}
                            />
                            <FormInputFile
                                id="logo"
                                title="Logo"
                                onChange={(e) => setData('cover', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
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
