'use client';

import { TokenData, TokenStatus } from '@/types';
import { TokenCard } from '@/components/molecules/TokenCard';
import { Zap, TrendingUp, CheckCircle } from 'lucide-react';

interface TokenColumnProps {
    status: TokenStatus;
    tokens: TokenData[];
}

const statusIcons: Record<TokenStatus, React.ReactNode> = {
    'New Pairs': <Zap className="w-4 h-4" />,
    'Final Stretch': <TrendingUp className="w-4 h-4" />,
    'Migrated': <CheckCircle className="w-4 h-4" />,
};

const statusColors: Record<TokenStatus, string> = {
    'New Pairs': 'text-blue-400',
    'Final Stretch': 'text-yellow-400',
    'Migrated': 'text-green-400',
};

export const TokenColumn = ({ status, tokens }: TokenColumnProps) => {
    return (
        <div className="flex-1 min-w-[320px] max-w-[420px]">
            {/* Column Header */}
            <div className="mb-4 flex items-center gap-2">
                <div className={`${statusColors[status]}`}>
                    {statusIcons[status]}
                </div>
                <h2 className="text-lg font-semibold text-white">{status}</h2>
                <span className="text-sm text-axiom-text-muted">({tokens.length})</span>
            </div>

            {/* Cards */}
            <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
                {tokens.length === 0 ? (
                    <div className="text-center py-8 text-axiom-text-muted">
                        No tokens in this category
                    </div>
                ) : (
                    tokens.map((token) => (
                        <TokenCard key={token.id} token={token} />
                    ))
                )}
            </div>
        </div>
    );
};
