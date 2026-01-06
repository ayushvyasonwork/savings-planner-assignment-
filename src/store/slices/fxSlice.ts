import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface FxState {
    rate: number; // 1 USD = X INR
    lastUpdated: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FxState = {
    rate: 85, // Default/fallback rate
    lastUpdated: null,
    status: 'idle',
    error: null,
};

// Mock API call or Real API call
export const fetchExchangeRate = createAsyncThunk('fx/fetchExchangeRate', async () => {
    // Try to fetch from API
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.rates.INR; // Assuming we want USD to INR
    } catch (error) {
        // If API fails, return a mock rate or rethrow
        // For demo purposes, we might want to return a slightly different mock rate to show "refresh" working
        // But let's basic error handling
        console.error("Failed to fetch rates", error);
        // Return a random fluctuation around 85 for demo if API fails?
        // Or just fallback to 85.
        // Let's retry with a public free API: open.er-api.com
        const backup = await fetch('https://open.er-api.com/v6/latest/USD');
        const backupData = await backup.json();
        return backupData.rates.INR;
    }
});

export const fxSlice = createSlice({
    name: 'fx',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExchangeRate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rate = action.payload;
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchExchangeRate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch rates';
            });
    },
});

export default fxSlice.reducer;
