import React, { useState } from 'react';
import { Button } from '../components/Button';

interface EditPreferencesScreenProps {
  onSave: (preferences: DetailedPreferences) => void;
  onBack: () => void;
}

interface PreferenceCategory {
  myValue: string;
  acceptableValues: string[];
}

export interface DetailedPreferences {
  diet?: PreferenceCategory;
  religion?: PreferenceCategory;
  pets?: PreferenceCategory;
  smoking?: PreferenceCategory;
  drinking?: PreferenceCategory;
  sleepSchedule?: PreferenceCategory;
}

const PREFERENCE_OPTIONS = {
  diet: ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal', 'Kosher'],
  religion: ['No preference', 'Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other'],
  pets: ['No pets', 'Have pets', 'Allergic to pets', 'Open to pets'],
  smoking: ['Non-smoker', 'Social smoker', 'Regular smoker', 'No preference'],
  drinking: ['Non-drinker', 'Social drinker', 'Regular drinker', 'No preference'],
  sleepSchedule: ['Early bird (before 10pm)', 'Night owl (after 12am)', 'Flexible', 'No preference'],
};

export const EditPreferencesScreen: React.FC<EditPreferencesScreenProps> = ({ onSave, onBack }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    diet: false,
    religion: false,
    pets: false,
    smoking: false,
    drinking: false,
    sleepSchedule: false,
  });

  const [myValues, setMyValues] = useState({
    diet: '',
    religion: '',
    pets: '',
    smoking: '',
    drinking: '',
    sleepSchedule: '',
  });

  const [acceptableValues, setAcceptableValues] = useState<{[key: string]: string[]}>({
    diet: [],
    religion: [],
    pets: [],
    smoking: [],
    drinking: [],
    sleepSchedule: [],
  });

  const toggleCategory = (category: keyof typeof enabledCategories) => {
    setEnabledCategories({
      ...enabledCategories,
      [category]: !enabledCategories[category],
    });
  };

  const handleMyValueChange = (category: string, value: string) => {
    setMyValues({
      ...myValues,
      [category]: value,
    });
  };

  const handleAcceptableValueToggle = (category: string, value: string) => {
    const current = acceptableValues[category] || [];
    if (current.includes(value)) {
      setAcceptableValues({
        ...acceptableValues,
        [category]: current.filter(v => v !== value),
      });
    } else {
      setAcceptableValues({
        ...acceptableValues,
        [category]: [...current, value],
      });
    }
  };

  const handleSave = () => {
    const preferences: DetailedPreferences = {};
    
    Object.keys(enabledCategories).forEach((key) => {
      if (enabledCategories[key as keyof typeof enabledCategories] && myValues[key as keyof typeof myValues]) {
        preferences[key as keyof DetailedPreferences] = {
          myValue: myValues[key as keyof typeof myValues],
          acceptableValues: acceptableValues[key] || [],
        };
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
    };
    return icons[key] || '📋';
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          What are your preferences?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Select preferred attributes for you. We allow you to select preferred attributes for your roomie in these categories as well
        </p>

        {/* Preference Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.keys(enabledCategories).map((category) => {
            const key = category as keyof typeof enabledCategories;
            const isEnabled = enabledCategories[key];
            
            return (
              <div key={category} className="border-2 border-gray-200 rounded-2xl p-4">
                {/* Toggle Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(category)}</span>
                    <span className="font-semibold">{getCategoryLabel(category)}</span>
                  </div>
                  <button
                    onClick={() => toggleCategory(key)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${
                      isEnabled ? 'bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Dropdowns when enabled */}
                {isEnabled && (
                  <div className="space-y-3 mt-4">
                    {/* My Value */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">What I identify/practice</label>
                      <select
                        value={myValues[key]}
                        onChange={(e) => handleMyValueChange(category, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                      >
                        <option value="">Select...</option>
                        {PREFERENCE_OPTIONS[key as keyof typeof PREFERENCE_OPTIONS].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Acceptable Values */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Roommates I'm okay with</label>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {PREFERENCE_OPTIONS[key as keyof typeof PREFERENCE_OPTIONS].map(option => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(acceptableValues[category] || []).includes(option)}
                              onChange={() => handleAcceptableValueToggle(category, option)}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Continue finding roomies
          </button>
          <Button onClick={handleSave} className="flex-1">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};