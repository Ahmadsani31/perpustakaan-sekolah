// components/TableLoader.tsx
import { TableBody, TableHead, TableRow } from './ui/table';

const TableLoader = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => {
    return (
        <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="animate-pulse">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <TableHead key={colIndex} className="px-4 py-2">
                            <div className="h-4 w-full rounded bg-gray-300"></div>
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableLoader;
