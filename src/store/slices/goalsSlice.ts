import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Currency = 'USD' | 'INR';

export interface Contribution {
    id: string;
    amount: number;
    date: string;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    targetCurrency: Currency;
    currentAmount: number;
    contributions: Contribution[];
}

interface GoalsState {
    items: Goal[];
}

const initialState: GoalsState = {
    items: [],
};

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        addGoal: (state, action: PayloadAction<Goal>) => {
            state.items.push(action.payload);
        },
        addContribution: (state, action: PayloadAction<{ goalId: string; contribution: Contribution }>) => {
            const goal = state.items.find((g) => g.id === action.payload.goalId);
            if (goal) {
                goal.contributions.push(action.payload.contribution);
                goal.currentAmount += action.payload.contribution.amount;
            }
        },
    },
});

export const { addGoal, addContribution } = goalsSlice.actions;

export default goalsSlice.reducer;
