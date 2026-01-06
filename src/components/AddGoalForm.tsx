"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addGoal, Currency } from '@/store/slices/goalsSlice';

export function AddGoalForm({ onClose }: { onClose: () => void }) {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState<Currency>('USD');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const targetAmount = parseFloat(amount);

        if (!name.trim()) {
            setError('Goal name is required');
            return;
        }
        if (isNaN(targetAmount) || targetAmount <= 0) {
            setError('Please enter a valid positive amount');
            return;
        }

        const id = crypto.randomUUID();
        dispatch(addGoal({
            id,
            name,
            targetAmount,
            targetCurrency: currency,
            currentAmount: 0,
            contributions: []
        }));

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Trip to Japan"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800" // Added text color
                    autoFocus
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="10000"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800 bg-white"
                    >
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors active:scale-95"
            >
                Create Goal
            </button>
        </form>
    );
}
