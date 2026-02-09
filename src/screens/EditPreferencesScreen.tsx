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

interface AllergyPreference {
  allergens: string[];
  restrictions: { [allergen: string]: string };
}

export interface DetailedPreferences {
  diet?: PreferenceCategory;
  religion?: PreferenceCategory;
  pets?: PreferenceCategory;
  smoking?: PreferenceCategory;
  drinking?: PreferenceCategory;
  sleepSchedule?: PreferenceCategory;
  allergies?: AllergyPreference;
}

const PREFERENCE_OPTIONS = {
  diet: ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal', 'Kosher'],
  religion: ['No preference', 'Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other'],
  pets: ['No pets', 'Have pets', 'Allergic to pets', 'Open to pets'],
  smoking: ['Non-smoker', 'Social smoker', 'Regular smoker', 'No preference'],
  drinking: ['Non-drinker', 'Social drinker', 'Regular drinker', 'No preference'],
  sleepSchedule: ['Early bird (before 10pm)', 'Night owl (after 12am)', 'Flexible', 'No preference'],
};

const COMMON_ALLERGENS = [
  'Peanuts',
  'Tree nuts',
  'Milk/Dairy',
  'Eggs',
  'Soy',
  'Wheat/Gluten',
  'Fish',
  'Shellfish',
  'Sesame',
  'Other',
];

const ALLERGEN_RESTRICTIONS = [
  'Not allowed in the house at all',
  'Allowed in their personal space only',
  'Allowed in shared spaces with mindfulness',
];

export const EditPreferencesScreen: React.FC<EditPreferencesScreenProps> = ({ onSave, onBack }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    diet: false,
    religion: false,
    pets: false,
    smoking: false,
    drinking: false,
    sleepSchedule: false,
    allergies: false,
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

  // Allergies state
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [allergenRestrictions, setAllergenRestrictions] = useState<{[allergen: string]: string}>({});

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

  const handleAllergenToggle = (allergen: string) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter(a => a !== allergen));
      const newRestrictions = { ...allergenRestrictions };
      delete newRestrictions[allergen];
      setAllergenRestrictions(newRestrictions);
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  const handleRestrictionChange = (allergen: string, restriction: string) => {
    setAllergenRestrictions({
      ...allergenRestrictions,
      [allergen]: restriction,
    });
  };

  const handleSave = () => {
    const preferences: DetailedPreferences = {};
    
    Object.keys(enabledCategories).forEach((key) => {
      if (key === 'allergies') {
        if (enabledCategories.allergies && selectedAllergens.length > 0) {
          preferences.allergies = {
            allergens: selectedAllergens,
            restrictions: allergenRestrictions,
          };
        }
      } else if (enabledCategories[key as keyof typeof enabledCategories] && myValues[key as keyof typeof myValues]) {
        preferences[key as keyof DetailedPreferences] = {
          myValue: myValues[key as keyof typeof myValues],
          acceptableValues: acceptableValues[key] || [],
        } as any;
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
      allergies: 'Allergies',
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
      allergies: '⚠️',
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
              
              // Special handling for allergies
              if (category === 'allergies') {
                return (
                  <div key={category} className="border-2 border-gray-200 rounded-2xl p-4 md:col-span-2">
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

                    {/* Allergies Content */}
                    {isEnabled && (
                      <div className="space-y-4 mt-4">
                        {/* Select Allergens */}
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">What I'm allergic to</label>
                          <div className="grid grid-cols-2 gap-2">
                            {COMMON_ALLERGENS.map(allergen => (
                              <label key={allergen} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedAllergens.includes(allergen)}
                                  onChange={() => handleAllergenToggle(allergen)}
                                  className="w-4 h-4 rounded border-gray-300"
                                />
                                <span className="text-sm">{allergen}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Restrictions for each selected allergen */}
                        {selectedAllergens.length > 0 && (
                          <div>
                            <label className="block text-xs text-gray-600 mb-2">What I need from my roommate</label>
                            <div className="space-y-3">
                              {selectedAllergens.map(allergen => (
                                <div key={allergen} className="bg-gray-50 rounded-xl p-3">
                                  <p className="text-sm font-medium mb-2">{allergen}</p>
                                  <select
                                    value={allergenRestrictions[allergen] || ''}
                                    onChange={(e) => handleRestrictionChange(allergen, e.target.value)}
                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                                  >
                                    <option value="">Select restriction...</option>
                                    {ALLERGEN_RESTRICTIONS.map(restriction => (
                                      <option key={restriction} value={restriction}>{restriction}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular categories
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
                          value={myValues[key as keyof typeof myValues]}
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
        </div>
      </div>

      {/* Fixed Footer Buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white">
        <div className="max-w-2xl mx-auto flex gap-3">
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