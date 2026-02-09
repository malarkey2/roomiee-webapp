import React, { useState } from 'react';
import { Button } from '../components/Button';

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
  const [enablePhone, setEnablePhone] = useState(false);
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableInstagram, setEnableInstagram] = useState(false);
  const [enableFacebook, setEnableFacebook] = useState(false);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const handleNext = () => {
    const preferences: ContactPreferences = {};
    if (enablePhone && phone.trim()) preferences.phone = phone.trim();
    if (enableEmail && email.trim()) preferences.email = email.trim();
    if (enableInstagram && instagram.trim()) preferences.instagram = instagram.trim();
    if (enableFacebook && facebook.trim()) preferences.facebook = facebook.trim();

    onNext(preferences);
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
            />
          )}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!hasAtLeastOne}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
