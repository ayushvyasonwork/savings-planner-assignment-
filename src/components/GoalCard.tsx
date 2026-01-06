"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { Goal, Contribution } from '@/store/slices/goalsSlice';
import { useAppSelector } from '@/store/hooks';
import { formatCurrency, convertCurrency, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GoalCardProps {
    goal: Goal;
    onAddContribution: (goalId: string) => void;
}

export function GoalCard({ goal, onAddContribution }: GoalCardProps) {
    const { rate } = useAppSelector((state) => state.fx);

    const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
    const isCompleted = percentage >= 100;

    // Secondary currency calculation
    const secondaryCurrency = goal.targetCurrency === 'USD' ? 'INR' : 'USD';
    const targetSecondary = convertCurrency(goal.targetAmount, goal.targetCurrency, secondaryCurrency, rate);
    const savedSecondary = convertCurrency(goal.currentAmount, goal.targetCurrency, secondaryCurrency, rate);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-xl p-6 relative group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">{goal.name}</h3>
                    <p className="text-3xl font-extrabold text-indigo-600 mt-1">
                        {formatCurrency(goal.targetAmount, goal.targetCurrency)}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                        ≈ {formatCurrency(targetSecondary, secondaryCurrency)}
                    </p>
                </div>
                <div className={cn(
                    "px-2 py-1 rounded text-xs font-bold",
                    isCompleted ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                )}>
                    {percentage.toFixed(0)}%
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{formatCurrency(goal.currentAmount, goal.targetCurrency)} saved</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-out",
                            isCompleted ? "bg-green-500" : "bg-indigo-600"
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {/* Remaining info */}
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>{goal.contributions.length} contributions</span>
                    <span>{formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount), goal.targetCurrency)} remaining</span>
                </div>
            </div>

            <button
                onClick={() => onAddContribution(goal.id)}
                className="w-full mt-2 py-2.5 border border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
                <Plus className="w-4 h-4" />
                Add Contribution
            </button>
        </motion.div>
    );
}
