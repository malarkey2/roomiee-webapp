import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface AvatarSelectionScreenProps {
  onContinue: (avatarId: string) => void;
  onBack: () => void;
}

const AVATARS = [
  { id: '1', emoji: '👨', label: 'Man 1' },
  { id: '2', emoji: '👩', label: 'Woman 1' },
  { id: '3', emoji: '🧑', label: 'Person 1' },
  { id: '4', emoji: '👨‍💼', label: 'Professional' },
  { id: '5', emoji: '👩‍💻', label: 'Developer' },
  { id: '6', emoji: '🧑‍🎨', label: 'Artist' },
  { id: '7', emoji: '👨‍🎓', label: 'Student' },
  { id: '8', emoji: '👩‍🔬', label: 'Scientist' },
  { id: '9', emoji: '🧑‍🍳', label: 'Chef' },
];

export const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ onContinue, onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected || !user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        avatar_id: selected,
        onboarding_step: 'birthday',
      });

      await refreshProfile();
      onContinue(selected);
    } catch (error) {
      console.error('Error saving avatar:', error);
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
          Choose an avatar
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Pick one that represents you
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelected(avatar.id)}
              className={`aspect-square p-4 border-2 rounded-2xl transition-all ${
                selected === avatar.id
                  ? 'border-black bg-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={loading}
            >
              <div className="text-5xl">{avatar.emoji}</div>
            </button>
          ))}
        </div>

        <Button onClick={handleContinue} disabled={!selected || loading}>
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
