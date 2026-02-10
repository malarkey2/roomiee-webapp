import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, markOnboardingComplete } from '../lib/profileHelpers';

interface ContactPreferenceScreenProps {
  onNext: (preferences: ContactPreferences) => void;
  onBack: () => void;
}

export interface ContactPreferences {
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}

export const ContactPreferenceScreen: React.FC<ContactPreferenceScreenProps> = ({ onNext, onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [enablePhone, setEnablePhone] = useState(false);
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableInstagram, setEnableInstagram] = useState(false);
  const [enableFacebook, setEnableFacebook] = useState(false);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const preferences: ContactPreferences = {};
    if (enablePhone && phone.trim()) preferences.phone = phone.trim();
    if (enableEmail && email.trim()) preferences.email = email.trim();
    if (enableInstagram && instagram.trim()) preferences.instagram = instagram.trim();
    if (enableFacebook && facebook.trim()) preferences.facebook = facebook.trim();

    if (Object.keys(preferences).length === 0) {
      alert('Please provide at least one contact method');
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      // Save contact preferences and mark onboarding as complete
      await updateProfile(user.id, {
        contact_phone: preferences.phone || null,
        contact_email: preferences.email || null,
        contact_instagram: preferences.instagram || null,
        contact_facebook: preferences.facebook || null,
      });

      await markOnboardingComplete(user.id);
      await refreshProfile();

      onNext(preferences);
    } catch (error) {
      console.error('Error saving contact preferences:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const hasAtLeastOne = (enablePhone && phone.trim()) || 
                        (enableEmail && email.trim()) || 
                        (enableInstagram && instagram.trim()) || 
                        (enableFacebook && facebook.trim());

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhoneNumber(value));
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
          How do you want to connect with matches?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          When someone swipes right on you, they'll see your contact info. Choose at least one method.
        </p>

        {/* Phone */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Phone Number</label>
            <button
              onClick={() => setEnablePhone(!enablePhone)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                enablePhone ? 'bg-black' : 'bg-gray-300'
              }`}
              disabled={loading}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enablePhone ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {enablePhone && (
            <input
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Email</label>
            <button
              onClick={() => setEnableEmail(!enableEmail)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                enableEmail ? 'bg-black' : 'bg-gray-300'
              }`}
              disabled={loading}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enableEmail ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {enableEmail && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          )}
        </div>

        {/* Instagram */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Instagram</label>
            <button
              onClick={() => setEnableInstagram(!enableInstagram)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                enableInstagram ? 'bg-black' : 'bg-gray-300'
              }`}
              disabled={loading}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enableInstagram ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {enableInstagram && (
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@yourusername"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          )}
        </div>

        {/* Facebook Messenger */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Facebook Messenger</label>
            <button
              onClick={() => setEnableFacebook(!enableFacebook)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                enableFacebook ? 'bg-black' : 'bg-gray-300'
              }`}
              disabled={loading}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enableFacebook ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {enableFacebook && (
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="facebook.com/yourprofile"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
            />
          )}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!hasAtLeastOne || loading}
          className="w-full"
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
