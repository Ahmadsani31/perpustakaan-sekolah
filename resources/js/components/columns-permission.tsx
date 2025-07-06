import { itemColumns } from '@/types/roles';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import { Button } from './ui/button';

export const ColumnsPermission: ColumnDef<itemColumns>[] = [
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
                        <Link href={route('admin.permissions.edit', row.original.id)}>
                            <PencilIcon />
                        </Link>
                    </Button>
                    <ColumnsDatatableActionDelete url={route('admin.permissions.destroy', [row.original])} />
                </div>
            );
        },
    },
];
