import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, LoaderCircle } from 'lucide-react';

import FormInput from '@/components/form-input';
import FormInputFile from '@/components/form-input-file';
import FormSelect from '@/components/form-select';
import FormTextarea from '@/components/form-textarea';
import ReactSelect from '@/components/react-select';
import ReactSelectTahun from '@/components/react-select-tahun';
import { flashMessage } from '@/lib/utils';
import { propsEditForm, propsEdit } from '@/types/book';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Edit Buku',
        href: '#',
    },
];

export default function Edit({ page_settings, books, page_data }: propsEdit) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<propsEditForm>>({
        id: books.id ?? '',
        title: books.title ?? '',
        author: books.author ?? '',
        publication_year: books.publication_year ?? '',
        isbn: books.isbn ?? '',
        language: books.language ?? '',
        synopsis: books.synopsis ?? '',
        number_of_pages: books.number_of_pages,
        cover: null,
        price: books.price ?? null,
        category_id: books.category_id ?? null,
        publisher_id: books.publisher_id ?? null,
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
            <Head title="Edit Buku" />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CassetteTape} />
                    <Button variant={'warning'} size={'lg'} asChild>
                        <Link href={route('admin.books.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6" encType="multipart/form-data">
                            <FormInput
                                id="title"
                                title="Judul"
                                type="text"
                                placeholder="Masukan judul..."
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                errors={errors.title}
                            />
                            <FormInput
                                id="author"
                                title="Penulis"
                                type="text"
                                placeholder="Penulis..."
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                errors={errors.author}
                            />
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <ReactSelectTahun
                                    id="publication_year"
                                    title="Tahun Terbit"
                                    value={data.publication_year?.toString()}
                                    onChange={(value) => setData('publication_year', value)}
                                    placeholder="Pilih Tahun Terbit"
                                    errors={errors.publication_year}
                                    required={true}
                                />
                                <FormInput
                                    id="isbn"
                                    title="ISBN (International Standard Book Number)"
                                    type="text"
                                    placeholder="Masukan ISBN..."
                                    value={data.isbn}
                                    onChange={(e) => setData('isbn', e.target.value)}
                                    errors={errors.isbn}
                                />
                            </div>
                            <FormSelect
                                id="language"
                                title="Bahasa"
                                dataValue={page_data.languages}
                                value={data.language}
                                onValueChange={(value) => setData('language', value)}
                                placeholder="Pilih Bahasa"
                            />
                            <FormTextarea
                                id="synopsis"
                                title="Sinosis"
                                placeholder="Masukan Sinosis..."
                                value={data.synopsis}
                                onChange={(e) => setData('synopsis', e.target.value)}
                                errors={errors.synopsis}
                            />
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <FormInput
                                    id="number_of_pages"
                                    title="Jumlah Halaman"
                                    type="number"
                                    placeholder="Jumlah halaman..."
                                    value={data.number_of_pages}
                                    onChange={(e) => setData('number_of_pages', e.target.value)}
                                    errors={errors.number_of_pages}
                                />
                                <FormInput
                                    id="price"
                                    title="Harga"
                                    type="number"
                                    placeholder="Masukan Harga..."
                                    value={data.price}
                                    onChange={(e) => setData('price', Number(e.target.value))}
                                    errors={errors.price}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <ReactSelect
                                    id="category"
                                    title="Kategory"
                                    dataValue={page_data.categories}
                                    value={data.category_id?.toString()}
                                    onValueChange={(value) => setData('category_id', value ? Number(value) : null)}
                                    placeholder="Pilih Category"
                                    errors={errors.category_id}
                                    required={true}
                                />
                                <ReactSelect
                                    id="publisher"
                                    title="Penerbit"
                                    dataValue={page_data.publishers}
                                    value={data.category_id?.toString()}
                                    onValueChange={(value) => setData('publisher_id', value ? Number(value) : null)}
                                    placeholder="Pilih Penerbit"
                                    errors={errors.publisher_id}
                                />
                            </div>
                            {/* <FormSelect id='publisher' title='Penerbit' dataValue={page_data.publishers} value={data.publisher?.toString()} onValueChange={(value) => setData('publisher', value ? Number(value) : null)} placeholder='Pilih Penerbit' /> */}
                            <FormInputFile
                                id="cover"
                                title="Cover"
                                onChange={(e) => setData('cover', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                ref={fileInputCover}
                                errors={errors.cover}
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
