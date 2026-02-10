import React, { useState } from 'react';
import { Button } from '../components/Button';

interface RentAndOccupantsScreenProps {
  onNext: (rent: number, currentOccupants: number, totalRooms: number) => void;
  onBack: () => void;
}

export const RentAndOccupantsScreen: React.FC<RentAndOccupantsScreenProps> = ({ onNext, onBack }) => {
  const [rent, setRent] = useState(1000);
  const [currentOccupants, setCurrentOccupants] = useState(1);
  const [totalRooms, setTotalRooms] = useState(2);

  const handleContinue = () => {
    if (rent <= 0) {
      alert('Please enter a valid rent amount');
      return;
    }

    if (currentOccupants < 0 || totalRooms <= 0) {
      alert('Please enter valid occupancy numbers');
      return;
    }

    if (currentOccupants >= totalRooms) {
      alert('Current occupants must be less than total rooms');
      return;
    }

    onNext(rent, currentOccupants, totalRooms);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US');
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
          Tell us about your place
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Help potential roommates understand your housing situation
        </p>

        <div className="space-y-6 mb-8">
          {/* Rent Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">Monthly rent per person</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(parseInt(e.target.value) || 0)}
                min="0"
                step="50"
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-lg"
                placeholder="1000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 This is what the new roommate would pay per month
            </p>
          </div>

          {/* Total Rooms */}
          <div>
            <label className="block text-sm font-medium mb-2">Total bedrooms in the house</label>
            <input
              type="number"
              value={totalRooms}
              onChange={(e) => setTotalRooms(parseInt(e.target.value) || 0)}
              min="1"
              max="10"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-lg"
              placeholder="3"
            />
          </div>

          {/* Current Occupants */}
          <div>
            <label className="block text-sm font-medium mb-2">Current occupants (including you)</label>
            <input
              type="number"
              value={currentOccupants}
              onChange={(e) => setCurrentOccupants(parseInt(e.target.value) || 0)}
              min="0"
              max={totalRooms - 1}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-lg"
              placeholder="2"
            />
            <p className="text-xs text-gray-500 mt-2">
              Available rooms: {totalRooms - currentOccupants}
            </p>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Summary</p>
            <p className="text-lg font-semibold">
              ${formatCurrency(rent)}/month · {currentOccupants}/{totalRooms} occupied · {totalRooms - currentOccupants} room{totalRooms - currentOccupants !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
