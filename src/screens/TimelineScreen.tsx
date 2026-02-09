import React, { useState } from 'react';
import { Button } from '../components/Button';

interface TimelineScreenProps {
  onNext: (startDate: string, duration: number | 'indefinite') => void;
  onBack: () => void;
}

export const TimelineScreen: React.FC<TimelineScreenProps> = ({ onNext, onBack }) => {
  const [startDate, setStartDate] = useState('');
  const [durationType, setDurationType] = useState<'months' | 'years' | 'indefinite'>('months');
  const [durationValue, setDurationValue] = useState(6);

  const handleNext = () => {
    if (startDate) {
      const duration = durationType === 'indefinite' ? 'indefinite' : durationValue;
      onNext(startDate, duration);
    }
  };

  const isValid = startDate;

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
          What's your timeline?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Tell us when you're looking to move in and for how long
        </p>

        {/* Start Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Move-in date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
          />
        </div>

        {/* Duration Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">How long do you need to stay?</label>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setDurationType('months')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                durationType === 'months'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Months
            </button>
            <button
              onClick={() => setDurationType('years')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                durationType === 'years'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Years
            </button>
            <button
              onClick={() => setDurationType('indefinite')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                durationType === 'indefinite'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Indefinite
            </button>
          </div>

          {/* Duration Value Input */}
          {durationType !== 'indefinite' && (
            <div>
              <input
                type="number"
                min="1"
                max={durationType === 'months' ? 36 : 10}
                value={durationValue}
                onChange={(e) => setDurationValue(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                placeholder={`Number of ${durationType}`}
              />
              <p className="text-sm text-gray-600 mt-2">
                {durationValue} {durationType}
              </p>
            </div>
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
