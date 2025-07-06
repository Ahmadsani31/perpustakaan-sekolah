import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { itemColumns } from '@/types/rute-access';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import { Button } from './ui/button';

export const ColumnsRuteAccess: ColumnDef<itemColumns>[] = [
    {
        accessorKey: 'route_name',
        header: 'Rute',
    },
    {
        accessorKey: 'role.name',
        header: 'Peran',
    },
    {
        accessorKey: 'permission.name',
        header: 'Izin',
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
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={'default'} size={'sm'} asChild>
                                <Link href={route('admin.route-accesses.edit', row.original.id)}>
                                    <PencilIcon />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>

                    <ColumnsDatatableActionDelete url={route('admin.route-accesses.destroy', [row.original])} />
                </div>
            );
        },
    },
];
