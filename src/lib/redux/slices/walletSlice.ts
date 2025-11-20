import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    id: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    type: 'buy' | 'sell';
    amount: number; // SOL amount
    tokenAmount: number;
    price: number;
    timestamp: number;
}

interface WalletState {
    balance: number; // SOL balance
    orders: Order[];
}

const initialState: WalletState = {
    balance: 0,
    orders: [],
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        deposit: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // Add to beginning
            // Deduct from balance for buy orders
            if (action.payload.type === 'buy') {
                state.balance -= action.payload.amount;
            } else {
                state.balance += action.payload.amount;
            }
        },
    },
});

export const { deposit, addOrder } = walletSlice.actions;
export default walletSlice.reducer;
export type { Order };
