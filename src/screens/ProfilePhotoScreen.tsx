import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';

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
  const { user, refreshProfile } = useAuth();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        profile_photo_url: photoPreview || null,
        onboarding_step: 'birthday',
      });

      await refreshProfile();
      onContinue(photoPreview || undefined);
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, {
        onboarding_step: 'birthday',
      });

      await refreshProfile();
      onContinue();
    } catch (error) {
      console.error('Error skipping photo:', error);
      alert('Failed to continue. Please try again.');
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
          Add a profile photo
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Help your future roommates get to know you
        </p>

        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">📷</span>
            )}
          </div>

          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            <div className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl font-medium text-center hover:bg-gray-50 transition-all cursor-pointer">
              {photoPreview ? 'Change Photo' : 'Upload Photo'}
            </div>
          </label>

          <button
            onClick={onChooseAvatar}
            className="w-full mt-3 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
            disabled={loading}
          >
            Choose Avatar Instead
          </button>
        </div>

        <div className="space-y-3">
          <Button onClick={handleContinue} disabled={!photoPreview || loading}>
            {loading ? 'Saving...' : 'Continue with Photo'}
          </Button>
          
          
        </div>
      </div>
    </div>
  );
};
