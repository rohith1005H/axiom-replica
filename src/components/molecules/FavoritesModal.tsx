'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/lib/redux/hooks';
import { useLiveTableData } from '@/hooks/useLiveTableData';
import { TokenCard } from '@/components/molecules/TokenCard';

interface FavoritesModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const FavoritesModal = ({ open, onOpenChange }: FavoritesModalProps) => {
    const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
    const { data } = useLiveTableData();

    const favoriteTokens = data.filter(token => favoriteIds.includes(token.id));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-axiom-card border-axiom-border text-white max-w-2xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Your Favorites</DialogTitle>
                    <DialogDescription className="text-axiom-text-muted">
                        Tokens you&apos;ve bookmarked for quick access
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 mt-4 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                    {favoriteTokens.length === 0 ? (
                        <div className="text-center py-8 text-axiom-text-muted">
                            <p>No favorites yet</p>
                            <p className="text-sm mt-2">Click the star icon on any token card to add it here</p>
                        </div>
                    ) : (
                        favoriteTokens.map((token) => (
                            <TokenCard key={token.id} token={token} />
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
