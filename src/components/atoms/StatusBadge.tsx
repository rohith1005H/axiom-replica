import { TokenStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: TokenStatus;
    className?: string;
}

const statusStyles: Record<TokenStatus, string> = {
    'New Pairs': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'Final Stretch': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'Migrated': 'bg-axiom-success/20 text-axiom-success border-axiom-success/50',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    return (
        <span
            className={cn(
                'px-2 py-1 rounded-full text-xs font-medium border',
                statusStyles[status],
                className
            )}
        >
            {status}
        </span>
    );
};
