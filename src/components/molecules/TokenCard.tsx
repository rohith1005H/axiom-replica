'use client';

import { memo, useState } from 'react';
import { TokenData } from '@/types';
import { Twitter, MessageCircle, Globe, ExternalLink, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleFavorite } from '@/lib/redux/slices/favoritesSlice';
import { BuySellModal } from '@/components/molecules/BuySellModal';

interface TokenCardProps {
    token: TokenData;
}

const formatTimeSince = (timestamp: number): string => {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000); // seconds

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
};

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
};

export const TokenCard = memo(({ token }: TokenCardProps) => {
    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
    const isFavorite = favoriteIds.includes(token.id);
    const [buyModalOpen, setBuyModalOpen] = useState(false);
    const timeSince = formatTimeSince(token.createdAt);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleFavorite(token.id));
    };

    return (
        <>
            <div className="bg-axiom-card border border-axiom-border rounded-lg p-3 hover:border-axiom-accent/50 transition-colors relative group">
                {/* Favorite Star - Always Visible */}
                <button
                    onClick={handleToggleFavorite}
                    className="absolute top-2 right-2 p-1 rounded hover:bg-axiom-bg transition z-10"
                >
                    <Star
                        className={cn(
                            "w-4 h-4 transition",
                            isFavorite ? "fill-yellow-400 text-yellow-400" : "text-axiom-text-muted hover:text-yellow-400"
                        )}
                    />
                </button>

                <div className="flex gap-3">
                    {/* Left: Image & Info */}
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                            <img
                                src={token.image}
                                alt={token.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Center: Details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-semibold text-white truncate">{token.name}</h3>
                                    <span className="text-xs text-axiom-text-muted flex-shrink-0">{token.symbol}</span>
                                </div>

                                {/* Socials */}
                                <div className="flex items-center gap-2 mb-2">
                                    {token.socials.twitter && (
                                        <a href={token.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-axiom-text-muted hover:text-axiom-accent">
                                            <Twitter className="w-3 h-3" />
                                        </a>
                                    )}
                                    {token.socials.telegram && (
                                        <a href={token.socials.telegram} target="_blank" rel="noopener noreferrer" className="text-axiom-text-muted hover:text-axiom-accent">
                                            <MessageCircle className="w-3 h-3" />
                                        </a>
                                    )}
                                    {token.socials.website && (
                                        <a href={token.socials.website} target="_blank" rel="noopener noreferrer" className="text-axiom-text-muted hover:text-axiom-accent">
                                            <Globe className="w-3 h-3" />
                                        </a>
                                    )}
                                    <span className="text-xs text-axiom-text-muted ml-auto">{timeSince}</span>
                                </div>

                                {/* Metrics Row 1 */}
                                <div className="flex items-center gap-3 text-xs mb-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-axiom-text-muted">MC</span>
                                        <span className="text-white font-medium">{formatNumber(token.marketCap)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-axiom-text-muted">Vol</span>
                                        <span className="text-white font-medium">{formatNumber(token.volume)}</span>
                                    </div>
                                </div>

                                {/* Price Changes Row */}
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="text-axiom-text-muted">5m</span>
                                    <span className={cn(
                                        "font-medium",
                                        token.changes.m5 > 0 ? "text-axiom-success" : token.changes.m5 < 0 ? "text-axiom-danger" : "text-axiom-text-muted"
                                    )}>
                                        {token.changes.m5 > 0 ? '+' : ''}{token.changes.m5}%
                                    </span>

                                    <span className="text-axiom-text-muted">1h</span>
                                    <span className={cn(
                                        "font-medium",
                                        token.changes.h1 > 0 ? "text-axiom-success" : token.changes.h1 < 0 ? "text-axiom-danger" : "text-axiom-text-muted"
                                    )}>
                                        {token.changes.h1 > 0 ? '+' : ''}{token.changes.h1}%
                                    </span>

                                    <span className="text-axiom-text-muted">6h</span>
                                    <span className={cn(
                                        "font-medium",
                                        token.changes.h6 > 0 ? "text-axiom-success" : token.changes.h6 < 0 ? "text-axiom-danger" : "text-axiom-text-muted"
                                    )}>
                                        {token.changes.h6 > 0 ? '+' : ''}{token.changes.h6}%
                                    </span>
                                </div>
                            </div>

                            {/* Right: Buy Button */}
                            <Button
                                size="sm"
                                className="bg-axiom-primary hover:bg-axiom-primary/80 text-white ml-3 flex-shrink-0 h-auto py-1 px-3"
                                onClick={() => setBuyModalOpen(true)}
                            >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                0 SOL
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <BuySellModal
                open={buyModalOpen}
                onOpenChange={setBuyModalOpen}
                token={token}
            />
        </>
    );
});

TokenCard.displayName = 'TokenCard';
