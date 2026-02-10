import React, { useState } from 'react';
import { Button } from '../components/Button';

interface EditPreferencesScreenProps {
  onSave: (preferences: DetailedPreferences) => void;
  onBack: () => void;
}

export interface DetailedPreferences {
  diet?: string;
  religion?: string;
  pets?: string;
  smoking?: string;
  drinking?: string;
  sleepSchedule?: string;
  cleanliness?: string;
}

const PREFERENCE_OPTIONS = {
  diet: ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal', 'Kosher'],
  religion: ['No preference', 'Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other'],
  pets: ['No pets', 'Have pets', 'Allergic to pets', 'Open to pets'],
  smoking: ['Non-smoker', 'Social smoker', 'Regular smoker', 'No preference'],
  drinking: ['Non-drinker', 'Social drinker', 'Regular drinker', 'No preference'],
  sleepSchedule: ['Early bird (before 10pm)', 'Night owl (after 12am)', 'Flexible', 'No preference'],
  cleanliness: ['Clean / Requires clean', 'Clean / Doesn\'t mind untidy', 'Untidy'],
};

export const EditPreferencesScreen: React.FC<EditPreferencesScreenProps> = ({ onSave, onBack }) => {
  const [values, setValues] = useState({
    diet: '',
    religion: '',
    pets: '',
    smoking: '',
    drinking: '',
    sleepSchedule: '',
    cleanliness: '',
  });

  const handleValueChange = (category: string, value: string) => {
    setValues({
      ...values,
      [category]: value,
    });
  };

  const handleSave = () => {
    const preferences: DetailedPreferences = {};
    
    Object.keys(values).forEach((key) => {
      if (values[key as keyof typeof values]) {
        preferences[key as keyof DetailedPreferences] = values[key as keyof typeof values];
      }
    });

    onSave(preferences);
  };

  const getCategoryLabel = (key: string) => {
    const labels: {[key: string]: string} = {
      diet: 'Diet',
      religion: 'Religion',
      pets: 'Pets',
      smoking: 'Smoking',
      drinking: 'Drinking',
      sleepSchedule: 'Sleep Schedule',
      cleanliness: 'Cleanliness',
    };
    return labels[key] || key;
  };

  const getCategoryIcon = (key: string) => {
    const icons: {[key: string]: string} = {
      diet: '🌱',
      religion: '🙏',
      pets: '🐕',
      smoking: '🚭',
      drinking: '🍺',
      sleepSchedule: '🌙',
      cleanliness: '✨',
    };
    return icons[key] || '📋';
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="p-6 flex-shrink-0">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-black transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold mb-2 text-black">
            Edit Your Lifestyle Preferences
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Update your lifestyle preferences to find better matches
          </p>

          {/* Preference Cards Grid */}
          <div className="space-y-4 mb-8">
            {Object.keys(values).map((category) => {
              const key = category as keyof typeof values;
              
              return (
                <div key={category} className="border-2 border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{getCategoryIcon(category)}</span>
                    <span className="font-semibold">{getCategoryLabel(category)}</span>
                  </div>

                  <select
                    value={values[key]}
                    onChange={(e) => handleValueChange(category, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none"
                  >
                    <option value="">Select...</option>
                    {PREFERENCE_OPTIONS[key as keyof typeof PREFERENCE_OPTIONS].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Footer Buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <Button onClick={handleSave} className="flex-1">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
