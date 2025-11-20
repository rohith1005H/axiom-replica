'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenData } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addOrder } from '@/lib/redux/slices/walletSlice';

interface BuySellModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    token: TokenData | null;
}

export const BuySellModal = ({ open, onOpenChange, token }: BuySellModalProps) => {
    const dispatch = useAppDispatch();
    const balance = useAppSelector((state) => state.wallet.balance);
    const [solAmount, setSolAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');

    if (!token) return null;

    const estimatedTokens = solAmount ? (parseFloat(solAmount) / token.price).toFixed(2) : '0';
    const estimatedSol = sellAmount ? (parseFloat(sellAmount) * token.price).toFixed(4) : '0.00';

    const handleBuy = () => {
        const amount = parseFloat(solAmount);
        if (amount > 0 && amount <= balance) {
            dispatch(addOrder({
                id: `${Date.now()}-${Math.random()}`,
                tokenId: token.id,
                tokenName: token.name,
                tokenSymbol: token.symbol,
                type: 'buy',
                amount,
                tokenAmount: parseFloat(estimatedTokens),
                price: token.price,
                timestamp: Date.now(),
            }));
            setSolAmount('');
            onOpenChange(false);
        }
    };

    const handleSell = () => {
        const amount = parseFloat(sellAmount);
        if (amount > 0) {
            dispatch(addOrder({
                id: `${Date.now()}-${Math.random()}`,
                tokenId: token.id,
                tokenName: token.name,
                tokenSymbol: token.symbol,
                type: 'sell',
                amount: parseFloat(estimatedSol),
                tokenAmount: amount,
                price: token.price,
                timestamp: Date.now(),
            }));
            setSellAmount('');
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-axiom-card border-axiom-border text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <img src={token.image} alt={token.name} className="w-6 h-6 rounded" />
                        {token.name} ({token.symbol})
                    </DialogTitle>
                    <DialogDescription className="text-axiom-text-muted">
                        Current Price: ${token.price.toFixed(6)} • Balance: {balance.toFixed(2)} SOL
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="buy" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-axiom-bg">
                        <TabsTrigger value="buy" className="data-[state=active]:bg-axiom-success/20 data-[state=active]:text-axiom-success">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Buy
                        </TabsTrigger>
                        <TabsTrigger value="sell" className="data-[state=active]:bg-axiom-danger/20 data-[state=active]:text-axiom-danger">
                            <TrendingDown className="w-4 h-4 mr-2" />
                            Sell
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm text-axiom-text-muted mb-2 block">You Pay (SOL)</label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={solAmount}
                                onChange={(e) => setSolAmount(e.target.value)}
                                className="bg-axiom-bg border-axiom-border"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-axiom-text-muted mb-2 block">You Receive ({token.symbol})</label>
                            <Input
                                type="text"
                                value={estimatedTokens}
                                readOnly
                                className="bg-axiom-bg border-axiom-border text-axiom-text-muted"
                            />
                        </div>

                        {/* Quick Amounts */}
                        <div className="flex gap-2">
                            {['0.1', '0.5', '1', '5'].map((amt) => (
                                <Button
                                    key={amt}
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 bg-axiom-bg border-axiom-border hover:bg-axiom-border"
                                    onClick={() => setSolAmount(amt)}
                                >
                                    {amt} SOL
                                </Button>
                            ))}
                        </div>

                        <Button
                            className="w-full bg-axiom-success hover:bg-axiom-success/80"
                            disabled={!solAmount || parseFloat(solAmount) <= 0 || parseFloat(solAmount) > balance}
                            onClick={handleBuy}
                        >
                            Buy {token.symbol}
                        </Button>
                        {parseFloat(solAmount) > balance && (
                            <p className="text-xs text-axiom-danger">Insufficient balance</p>
                        )}
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm text-axiom-text-muted mb-2 block">You Sell ({token.symbol})</label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={sellAmount}
                                onChange={(e) => setSellAmount(e.target.value)}
                                className="bg-axiom-bg border-axiom-border"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-axiom-text-muted mb-2 block">You Receive (SOL)</label>
                            <Input
                                type="text"
                                value={estimatedSol}
                                readOnly
                                className="bg-axiom-bg border-axiom-border text-axiom-text-muted"
                            />
                        </div>

                        <Button
                            className="w-full bg-axiom-danger hover:bg-axiom-danger/80"
                            disabled={!sellAmount || parseFloat(sellAmount) <= 0}
                            onClick={handleSell}
                        >
                            Sell {token.symbol}
                        </Button>
                    </TabsContent>
                </Tabs>

                <div className="mt-4 p-3 bg-axiom-bg rounded text-xs text-axiom-text-muted space-y-1">
                    <div className="flex justify-between">
                        <span>Market Cap:</span>
                        <span>${token.marketCap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Liquidity:</span>
                        <span>${token.liquidity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Slippage:</span>
                        <span>1%</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
