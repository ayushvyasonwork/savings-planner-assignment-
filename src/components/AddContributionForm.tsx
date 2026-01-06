"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addContribution } from '@/store/slices/goalsSlice';

export function AddContributionForm({ goalId, onClose }: { goalId: string; onClose: () => void }) {
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contribAmount = parseFloat(amount);

        if (isNaN(contribAmount) || contribAmount <= 0) {
            setError('Please enter a valid positive amount');
            return;
        }

        dispatch(addContribution({
            goalId,
            contribution: {
                id: Date.now().toString(),
                amount: contribAmount,
                date: date
            }
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800"
                    autoFocus
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800"
                />
            </div>

            <button
                type="submit"
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors active:scale-95"
            >
                Add Contribution
            </button>
        </form>
    );
}
