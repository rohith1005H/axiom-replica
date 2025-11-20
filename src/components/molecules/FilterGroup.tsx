'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setFilterStatus, setSearchQuery } from '@/lib/redux/slices/tableSlice';
import { TokenStatus } from '@/types';

export const FilterGroup = () => {
    const dispatch = useAppDispatch();
    const { filterStatus, searchQuery } = useAppSelector((state) => state.table);

    const statuses: (TokenStatus | 'All')[] = ['All', 'New Pairs', 'Final Stretch', 'Migrated'];

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                {statuses.map((status) => (
                    <Button
                        key={status}
                        variant={filterStatus === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => dispatch(setFilterStatus(status))}
                        className="whitespace-nowrap"
                    >
                        {status}
                    </Button>
                ))}
            </div>
            <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="max-w-xs"
            />
        </div>
    );
};
