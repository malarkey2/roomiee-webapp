import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface BirthdayScreenProps {
  onNext: (birthday: string) => void;
  onBack: () => void;
}

export const BirthdayScreen: React.FC<BirthdayScreenProps> = ({ onNext, onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [birthday, setBirthday] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleContinue = async () => {
    if (!birthday) {
      alert('Please enter your birthday');
      return;
    }

    const age = calculateAge(birthday);
    
    if (age < 18) {
      alert('You must be at least 18 years old to use this app');
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        birthday,
        age,
        onboarding_step: 'gender',
      });

      await refreshProfile();
      onNext(birthday);
    } catch (error) {
      console.error('Error saving birthday:', error);
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
          When's your birthday?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          You must be 18 or older to use Roomie
        </p>

        <div className="mb-8">
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-lg"
            disabled={loading}
          />
          {birthday && (
            <p className="text-sm text-gray-600 mt-2">
              Age: {calculateAge(birthday)} years old
            </p>
          )}
        </div>

        <Button onClick={handleContinue} disabled={!birthday || loading}>
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
