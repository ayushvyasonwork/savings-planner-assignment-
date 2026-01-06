"use client";

import React, { useEffect } from 'react';
import { RefreshCw, TrendingUp, Wallet, Target } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchExchangeRate } from '@/store/slices/fxSlice';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export function DashboardHeader() {
    const dispatch = useAppDispatch();
    const { items: goals } = useAppSelector((state) => state.goals);
    const { rate, lastUpdated, status } = useAppSelector((state) => state.fx);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExchangeRate());
        }
    }, [status, dispatch]);

    const handleRefresh = () => {
        dispatch(fetchExchangeRate());
    };

    // Calculate generic totals in INR (base reference)
    // Or display totals in base currency user prefers? The image shows "Total Targets ₹17,82,823 $22,500"
    // It shows both if mixed? Or maybe primary is INR.
    // Let's assume primary display is INR for valid demo.

    const totalTargetINR = goals.reduce((acc, goal) => {
        return acc + convertCurrency(goal.targetAmount, goal.targetCurrency, 'INR', rate);
    }, 0);

    const totalSavedINR = goals.reduce((acc, goal) => {
        return acc + convertCurrency(goal.currentAmount, goal.targetCurrency, 'INR', rate);
    }, 0);

    const overallProgress = totalTargetINR > 0 ? (totalSavedINR / totalTargetINR) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-200" />
                        <span className="font-semibold text-indigo-100">Financial Overview</span>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={status === 'loading'}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
                        {status === 'loading' ? 'Updating...' : 'Refresh Rates'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Total Targets */}
                    <div>
                        <div className="flex items-center gap-2 text-indigo-200 mb-1">
                            <Target className="w-4 h-4" />
                            <span className="text-sm">Total Targets</span>
                        </div>
                        <div className="text-3xl font-bold font-mono">
                            {formatCurrency(totalTargetINR, 'INR')}
                        </div>
                        <div className="text-sm text-indigo-300 mt-1">
                            {/* Optional: Show USD equivalent */}
                            ≈ {formatCurrency(convertCurrency(totalTargetINR, 'INR', 'USD', rate), 'USD')}
                        </div>
                    </div>

                    {/* Total Saved */}
                    <div>
                        <div className="flex items-center gap-2 text-indigo-200 mb-1">
                            <Wallet className="w-4 h-4" />
                            <span className="text-sm">Total Saved</span>
                        </div>
                        <div className="text-3xl font-bold font-mono">
                            {formatCurrency(totalSavedINR, 'INR')}
                        </div>
                        <div className="text-sm text-indigo-300 mt-1">
                            ≈ {formatCurrency(convertCurrency(totalSavedINR, 'INR', 'USD', rate), 'USD')}
                        </div>
                    </div>

                    {/* Overall Progress */}
                    <div>
                        <div className="flex items-center gap-2 text-indigo-200 mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">Overall Progress</span>
                        </div>
                        <div className="text-3xl font-bold">
                            {overallProgress.toFixed(1)}%
                        </div>
                        <div className="text-sm text-indigo-300 mt-1">
                            Total goals completion
                        </div>
                        {/* Mini Progress Bar */}
                        <div className="w-full h-1.5 bg-black/20 rounded-full mt-3 overflow-hidden">
                            <div
                                className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min(overallProgress, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between text-xs text-indigo-200 border-t border-white/10 pt-4">
                    <span>Exchange Rate: 1 USD = {rate.toFixed(2)} INR</span>
                    <span>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}</span>
                </div>
            </div>
        </motion.div>
    );
}
