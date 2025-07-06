import { ArrowDownUpIcon } from 'lucide-react';
import React from 'react';
import { TableHead } from './ui/table';

interface propsPage {
    order: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function DatatableHead({ order, onClick, children }: propsPage) {
    if (order === true) {
        return (
            <TableHead>
                <div className="group flex cursor-pointer items-center justify-center gap-x-2" onClick={onClick}>
                    {children}
                    <span className="flex-none rounded text-muted-foreground">
                        <ArrowDownUpIcon size={14} />
                    </span>
                </div>
            </TableHead>
        );
    } else {
        return <TableHead>{children}</TableHead>;
    }
}

// <div className='flex items-center gap-x-2 justify-center group'>
//     {children}
//     <span className='flex-none rounded text-muted-foreground'>
//         <ArrowDownUpIcon className='w-4 h-4 opacity-0 hover:opacity-100 transition-opacity duration-200' />
//     </span>
// </div>
