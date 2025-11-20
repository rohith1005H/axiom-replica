'use client';

import { TableHead } from '@/components/ui/table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setSort } from '@/lib/redux/slices/tableSlice';
import { TokenData } from '@/types';

interface SortableHeaderProps {
    column: keyof TokenData;
    label: string;
    className?: string;
}

export const SortableHeader = ({ column, label, className }: SortableHeaderProps) => {
    const dispatch = useAppDispatch();
    const { activeColumn, sortDirection } = useAppSelector((state) => state.table);

    const isActive = activeColumn === column;

    return (
        <TableHead
            className={cn('cursor-pointer select-none hover:text-white transition-colors', className)}
            onClick={() => dispatch(setSort(column))}
        >
            <div className="flex items-center gap-2">
                {label}
                {isActive ? (
                    sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4 text-axiom-accent" />
                    ) : (
                        <ArrowDown className="h-4 w-4 text-axiom-accent" />
                    )
                ) : (
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground opacity-50" />
                )}
            </div>
        </TableHead>
    );
};
