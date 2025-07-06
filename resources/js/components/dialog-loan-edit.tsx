import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactSelect from './react-select';
import { Button } from './ui/button';
import { PlaceholderPattern } from './ui/placeholder-pattern';
import LoadingSkeleton from './loading-skeleton';

interface propsPage {
    open: boolean;
    onOpenChange: (e: boolean) => void;
    id?: number;
}

type PropsForm = {
    book: string;
    user: string;
    _method: string;
};

export default function DialogLoanEdit({ open, onOpenChange, id }: propsPage) {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);


    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        book: '',
        user: '',
        _method: 'PUT',
    });

    useEffect(() => {

        async function fetchData() {
            setLoading(true)
            try {
                const response = await axios.get(route('admin.loans.edit', [id]));
                // console.log(response.data.page_data);

                const data = response.data.page_data;
                setUsers(data.users);
                setBooks(data.books);
                setData('user', data.loan.user_id);
                setData('book', data.loan.book_id);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [id]);



    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('admin.loans.update', [id]), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash.type == 'success') {
                    closeDialog();
                    toast.success(flash.message);
                }
                if (flash.type == 'error') toast.error(flash.message);
            },
        });
    };

    const closeDialog = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[768px]">
                <DialogHeader>
                    <DialogTitle>Tambah Peminjaman</DialogTitle>
                    <DialogDescription>Buat peminjaman buku baru disini, klik simpan setelah selesai.</DialogDescription>
                    <hr />
                </DialogHeader>
                {loading ? <LoadingSkeleton loop={2} /> : (

                    <form onSubmit={onHandleSubmit}>
                        <div className="grid gap-3 py-4">
                            <ReactSelect
                                id="user"
                                title="Pengguna"
                                dataValue={users}
                                value={data.user?.toString()}
                                onValueChange={(value) => setData('user', value)}
                                placeholder="Pilih pengguna"
                                errors={errors.user}
                            />
                            <ReactSelect
                                id="book"
                                title="Buku"
                                dataValue={books}
                                value={data.book?.toString()}
                                onValueChange={(value) => setData('book', value)}
                                placeholder="Pilih Buku"
                                errors={errors.book}
                            />
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="outline" size={'lg'} onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="default" size={'lg'} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </div>
                    </form>
                )}

            </DialogContent>
        </Dialog>
    );
}
