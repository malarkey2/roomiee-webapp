import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface NameScreenProps {
  onNext: (firstName: string, lastName: string, useAlias: boolean, alias?: string) => void;
  onBack: () => void;
}

export const NameScreen: React.FC<NameScreenProps> = ({ onNext, onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [useAlias, setUseAlias] = useState(false);
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert('Please enter your first and last name');
      return;
    }

    if (useAlias && !alias.trim()) {
      alert('Please enter an alias or uncheck the option');
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        use_alias: useAlias,
        display_name: useAlias ? alias.trim() : `${firstName.trim()} ${lastName.trim()}`,
        onboarding_step: 'profilePhoto',
      });

      await refreshProfile();
      onNext(firstName, lastName, useAlias, alias);
    } catch (error) {
      console.error('Error saving name:', error);
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
          What's your name?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          This will be shown on your profile
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="useAlias"
              checked={useAlias}
              onChange={(e) => setUseAlias(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
              disabled={loading}
            />
            <label htmlFor="useAlias" className="text-sm">
              I prefer to use an alias/nickname
            </label>
          </div>

          {useAlias && (
            <div>
              <label className="block text-sm font-medium mb-2">Alias/Nickname</label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="JD"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                disabled={loading}
              />
            </div>
          )}
        </div>

        <Button onClick={handleContinue} disabled={loading}>
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
