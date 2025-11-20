'use client';

import { memo } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { TokenData } from '@/types';
import { PriceCell } from '@/components/atoms/PriceCell';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { ActionPopover } from '@/components/molecules/ActionPopover';
import { TokenHoverCard } from '@/components/molecules/TokenHoverCard';
import { cn } from '@/lib/utils';

interface TokenRowProps {
    token: TokenData;
}

export const TokenRow = memo(({ token }: TokenRowProps) => {
    return (
        <TableRow className="hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium">
                <TokenHoverCard token={token}>
                    <div className="flex flex-col">
                        <span className="text-white">{token.name}</span>
                        <span className="text-xs text-muted-foreground">{token.symbol}</span>
                    </div>
                </TokenHoverCard>
            </TableCell>
            <TableCell>
                <PriceCell value={token.price} />
            </TableCell>
            <TableCell>
                <span
                    className={cn(
                        token.changes.h1 >= 0 ? 'text-axiom-success' : 'text-axiom-danger'
                    )}
                >
                    {token.changes.h1 > 0 ? '+' : ''}
                    {token.changes.h1.toFixed(2)}%
                </span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                ${token.volume.toLocaleString()}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
                ${token.marketCap.toLocaleString()}
            </TableCell>
            <TableCell>
                <StatusBadge status={token.status} />
            </TableCell>
            <TableCell className="text-right">
                <ActionPopover />
            </TableCell>
        </TableRow>
    );
});

TokenRow.displayName = 'TokenRow';
