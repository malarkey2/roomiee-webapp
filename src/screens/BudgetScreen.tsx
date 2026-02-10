import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface BudgetScreenProps {
  onNext: (minBudget: number, maxBudget: number) => void;
  onBack: () => void;
}

export const BudgetScreen: React.FC<BudgetScreenProps> = ({ onNext, onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [minBudget, setMinBudget] = useState(800);
  const [maxBudget, setMaxBudget] = useState(2000);
  const [loading, setLoading] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinBudget(value);
    if (value > maxBudget) {
      setMaxBudget(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMaxBudget(value);
    if (value < minBudget) {
      setMinBudget(value);
    }
  };

  const handleContinue = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        budget_min: minBudget,
        budget_max: maxBudget,
        onboarding_step: 'timeline',
      });

      await refreshProfile();
      onNext(minBudget, maxBudget);
    } catch (error) {
      console.error('Error saving budget:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
        disabled={loading}
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          What's your budget?
        </h1>
        <p className="text-gray-600 text-sm mb-2">
          Set your monthly rent range
        </p>
        <p className="text-gray-500 text-xs mb-8">
          💡 The median rent in the US is $1,400/month
        </p>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Minimum</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={minBudget}
                  onChange={handleMinChange}
                  min="0"
                  max="10000"
                  step="50"
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>
            <span className="mx-4 mt-8 text-gray-400">—</span>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Maximum</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={maxBudget}
                  onChange={handleMaxChange}
                  min="0"
                  max="10000"
                  step="50"
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Min: ${formatCurrency(minBudget)}</span>
                <span className="text-sm text-gray-600">Max: ${formatCurrency(maxBudget)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="50"
                value={minBudget}
                onChange={handleMinChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={loading}
              />
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="50"
              value={maxBudget}
              onChange={handleMaxChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={loading}
            />
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-2xl font-bold">
              ${formatCurrency(minBudget)} - ${formatCurrency(maxBudget)}
            </p>
            <p className="text-sm text-gray-600 mt-1">per month</p>
          </div>
        </div>

        <Button onClick={handleContinue} disabled={loading}>
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
