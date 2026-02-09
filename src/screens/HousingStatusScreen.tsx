import React from 'react';
import { ProgressBar } from '../components/ProgressBar';

interface HousingStatusScreenProps {
  onSelect: (status: 'have-place' | 'looking') => void;
  onBack: () => void;
}

export const HousingStatusScreen: React.FC<HousingStatusScreenProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>

      <ProgressBar currentStep={2} totalSteps={8} />
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-8 text-black text-center">
          What's your housing status?
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelect('have-place')}
            className="w-full bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-all"
          >
            <h3 className="text-lg font-medium mb-1">I have a place</h3>
            <p className="text-gray-600 text-sm">Looking for someone to move in</p>
          </button>

          <button
            onClick={() => onSelect('looking')}
            className="w-full bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-all"
          >
            <h3 className="text-lg font-medium mb-1">I'm looking for a place</h3>
            <p className="text-gray-600 text-sm">Find roommates to search together or join someone housed</p>
          </button>
        </div>
      </div>
    </div>
  );
};
