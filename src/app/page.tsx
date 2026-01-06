"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { GoalCard } from '@/components/GoalCard';
import { Modal } from '@/components/ui/Modal';
import { AddGoalForm } from '@/components/AddGoalForm';
import { AddContributionForm } from '@/components/AddContributionForm';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';

export default function Home() {
  const { items: goals } = useAppSelector((state) => state.goals);
  const [modalType, setModalType] = useState<'none' | 'addGoal' | 'addContribution'>('none');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const openAddGoal = () => setModalType('addGoal');
  const openAddContribution = (goalId: string) => {
    setSelectedGoalId(goalId);
    setModalType('addContribution');
  };
  const closeModal = () => {
    setModalType('none');
    setSelectedGoalId(null);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Syfe Savings Planner</h1>
          <p className="text-gray-500">Track your financial goals and build your future</p>
        </div>

        <DashboardHeader />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Goals</h2>
          <button
            onClick={openAddGoal}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 border-dashed"
          >
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-300 mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No goals yet</h3>
            <p className="text-gray-500 mb-4 max-w-sm mx-auto">Start your specialized savings journey by creating your first financial goal.</p>
            <button
              onClick={openAddGoal}
              className="px-4 py-2 text-indigo-600 font-medium hover:underline"
            >
              Create a Goal
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onAddContribution={openAddContribution}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={modalType === 'addGoal'}
          onClose={closeModal}
          title="Create New Goal"
        >
          <AddGoalForm onClose={closeModal} />
        </Modal>

        <Modal
          isOpen={modalType === 'addContribution'}
          onClose={closeModal}
          title="Add Contribution"
        >
          {selectedGoalId && (
            <AddContributionForm goalId={selectedGoalId} onClose={closeModal} />
          )}
        </Modal>

      </div>
    </main>
  );
}
