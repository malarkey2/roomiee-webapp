import React, { useState } from 'react';
import { Button } from '../components/Button';

interface HousingStatusScreenProps {
  onSelect: (status: 'have-place' | 'looking') => void;
  onBack: () => void;
}

export const HousingStatusScreen: React.FC<HousingStatusScreenProps> = ({ onSelect, onBack }) => {
  const [selected, setSelected] = useState<'have-place' | 'looking' | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    onSelect(selected);
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
          Do you have a place or are you looking?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          This helps us match you with the right roommates
        </p>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setSelected('have-place')}
            className={`w-full p-6 border-2 rounded-2xl text-left transition-all ${
              selected === 'have-place'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏠</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">I have a place</h3>
                <p className={`text-sm ${selected === 'have-place' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Looking for someone to fill a room
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelected('looking')}
            className={`w-full p-6 border-2 rounded-2xl text-left transition-all ${
              selected === 'looking'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔍</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">I'm looking for a place</h3>
                <p className={`text-sm ${selected === 'looking' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Need to find a room or apartment
                </p>
              </div>
            </div>
          </button>
        </div>

        <Button 
          onClick={handleContinue} 
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
