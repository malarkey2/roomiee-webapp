import React, { useState } from 'react';
import { PreferencesModal } from '../components/PreferencesModal';
import type { UserPreferences } from '../components/PreferencesModal';

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  housingStatus: 'housed' | 'looking';
  houseType?: string;
  address?: string;
  budget: number;
  availability?: string;
  diet?: string;
  religion?: string;
  pets?: string;
  smoking?: string;
  sleepSchedule?: string;
  background: string;
  photo?: string;
}

// Fake profiles for testing
const FAKE_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 24,
    gender: 'Woman',
    location: 'Durham, NC',
    housingStatus: 'housed',
    houseType: 'Apartment',
    address: '123 Main St, Durham',
    budget: 1200,
    availability: '5/6',
    diet: 'Vegetarian',
    pets: 'Have pets',
    sleepSchedule: 'Night owl',
    smoking: 'Non-smoker',
    background: "I'm a software developer originally from Chapel Hill. I went to UNC for undergrad and just started working at a tech startup in Durham. Looking for a chill roommate who respects quiet time but is up for occasional hangouts!",
  },
  {
    id: '2',
    name: 'Marcus Williams',
    age: 27,
    gender: 'Man',
    location: 'Durham, NC',
    housingStatus: 'looking',
    budget: 900,
    diet: 'No preference',
    pets: 'Allergic to pets',
    sleepSchedule: 'Early bird',
    smoking: 'Non-smoker',
    religion: 'Christian',
    background: "Recent grad from Duke working in finance. Love cooking, hiking, and playing guitar. Looking for someone clean, respectful, and easy to live with. I'm pretty laid back but appreciate a tidy space.",
  },
  {
    id: '3',
    name: 'Emily Chen',
    age: 22,
    gender: 'Woman',
    location: 'Durham, NC',
    housingStatus: 'housed',
    houseType: 'Townhouse',
    address: '456 Oak Ave, Durham',
    budget: 1400,
    availability: '3/4',
    diet: 'Vegan',
    pets: 'Open to pets',
    sleepSchedule: 'Flexible',
    smoking: 'Non-smoker',
    background: "PhD student at Duke studying neuroscience. I'm quiet during the week but love hosting small dinner parties on weekends. Looking for someone who's respectful, clean, and enjoys good conversation.",
  },
  {
    id: '4',
    name: 'Alex Rivera',
    age: 25,
    gender: 'Non-binary',
    location: 'Durham, NC',
    housingStatus: 'looking',
    budget: 1100,
    diet: 'Pescatarian',
    pets: 'No pets',
    sleepSchedule: 'Night owl',
    smoking: 'Social smoker',
    religion: 'Agnostic',
    background: "Artist and barista working in downtown Durham. I'm creative, messy in my own space but respectful of shared areas. Love music, art, and late-night conversations. 420 friendly.",
  },
  {
    id: '5',
    name: 'Jordan Lee',
    age: 26,
    gender: 'Man',
    location: 'Durham, NC',
    housingStatus: 'housed',
    houseType: 'House',
    address: '789 Pine Rd, Durham',
    budget: 800,
    availability: '4/5',
    diet: 'No preference',
    pets: 'Have pets',
    sleepSchedule: 'Early bird',
    smoking: 'Non-smoker',
    background: "Nurse working rotating shifts at Duke Hospital. I have a dog named Max who's super friendly. Looking for someone who loves animals and doesn't mind my occasionally weird schedule!",
  },
];

interface SwipeScreenProps {
  onPreferencesSet?: (preferences: UserPreferences) => void;
}

