import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { RefreshCcw } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { columnAssignUser } from '@/types/assign-user';

export const ColumnsAssignUsers: ColumnDef<columnAssignUser>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'username',
        header: 'Username',
    },
    {
        accessorKey: 'roles',
        header: 'Peran',
        cell: ({ row }: any) =>
            row.original.roles.map((role: string, index: number) => (
                <span className="w-auto text-wrap" key={index}>
                    <Badge variant={'outline'} className="my-0.5 mr-2">
                        {role}
                    </Badge>
                </span>
            )),
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center"> Aksi </span>,
        cell: ({ row }: any) => {
            return (
                <div className="flex items-center justify-center gap-x-1">
                    <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('admin.assign-users.edit', row.original.id)}>
                            <RefreshCcw />
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];
