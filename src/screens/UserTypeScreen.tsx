import React from 'react';
import { ProgressBar } from '../components/ProgressBar';

interface UserTypeScreenProps {
  onSelect: (type: 'college' | 'city') => void;
  onBack: () => void;
}

export const UserTypeScreen: React.FC<UserTypeScreenProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>

      <ProgressBar currentStep={1} totalSteps={8} />
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-8 text-black text-center">
          What roommates are you looking for?
        </h1>
        
        <div className="space-y-4">
          {/* College Student Card */}
          <button
            onClick={() => onSelect('college')}
            className="w-full bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-all"
          >
            <h3 className="text-lg font-medium mb-1">College Student</h3>
            <p className="text-gray-600 text-sm">Find roommates at your university</p>
          </button>

          {/* City/Town Card */}
          <button
            onClick={() => onSelect('city')}
            className="w-full bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-all"
          >
            <h3 className="text-lg font-medium mb-1">City / Town</h3>
            <p className="text-gray-600 text-sm">Find roommates in your area</p>
          </button>
        </div>
      </div>
    </div>
  );
};
