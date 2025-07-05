import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { LoaderCircle, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { itemColumns } from '@/types/roles';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';

export const ColumnsRoles: ColumnDef<itemColumns>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'guard_name',
        header: 'Guard',
    },
    {
        accessorKey: 'created_at',
        header: 'Dibuat Pada',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center"> Aksi </span>,
        cell: ({ row }: any) => {
            return (
                <div className="flex items-center justify-center gap-x-1">
                    <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('admin.roles.edit', row.original.id)}>
                            <PencilIcon />
                        </Link>
                    </Button>
                    <ColumnsDatatableActionDelete url={route('admin.roles.destroy', [row.original])} />
                </div>
            );
        },
    },
];
