import { configureStore } from '@reduxjs/toolkit';
import filesSlice from './slices/fileSlice';
// Create store
export const store = configureStore({
    reducer: {
        files: filesSlice,
    },
});

// Export types for later
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
