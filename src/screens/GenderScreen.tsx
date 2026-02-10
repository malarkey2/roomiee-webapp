import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface GenderScreenProps {
  onNext: (gender: string) => void;
  onBack: () => void;
}

export const GenderScreen: React.FC<GenderScreenProps> = ({ onNext, onBack }) => {
  const { user, profile, refreshProfile } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [customGender, setCustomGender] = useState('');
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { value: 'Man', emoji: '👨', label: 'Man' },
    { value: 'Woman', emoji: '👩', label: 'Woman' },
    { value: 'Non-binary', emoji: '🧑', label: 'Non-binary' },
    { value: 'Custom', emoji: '✏️', label: 'Prefer to self-describe' },
  ];

  const handleContinue = async () => {
    let genderValue = selected;
    
    if (selected === 'Custom') {
      if (!customGender.trim()) {
        alert('Please enter your gender');
        return;
      }
      genderValue = customGender.trim();
    }

    if (!genderValue || !user) return;

    setLoading(true);
    try {
      // Determine next step based on housing status
      const nextStep = profile?.housing_status === 'housed' 
        ? 'contactPreference' 
        : 'desiredHouseType';

      await updateProfile(user.id, {
        gender: genderValue,
        onboarding_step: nextStep,
      });

      await refreshProfile();
      onNext(genderValue);
    } catch (error) {
      console.error('Error saving gender:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          What's your gender?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          This helps us show you relevant matches
        </p>

        <div className="space-y-3 mb-8">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`w-full p-4 border-2 rounded-2xl text-left transition-all flex items-center gap-4 ${
                selected === option.value
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={loading}
            >
              {/* <span className="text-3xl">{option.emoji}</span> */}
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {selected === 'Custom' && (
          <div className="mb-8">
            <input
              type="text"
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value)}
              placeholder="Enter your gender"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>
        )}

        <Button 
          onClick={handleContinue} 
          disabled={!selected || (selected === 'Custom' && !customGender.trim()) || loading}
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