export const SwipeScreen: React.FC<SwipeScreenProps> = ({ onPreferencesSet }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferencesSet, setPreferencesSet] = useState(false);

  const currentProfile = FAKE_PROFILES[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on ${currentProfile.name}`);
    
    const newSwipeCount = swipeCount + 1;
    setSwipeCount(newSwipeCount);
    setCurrentIndex(currentIndex + 1);

    // Show preferences modal after 3 swipes if not set yet
    if (newSwipeCount === 3 && !preferencesSet) {
      setShowPreferencesModal(true);
    }
  };

  const handlePreferencesComplete = (preferences: UserPreferences) => {
    console.log('Preferences set:', preferences);
    setPreferencesSet(true);
    setShowPreferencesModal(false);
    if (onPreferencesSet) {
      onPreferencesSet(preferences);
    }
  };

  const handlePreferencesSkip = () => {
    setPreferencesSet(true);
    setShowPreferencesModal(false);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">No more profiles</h2>
          <p className="text-gray-600">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  // Get user's preference badges (max 4)
  const badges = [];
  if (currentProfile.diet && currentProfile.diet !== 'No preference') {
    badges.push({ icon: '🌱', label: currentProfile.diet });
  }
  if (currentProfile.pets) {
    const petIcon = currentProfile.pets === 'Have pets' ? '🐕' : currentProfile.pets === 'Allergic to pets' ? '🚫🐾' : '✅🐾';
    badges.push({ icon: petIcon, label: currentProfile.pets });
  }
  if (currentProfile.sleepSchedule) {
    const sleepIcon = currentProfile.sleepSchedule.includes('Early') ? '🌅' : '🌙';
    badges.push({ icon: sleepIcon, label: currentProfile.sleepSchedule });
  }
  if (currentProfile.smoking === 'Non-smoker') {
    badges.push({ icon: '🚭', label: 'Non-smoker' });
  }
  if (currentProfile.religion && currentProfile.religion !== 'No preference') {
    badges.push({ icon: '🙏', label: currentProfile.religion });
  }

  // Take only first 4 badges
  const displayBadges = badges.slice(0, 4);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="p-6">
          <button className="text-gray-600 hover:text-black transition-colors">
            ← Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex-1 px-6 pb-32 overflow-y-auto">
          <div className="max-w-md mx-auto">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* Profile Photo */}
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">
                  {currentProfile.gender === 'Woman' ? '👩' : currentProfile.gender === 'Man' ? '👨' : '🧑'}
                </span>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold">{currentProfile.name}</h2>
                <p className="text-gray-600">
                  {currentProfile.gender} | {currentProfile.age} | {currentProfile.location}
                </p>
              </div>
            </div>

            {/* Housing Info */}
            <div className="bg-gray-100 rounded-2xl p-4 mb-6">
              {currentProfile.housingStatus === 'housed' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">🏠</span>
                      <span className="font-medium">Housed | {currentProfile.houseType}</span>
                    </div>
                    <p className="text-sm text-gray-600">Availability - {currentProfile.availability}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">📍</span>
                      <span className="font-medium text-sm">{currentProfile.address}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">${currentProfile.budget}/month</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🔍</span>
                    <span className="font-medium">Looking for a place</span>
                  </div>
                  <p className="text-sm text-gray-600">Budget: ${currentProfile.budget}/month</p>
                </div>
              )}
            </div>

            {/* Preference Badges */}
            {displayBadges.length > 0 && (
              <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                {displayBadges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">{badge.icon}</span>
                    </div>
                    <span className="text-xs text-gray-600 text-center max-w-[70px]">{badge.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Background Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">My Background</h3>
              <p className="text-gray-700 leading-relaxed">
                {currentProfile.background}
              </p>
            </div>
          </div>
        </div>

        {/* Swipe Buttons - Fixed at bottom */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-6">
          <div className="max-w-md mx-auto flex gap-4">
            <button
              onClick={() => handleSwipe('left')}
              className="flex-1 py-4 bg-gray-100 rounded-full font-semibold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-2xl">✕</span>
              Pass
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="flex-1 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-2xl">❤️</span>
              Match
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto flex justify-around">
            <button className="p-3 text-gray-600 hover:text-black transition-colors">
              <span className="text-2xl">👤</span>
            </button>
            <button className="p-3 text-black">
              <span className="text-2xl">🔀</span>
            </button>
            <button className="p-3 text-gray-600 hover:text-black transition-colors">
              <span className="text-2xl">🔔</span>
            </button>
            <button className="p-3 text-gray-600 hover:text-black transition-colors">
              <span className="text-2xl">✉️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <PreferencesModal
          onComplete={handlePreferencesComplete}
          onSkip={handlePreferencesSkip}
        />
      )}
    </>
  );
};
