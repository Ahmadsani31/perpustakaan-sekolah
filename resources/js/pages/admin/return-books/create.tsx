import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CreditCardIcon, LoaderCircle } from 'lucide-react';

import FormDatePicker from '@/components/form-date-picker';
import FormSelect from '@/components/form-select';
import FormTextarea from '@/components/form-textarea';
import { flashMessage } from '@/lib/utils';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pengembalian',
        href: '#',
    },
];

interface propsPage {
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    };
    loan: {
        loan_code: string;
        loan_date: string;
        due_date: string;
        return_date: string;
        notes: string;
        user: {
            name: string;
            username: string;
            email: string;
            phone: string;
        };
        book: {
            title: string;
            author: string;
            publisher: {
                name: string;
            };
        };
    };
    date: {
        return_date: string;
    };
    conditions: [];
}

type PropsForm = {
    loan_date: string;
    loan_code: string;
    due_date: string;
    return_date: string;
    notes: string;
    condition: string;
    _method: string;
};

export default function Create({ page_settings, loan, date, conditions }: propsPage) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        loan_date: loan.loan_date ?? '',
        loan_code: loan.loan_code ?? '',
        due_date: loan.due_date ?? '',
        return_date: date.return_date ?? '',
        notes: loan.notes ?? '',
        condition: '',
        _method: page_settings.method,
    });

    console.log(errors);

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('====================================');
        console.log(page_settings.action);
        console.log('====================================');
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
            <Head title="Proses Pengembalian Buku" />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={CreditCardIcon} />
                    <Button variant={'warning'} size={'lg'} asChild>
                        <Link href={route('admin.loans.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <div className="grid grid-cols-2 gap-3 px-5">
                        <div>
                            <p className="font-bold">Data Peminjam</p>
                            <CardContent className="rounded-md border py-3">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.user.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.user.username}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.user.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Handphone</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.user.phone}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </div>
                        <div>
                            <p className="font-bold">Data Buku</p>
                            <CardContent className="rounded-md border py-3">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Kode Buku</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.loan_code}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Judul</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.book.title}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Penulis</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.book.author}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Penerbit</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{loan.book.publisher.name}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </div>
                    </div>
                    <div className="px-5">
                        <p className="font-bold">Data Peminjam</p>
                        <CardContent className="rounded-md border py-3">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Kode Peminjam</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{loan.loan_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tanggal Peminjam</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{loan.loan_date}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Batas Pengembalian</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{loan.due_date}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tanggal Pengembalian</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{loan.return_date}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </div>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6">
                            <FormDatePicker
                                id="return_date"
                                title="Tanggal Pengembalian"
                                value={data.return_date}
                                placeholder="Pilih tanggal pengembalian"
                                onSelect={(val) => setData('return_date', val)}
                            />
                            <FormSelect
                                id="language"
                                title="Kondisi Buku"
                                dataValue={conditions}
                                value={data.condition}
                                onValueChange={(value) => setData('condition', value)}
                                placeholder="Pilih kondisi buku"
                                errors={errors.condition}
                            />

                            <FormTextarea
                                id="synopsis"
                                title="Catatan"
                                placeholder="Masukan Catatan..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                errors={errors.notes}
                            />
                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant={'outline'} size={'lg'} onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Kembalikan
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
