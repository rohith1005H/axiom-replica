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
import { useState } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { deposit } from '@/lib/redux/slices/walletSlice';

interface DepositModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const DepositModal = ({ open, onOpenChange }: DepositModalProps) => {
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState('');

    const handleDeposit = () => {
        const value = parseFloat(amount);
        if (value > 0) {
            dispatch(deposit(value));
            setAmount('');
            onOpenChange(false);
        }
    };

    const quickDeposit = (value: number) => {
        dispatch(deposit(value));
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-axiom-card border-axiom-border text-white">
                <DialogHeader>
                    <DialogTitle>Deposit SOL</DialogTitle>
                    <DialogDescription className="text-axiom-text-muted">
                        Add SOL to your wallet to start trading
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Quick Deposit Buttons */}
                    <div>
                        <label className="text-sm text-axiom-text-muted mb-2 block">Quick Deposit</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 5, 10, 50].map((amt) => (
                                <Button
                                    key={amt}
                                    onClick={() => quickDeposit(amt)}
                                    className="bg-axiom-primary hover:bg-axiom-primary/80"
                                >
                                    {amt} SOL
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                        <label className="text-sm text-axiom-text-muted mb-2 block">Custom Amount (SOL)</label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-axiom-bg border-axiom-border"
                            />
                            <Button
                                onClick={handleDeposit}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className="bg-axiom-primary hover:bg-axiom-primary/80"
                            >
                                Deposit
                            </Button>
                        </div>
                    </div>

                    <p className="text-xs text-axiom-text-muted text-center">
                        Deposits are instant • No fees
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
