import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    favoriteIds: string[]; // Array of token IDs
}

const initialState: FavoritesState = {
    favoriteIds: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const index = state.favoriteIds.indexOf(id);
            if (index >= 0) {
                state.favoriteIds.splice(index, 1);
            } else {
                state.favoriteIds.push(id);
            }
        },
        clearFavorites: (state) => {
            state.favoriteIds = [];
        },
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
