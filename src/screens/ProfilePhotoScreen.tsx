import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

interface ProfilePhotoScreenProps {
  onContinue: () => void;
  onChooseAvatar: () => void;
  onBack: () => void;
}

export const ProfilePhotoScreen: React.FC<ProfilePhotoScreenProps> = ({ 
  onContinue, 
  onChooseAvatar,
  onBack 
}) => {
  const { user, refreshProfile } = useAuth();
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!user) return;

    setUploading(true);
    try {
      if (photo) {
        await updateProfile(user.id, { 
          profile_photo_url: photo,
          onboarding_step: 'birthday'
        });
      } else {
        await updateProfile(user.id, { 
          onboarding_step: 'birthday'
        });
      }
      await refreshProfile();
      onContinue();
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Failed to save photo. Please try again.');
    } finally {
      setUploading(false);
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
          Add a profile photo
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Help others recognize you
        </p>

        <div className="mb-8">
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">📷</span>
            )}
          </div>

          <label className="block w-full py-3 bg-gray-100 text-center rounded-xl font-medium hover:bg-gray-200 transition-all cursor-pointer mb-3">
            {photo ? 'Change Photo' : 'Upload Photo'}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={onChooseAvatar}
            className="block w-full py-3 border-2 border-gray-200 text-center rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Choose Avatar Instead
          </button>
        </div>

        <Button onClick={handleContinue} disabled={uploading}>
          {uploading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
