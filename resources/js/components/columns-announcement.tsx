import { columnAnnouncement } from '@/types/announcement';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import { Button } from './ui/button';

export const ColumnsAnnouncement: ColumnDef<columnAnnouncement>[] = [
    {
        accessorKey: 'message',
        header: 'Pesan',
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }: any) => <p>{row.original.url ? row.original.url : '-'}</p>,
    },
    {
        accessorKey: 'is_active',
        header: 'Aktif',
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
                        <Link href={route('admin.announcements.edit', row.original)}>
                            <PencilIcon />
                        </Link>
                    </Button>
                    <ColumnsDatatableActionDelete url={route('admin.announcements.destroy', [row.original.id])} />
                </div>
            );
        },
    },
];
