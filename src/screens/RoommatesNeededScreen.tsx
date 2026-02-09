import React, { useState } from 'react';
import { Button } from '../components/Button';

interface RoommatesNeededScreenProps {
  onNext: (numberOfRoommates: number) => void;
  onBack: () => void;
}

export const RoommatesNeededScreen: React.FC<RoommatesNeededScreenProps> = ({ onNext, onBack }) => {
  const [numberOfRoommates, setNumberOfRoommates] = useState(1);

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
          How many roommates are you looking for?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Tell us how many people you need to fill your place
        </p>

        {/* Number selector */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => setNumberOfRoommates(Math.max(1, numberOfRoommates - 1))}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center text-2xl font-bold"
            disabled={numberOfRoommates <= 1}
          >
            −
          </button>
          
          <div className="text-center">
            <div className="text-6xl font-bold text-black mb-2">
              {numberOfRoommates}
            </div>
            <p className="text-gray-600 text-sm">
              {numberOfRoommates === 1 ? 'roommate' : 'roommates'}
            </p>
          </div>
          
          <button
            onClick={() => setNumberOfRoommates(Math.min(10, numberOfRoommates + 1))}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center text-2xl font-bold"
            disabled={numberOfRoommates >= 10}
          >
            +
          </button>
        </div>

        {/* Quick select buttons */}
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setNumberOfRoommates(num)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                numberOfRoommates === num
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <Button 
          onClick={() => onNext(numberOfRoommates)}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
