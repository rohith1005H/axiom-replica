import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/tableSlice';
import socketReducer from './slices/socketSlice';
import favoritesReducer from './slices/favoritesSlice';
import walletReducer from './slices/walletSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            table: tableReducer,
            socket: socketReducer,
            favorites: favoritesReducer,
            wallet: walletReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
