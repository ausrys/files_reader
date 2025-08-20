import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./slices/filesSlice";
// Redux store
export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
