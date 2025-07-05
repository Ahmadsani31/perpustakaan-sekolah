import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { flashMessage } from '@/lib/utils';
import { Link, router, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { LoaderCircle, LockKeyhole, PencilIcon, TrashIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import FormInput from './form-input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';

type itemUserIndex = {
    id: number;
    name: string;
    email: string;
    address: string;
    avatar: string;
    gender: string;
    date_of_birth: string;
    created_at: string;
};

export const ColumnsUser: ColumnDef<itemUserIndex>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'username',
        header: 'Username',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'No Handphone',
    },
    {
        accessorKey: 'avatar',
        header: 'Avatar',
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.avatar} />
                <AvatarFallback>{row.original.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: 'gender',
        header: 'Jenis Kelamin',
    },
    {
        accessorKey: 'date_of_birth',
        header: 'Tanggal Lahir',
    },
    {
        accessorKey: 'address',
        header: 'Alamat',
    },
    {
        accessorKey: 'created_at',
        header: 'Joined At',
        cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center"> Aksi </span>,
        cell: ({ row }) => {
            const [dialogOpen, setDialogOpen] = useState(false);

            const { data, setData, post, reset, errors, processing } = useForm<Required<any>>({
                password: '',
                password_confirmation: '',
                _method: 'PUT',
            });

            // console.log(errors);

            const handleResetPassword: FormEventHandler = (e) => {
                e.preventDefault();
                // console.log(data);

                post(route('admin.users.update-password', [row.original]), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (success) => {
                        console.log(success);

                        const flash = flashMessage(success);

                        if (flash.type == 'success') toast.success(flash.message);
                        if (flash.type == 'error') toast.error(flash.message);
                    },
                    onFinish: (visit) => {
                        console.log('finis');
                    },
                });
            };

            return (
                <div className="flex items-center gap-x-1">
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild className="cursor-pointer">
                            <Button variant={'primary'} size={'sm'}>
                                <LockKeyhole />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Update Password Pengguna</AlertDialogTitle>
                                <AlertDialogDescription>Silahkan update password pengguna, memasukan password baru.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <FormInput
                                    id="password"
                                    title="Password"
                                    type="password"
                                    placeholder="Masukan password..."
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    errors={errors.password}
                                />
                                <FormInput
                                    id="password_confirmation"
                                    title="Konfirmasi password"
                                    type="password"
                                    placeholder="Konfirmasi password..."
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    errors={errors.password_confirmation}
                                />
                                <div className="flex justify-end gap-x-2">
                                    <Button variant={'outline'} type="button" onClick={() => setDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('admin.users.edit', row.original)}>
                            <PencilIcon />
                        </Link>
                    </Button>
                    <ColumnsDatatableActionDelete url={route('admin.users.destroy', [row.original])} />
                </div>
            );
        },
    },
];
