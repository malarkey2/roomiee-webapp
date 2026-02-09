import React from 'react';
import { ProgressBar } from '../components/ProgressBar';

interface HouseTypeScreenProps {
  onSelect: (houseType: string) => void;
  onBack: () => void;
}

export const HouseTypeScreen: React.FC<HouseTypeScreenProps> = ({ onSelect, onBack }) => {
  const houseTypes = [
    { value: 'apartment', label: 'Apartment', emoji: '🏢' },
    { value: 'house', label: 'House', emoji: '🏠' },
    { value: 'townhouse', label: 'Townhouse', emoji: '🏘️' },
    { value: 'condo', label: 'Condo', emoji: '🏙️' },
    { value: 'studio', label: 'Studio', emoji: '🚪' },
  ];

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>

      <ProgressBar currentStep={4} totalSteps={8} />
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-8 text-black">
          What's your house type?
        </h1>
        
        <div className="space-y-3">
          {houseTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onSelect(type.value)}
              className="w-full bg-gray-100 rounded-xl p-5 hover:bg-gray-200 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{type.emoji}</span>
              </div>
              <span className="text-lg font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
