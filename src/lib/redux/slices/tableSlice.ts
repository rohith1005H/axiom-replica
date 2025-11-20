import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableState, TokenData, TokenStatus } from '@/types';

const initialState: TableState = {
    activeColumn: 'marketCap', // Default sort
    sortDirection: 'desc',
    filterStatus: 'All',
    searchQuery: '',
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<keyof TokenData>) => {
            if (state.activeColumn === action.payload) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.activeColumn = action.payload;
                state.sortDirection = 'desc'; // Default to desc for new column
            }
        },
        setFilterStatus: (state, action: PayloadAction<TokenStatus | 'All'>) => {
            state.filterStatus = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setSort, setFilterStatus, setSearchQuery } = tableSlice.actions;
export default tableSlice.reducer;
