import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface TimelineScreenProps {
  onNext: (startDate: string, duration: { value: number; unit: string } | null) => void;
  onBack: () => void;
}

export const TimelineScreen: React.FC<TimelineScreenProps> = ({ onNext, onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [moveInDate, setMoveInDate] = useState('');
  const [durationType, setDurationType] = useState<'months' | 'years' | 'indefinite'>('months');
  const [durationValue, setDurationValue] = useState(12);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!moveInDate) {
      alert('Please select a move-in date');
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        move_in_date: moveInDate,
        lease_duration_value: durationType === 'indefinite' ? null : durationValue,
        lease_duration_unit: durationType,
        onboarding_step: 'contactPreference',
      });

      await refreshProfile();
      
      const duration = durationType === 'indefinite' 
        ? null 
        : { value: durationValue, unit: durationType };
      
      onNext(moveInDate, duration);
    } catch (error) {
      console.error('Error saving timeline:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
        disabled={loading}
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          When do you want to move in?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Let us know your timeline
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Move-in Date</label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">How long do you plan to stay?</label>
            
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setDurationType('months')}
                className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                  durationType === 'months'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={loading}
              >
                Months
              </button>
              <button
                onClick={() => setDurationType('years')}
                className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                  durationType === 'years'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={loading}
              >
                Years
              </button>
              <button
                onClick={() => setDurationType('indefinite')}
                className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                  durationType === 'indefinite'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={loading}
              >
                Indefinite
              </button>
            </div>

            {durationType !== 'indefinite' && (
              <input
                type="number"
                value={durationValue}
                onChange={(e) => setDurationValue(parseInt(e.target.value) || 1)}
                min="1"
                max={durationType === 'months' ? 60 : 10}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                placeholder={`Number of ${durationType}`}
                disabled={loading}
              />
            )}
          </div>
        </div>

        <Button onClick={handleContinue} disabled={!moveInDate || loading}>
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
