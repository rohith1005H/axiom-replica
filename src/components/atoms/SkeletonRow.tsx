import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export const SkeletonRow = ({ columns = 6 }: { columns?: number }) => {
    return (
        <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
                <TableCell key={i}>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
            ))}
        </TableRow>
    );
};
