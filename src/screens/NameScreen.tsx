import React, { useState } from 'react';
import { Button } from '../components/Button';

interface NameScreenProps {
  onNext: (firstName: string, lastName: string, useAlias: boolean, alias?: string) => void;
  onBack: () => void;
}

export const NameScreen: React.FC<NameScreenProps> = ({ onNext, onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [useAlias, setUseAlias] = useState(false);
  const [alias, setAlias] = useState('');

  const handleNext = () => {
    if (firstName.trim() && lastName.trim()) {
      // If alias is enabled, require alias field
      if (useAlias && !alias.trim()) {
        return;
      }
      onNext(firstName.trim(), lastName.trim(), useAlias, alias.trim());
    }
  };

  const isValid = firstName.trim() && lastName.trim() && (!useAlias || alias.trim());

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-8 text-black">
          What's your name?
        </h1>

        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
            />
          </div>

          <input
            type="text"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
            placeholder="Preferred name (optional)"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
          />
        </div>

        {/* Alias toggle */}
        <div className="p-4 bg-gray-50 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium text-black">Display alias for safety</p>
              <p className="text-sm text-gray-600">Show a nickname instead of your real name</p>
            </div>
            <button
              onClick={() => setUseAlias(!useAlias)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                useAlias ? 'bg-black' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  useAlias ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Alias input - only shown when toggle is on */}
          {useAlias && (
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Enter your alias"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
            />
          )}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
