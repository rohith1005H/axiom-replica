'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/lib/redux/hooks';
import { useLiveTableData } from '@/hooks/useLiveTableData';
import { TokenCard } from '@/components/molecules/TokenCard';
import { TrendingUp, TrendingDown, Wallet as WalletIcon } from 'lucide-react';

interface ProfileModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ProfileModal = ({ open, onOpenChange }: ProfileModalProps) => {
    const { balance, orders } = useAppSelector((state) => state.wallet);
    const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
    const { data } = useLiveTableData();

    const favoriteTokens = data.filter(token => favoriteIds.includes(token.id));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-axiom-card border-axiom-border text-white max-w-3xl max-h-[85vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <WalletIcon className="w-5 h-5" />
                        Your Profile
                    </DialogTitle>
                </DialogHeader>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-axiom-primary/20 to-axiom-success/20 border border-axiom-primary/50 rounded-lg p-4 mt-4">
                    <div className="text-sm text-axiom-text-muted mb-1">Wallet Balance</div>
                    <div className="text-3xl font-bold text-white">{balance.toFixed(2)} SOL</div>
                    <div className="text-xs text-axiom-text-muted mt-1">≈ ${(balance * 100).toFixed(2)} USD</div>
                </div>

                <Tabs defaultValue="orders" className="mt-4">
                    <TabsList className="grid w-full grid-cols-3 bg-axiom-bg">
                        <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites ({favoriteIds.length})</TabsTrigger>
                        <TabsTrigger value="stats">Stats</TabsTrigger>
                    </TabsList>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="space-y-3 mt-4 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                        {orders.length === 0 ? (
                            <div className="text-center py-8 text-axiom-text-muted">
                                <p>No orders yet</p>
                                <p className="text-sm mt-2">Start trading to see your order history</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-axiom-bg border border-axiom-border rounded-lg p-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                {order.type === 'buy' ? (
                                                    <TrendingUp className="w-4 h-4 text-axiom-success" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4 text-axiom-danger" />
                                                )}
                                                <span className="font-semibold text-white">
                                                    {order.type.toUpperCase()} {order.tokenSymbol}
                                                </span>
                                            </div>
                                            <div className="text-xs text-axiom-text-muted space-y-1">
                                                <div>Amount: {order.tokenAmount.toFixed(2)} {order.tokenSymbol}</div>
                                                <div>Price: ${order.price.toFixed(6)}</div>
                                                <div>Total: {order.amount.toFixed(2)} SOL</div>
                                                <div>{new Date(order.timestamp).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-medium ${order.type === 'buy' ? 'text-axiom-success' : 'text-axiom-danger'}`}>
                                            {order.type === 'buy' ? '-' : '+'}{order.amount.toFixed(2)} SOL
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </TabsContent>

                    {/* Favorites Tab */}
                    <TabsContent value="favorites" className="space-y-3 mt-4 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                        {favoriteTokens.length === 0 ? (
                            <div className="text-center py-8 text-axiom-text-muted">
                                <p>No favorites yet</p>
                                <p className="text-sm mt-2">Click the star icon on any token card</p>
                            </div>
                        ) : (
                            favoriteTokens.map((token) => (
                                <TokenCard key={token.id} token={token} />
                            ))
                        )}
                    </TabsContent>

                    {/* Stats Tab */}
                    <TabsContent value="stats" className="space-y-3 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-axiom-bg border border-axiom-border rounded-lg p-4">
                                <div className="text-sm text-axiom-text-muted mb-1">Total Orders</div>
                                <div className="text-2xl font-bold text-white">{orders.length}</div>
                            </div>
                            <div className="bg-axiom-bg border border-axiom-border rounded-lg p-4">
                                <div className="text-sm text-axiom-text-muted mb-1">Favorites</div>
                                <div className="text-2xl font-bold text-white">{favoriteIds.length}</div>
                            </div>
                            <div className="bg-axiom-bg border border-axiom-border rounded-lg p-4">
                                <div className="text-sm text-axiom-text-muted mb-1">Buy Orders</div>
                                <div className="text-2xl font-bold text-axiom-success">
                                    {orders.filter(o => o.type === 'buy').length}
                                </div>
                            </div>
                            <div className="bg-axiom-bg border border-axiom-border rounded-lg p-4">
                                <div className="text-sm text-axiom-text-muted mb-1">Sell Orders</div>
                                <div className="text-2xl font-bold text-axiom-danger">
                                    {orders.filter(o => o.type === 'sell').length}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
