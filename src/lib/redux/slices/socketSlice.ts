import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
    isConnected: boolean;
    lastUpdateTimestamp: number | null;
}

const initialState: SocketState = {
    isConnected: false,
    lastUpdateTimestamp: null,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setLastUpdate: (state, action: PayloadAction<number>) => {
            state.lastUpdateTimestamp = action.payload;
        },
    },
});

export const { setConnected, setLastUpdate } = socketSlice.actions;
export default socketSlice.reducer;
