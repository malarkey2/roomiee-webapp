import React, { useState } from 'react';
import { Button } from '../components/Button';

interface BudgetScreenProps {
  onNext: (minBudget: number, maxBudget: number) => void;
  onBack: () => void;
}

export const BudgetScreen: React.FC<BudgetScreenProps> = ({ onNext, onBack }) => {
  const [minBudget, setMinBudget] = useState(800);
  const [maxBudget, setMaxBudget] = useState(2000);
  const MAX_BUDGET = 10000;

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

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          What's your budget?
        </h1>
        <p className="text-gray-600 text-sm mb-2">
          Tell us an approximate range you are looking for and we'll find you roommates on the same page
        </p>
        <p className="text-gray-500 text-xs mb-12">
          💡 The median rent in the US is $1,400/month
        </p>

        {/* Range display */}
        <div className="text-center mb-8">
          <p className="text-4xl font-bold text-black mb-2">
            ${minBudget.toLocaleString()} - ${maxBudget.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm">per month</p>
        </div>

        {/* Visual slider track */}
        <div className="mb-12 px-2">
          <div className="relative h-2 bg-gray-200 rounded-full">
            {/* Active range */}
            <div 
              className="absolute h-full bg-black rounded-full"
              style={{ 
                left: `${(minBudget / MAX_BUDGET) * 100}%`,
                width: `${((maxBudget - minBudget) / MAX_BUDGET) * 100}%`
              }}
            />
          </div>
          
          {/* Range inputs */}
          <div className="relative -mt-2">
            <input
              type="range"
              min="0"
              max={MAX_BUDGET}
              step="50"
              value={minBudget}
              onChange={handleMinChange}
              className="absolute w-full appearance-none bg-transparent pointer-events-none
                [&::-webkit-slider-thumb]:pointer-events-auto 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-6 
                [&::-webkit-slider-thumb]:h-6 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-black 
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-moz-range-thumb]:pointer-events-auto 
                [&::-moz-range-thumb]:appearance-none 
                [&::-moz-range-thumb]:w-6 
                [&::-moz-range-thumb]:h-6 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-black 
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white"
              style={{ zIndex: minBudget > maxBudget - 100 ? 5 : 3 }}
            />
            <input
              type="range"
              min="0"
              max={MAX_BUDGET}
              step="50"
              value={maxBudget}
              onChange={handleMaxChange}
              className="absolute w-full appearance-none bg-transparent pointer-events-none
                [&::-webkit-slider-thumb]:pointer-events-auto 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-6 
                [&::-webkit-slider-thumb]:h-6 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-black 
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-moz-range-thumb]:pointer-events-auto 
                [&::-moz-range-thumb]:appearance-none 
                [&::-moz-range-thumb]:w-6 
                [&::-moz-range-thumb]:h-6 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-black 
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white"
              style={{ zIndex: 4 }}
            />
          </div>
        </div>

        {/* Min/Max input boxes */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2">Minimum</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={minBudget}
                onChange={handleMinChange}
                min="0"
                max={MAX_BUDGET}
                step="50"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2">Maximum</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={maxBudget}
                onChange={handleMaxChange}
                min="0"
                max={MAX_BUDGET}
                step="50"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={() => onNext(minBudget, maxBudget)}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
