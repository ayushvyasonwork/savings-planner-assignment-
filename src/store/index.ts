import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './slices/goalsSlice';
import fxReducer from './slices/fxSlice';

export const store = configureStore({
    reducer: {
        goals: goalsReducer,
        fx: fxReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
