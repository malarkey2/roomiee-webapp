import React, { useState } from 'react';
import { Button } from '../components/Button';

interface DesiredHouseTypeScreenProps {
  onNext: (houseTypes: string[]) => void;
  onBack: () => void;
}

export const DesiredHouseTypeScreen: React.FC<DesiredHouseTypeScreenProps> = ({ onNext, onBack }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const houseTypes = [
    { value: 'apartment', label: 'Apartment', emoji: '🏢' },
    { value: 'house', label: 'House', emoji: '🏠' },
    { value: 'townhouse', label: 'Townhouse', emoji: '🏘️' },
    { value: 'condo', label: 'Condo', emoji: '🏙️' },
    { value: 'studio', label: 'Studio', emoji: '🚪' },
  ];

  const toggleType = (value: string) => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(selectedTypes.filter(t => t !== value));
    } else {
      setSelectedTypes([...selectedTypes, value]);
    }
  };

  const handleNext = () => {
    if (selectedTypes.length > 0) {
      onNext(selectedTypes);
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
          What's your desired house type?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Select all that you wish to reside in
        </p>

        <div className="space-y-3 mb-8">
          {houseTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => toggleType(type.value)}
              className={`w-full px-6 py-5 border-2 rounded-xl transition-all flex items-center gap-4 ${
                selectedTypes.includes(type.value)
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{type.emoji}</span>
              </div>
              <span className="font-medium text-left flex-1">{type.label}</span>
              <div className={`w-5 h-5 rounded border-2 transition-all ${
                selectedTypes.includes(type.value)
                  ? 'border-black bg-black'
                  : 'border-gray-300'
              }`}>
                {selectedTypes.includes(type.value) && (
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button 
          onClick={handleNext}
          disabled={selectedTypes.length === 0}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
