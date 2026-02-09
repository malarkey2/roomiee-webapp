import React, { useState } from 'react';
import { Button } from '../components/Button';

interface ProfilePhotoScreenProps {
  onContinue: (photoUrl?: string) => void;
  onChooseAvatar: () => void;
  onBack: () => void;
}

export const ProfilePhotoScreen: React.FC<ProfilePhotoScreenProps> = ({ 
  onContinue, 
  onChooseAvatar,
  onBack 
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          Add your profile photo
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          A great photograph is a great introduction to you.<br />
          You can change this any time.
        </p>

        {/* Photo preview circle */}
        <div className="w-48 h-48 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {selectedPhoto ? (
            <img src={selectedPhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>

        {/* Upload buttons */}
        <div className="flex gap-3 mb-8">
          <label className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-center font-medium cursor-pointer">
              Add from Instagram
            </div>
          </label>
          <label className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-center font-medium cursor-pointer">
              Add from gallery
            </div>
          </label>
        </div>

        <Button 
          onClick={() => onContinue(selectedPhoto || undefined)}
          className="w-full mb-3"
        >
          Continue
        </Button>

        <button
          onClick={onChooseAvatar}
          className="w-full py-3 text-gray-600 hover:text-black transition-colors font-medium"
        >
          Choose an Avatar instead
        </button>
      </div>
    </div>
  );
};
