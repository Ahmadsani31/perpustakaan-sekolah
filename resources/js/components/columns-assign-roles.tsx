import { itemColumns } from '@/types/roles';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { RefreshCcw } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const ColumnsAssignRoles: ColumnDef<itemColumns>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'permissions',
        header: 'Permission',
        cell: ({ row }: any) =>
            row.original.permissions.map((permission: string, index: number) => (
                <span className="w-auto text-wrap" key={index}>
                    <Badge variant={'outline'} className="my-0.5 mr-2">
                        {permission}
                    </Badge>
                </span>
            )),
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
                        <Link href={route('admin.assign-permissions.edit', row.original.id)}>
                            <RefreshCcw />
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];
