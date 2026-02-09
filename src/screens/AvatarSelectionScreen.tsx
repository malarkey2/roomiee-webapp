import React, { useState } from 'react';
import { Button } from '../components/Button';

interface AvatarSelectionScreenProps {
  onContinue: (avatarId: string) => void;
  onBack: () => void;
}

const AVATARS = [
  { id: '1', emoji: '😊' },
  { id: '2', emoji: '😎' },
  { id: '3', emoji: '🤓' },
  { id: '4', emoji: '😇' },
  { id: '5', emoji: '🥳' },
  { id: '6', emoji: '🤗' },
  { id: '7', emoji: '😌' },
  { id: '8', emoji: '🙂' },
];

export const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ 
  onContinue, 
  onBack 
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

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
          Choose an Avatar instead
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          If you wish to express your image with an avatar,<br />
          select one that represents you best
        </p>

        {/* Avatar grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-4xl transition-all ${
                selectedAvatar === avatar.id
                  ? 'bg-black text-white scale-105'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {avatar.emoji}
            </button>
          ))}
        </div>

        <Button 
          onClick={() => selectedAvatar && onContinue(selectedAvatar)}
          disabled={!selectedAvatar}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
