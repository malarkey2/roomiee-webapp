import React, { useState } from 'react';
import { Button } from '../components/Button';

interface GenderScreenProps {
  onNext: (gender: string) => void;
  onBack: () => void;
}

export const GenderScreen: React.FC<GenderScreenProps> = ({ onNext, onBack }) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const genders = [
    { value: 'woman', label: 'Woman', emoji: '👩' },
    { value: 'man', label: 'Man', emoji: '👨' },
    { value: 'non-binary', label: 'Non-binary', emoji: '🧑' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say', emoji: '🤐' },
  ];

  const handleNext = () => {
    if (selectedGender) {
      onNext(selectedGender);
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
          What's your gender?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Tell us what you most closely identify with. Our platform welcomes all gender identities
        </p>

        <div className="space-y-3 mb-8">
          {genders.map((gender) => (
            <button
              key={gender.value}
              onClick={() => setSelectedGender(gender.value)}
              className={`w-full px-6 py-5 border-2 rounded-xl transition-all flex items-center justify-between ${
                selectedGender === gender.value
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{gender.emoji}</span>
                <span className="font-medium">{gender.label}</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                selectedGender === gender.value
                  ? 'border-black bg-black'
                  : 'border-gray-300'
              }`}>
                {selectedGender === gender.value && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!selectedGender}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
