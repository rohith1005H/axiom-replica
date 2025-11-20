'use client';

import { useLiveTableData } from '@/hooks/useLiveTableData';
import { TokenColumn } from '@/components/organisms/TokenColumn';
import { TokenStatus } from '@/types';

export const PulseBoard = () => {
    const { data, isLoading } = useLiveTableData();

    if (isLoading) {
        return (
            <div className="flex gap-4 justify-center items-center min-h-[400px]">
                <div className="text-axiom-text-muted">Loading tokens...</div>
            </div>
        );
    }

    // Group tokens by status
    const tokensByStatus: Record<TokenStatus, typeof data> = {
        'New Pairs': data.filter(t => t.status === 'New Pairs'),
        'Final Stretch': data.filter(t => t.status === 'Final Stretch'),
        'Migrated': data.filter(t => t.status === 'Migrated'),
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            <TokenColumn status="New Pairs" tokens={tokensByStatus['New Pairs']} />
            <TokenColumn status="Final Stretch" tokens={tokensByStatus['Final Stretch']} />
            <TokenColumn status="Migrated" tokens={tokensByStatus['Migrated']} />
        </div>
    );
};
