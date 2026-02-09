import React, { useState } from 'react';
import { Button } from './Button';

interface PreferencesModalProps {
  onComplete: (preferences: UserPreferences) => void;
  onSkip: () => void;
}

export interface UserPreferences {
  diet?: string;
  religion?: string;
  pets?: string;
  smoking?: string;
  drinking?: string;
  sleepSchedule?: string;
  cleanliness?: number;
  noiseTolerance?: number;
  guestFrequency?: number;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ onComplete, onSkip }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({});

  const dietOptions = ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal', 'Kosher'];
  const religionOptions = ['No preference', 'Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other'];
  const petOptions = ['No pets', 'Have pets', 'Allergic to pets', 'Open to pets'];
  const smokingOptions = ['Non-smoker', 'Social smoker', 'Regular smoker', 'No preference'];
  const drinkingOptions = ['Non-drinker', 'Social drinker', 'Regular drinker', 'No preference'];
  const sleepOptions = ['Early bird (before 10pm)', 'Night owl (after 12am)', 'Flexible', 'No preference'];

  const handleSubmit = () => {
    onComplete(preferences);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Want better matches?</h2>
          <p className="text-gray-600 mb-6">
            Tell us about your preferences to find more compatible roommates. To filter by these, you need to share your own values.
          </p>

          {/* Diet */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Diet</label>
            <select
              value={preferences.diet || ''}
              onChange={(e) => setPreferences({ ...preferences, diet: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              {dietOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Religion */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Religion</label>
            <select
              value={preferences.religion || ''}
              onChange={(e) => setPreferences({ ...preferences, religion: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              {religionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Pets */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pets</label>
            <select
              value={preferences.pets || ''}
              onChange={(e) => setPreferences({ ...preferences, pets: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              {petOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Smoking */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Smoking</label>
            <select
              value={preferences.smoking || ''}
              onChange={(e) => setPreferences({ ...preferences, smoking: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              {smokingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Drinking */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Drinking</label>
            <select
              value={preferences.drinking || ''}
              onChange={(e) => setPreferences({ ...preferences, drinking: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              {drinkingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Sleep Schedule */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Sleep Schedule</label>
            <select
              value={preferences.sleepSchedule || ''}
              onChange={(e) => setPreferences({ ...preferences, sleepSchedule: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              {sleepOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onSkip}
              className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Skip for now
            </button>
            <Button onClick={handleSubmit} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
