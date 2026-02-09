import React, { useState, useMemo, useEffect } from 'react';
import { EditPreferencesScreen } from './EditPreferencesScreen';

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  housingStatus: 'housed' | 'looking';
  houseType?: string;
  budget: number;
  availability?: string;
  totalRooms?: number;
  currentOccupants?: number;
  moveInDate?: string;
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
    budget: 1200,
    totalRooms: 3,
    currentOccupants: 2,
    moveInDate: '2026-04-01',
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
    moveInDate: '2026-03-15',
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
    budget: 1400,
    totalRooms: 4,
    currentOccupants: 3,
    moveInDate: '2026-05-01',
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
    moveInDate: '2026-04-15',
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
    housingStatus: 'looking',
    budget: 800,
    moveInDate: '2026-03-20',
    diet: 'No preference',
    pets: 'Have pets',
    sleepSchedule: 'Early bird',
    smoking: 'Non-smoker',
    background: "Nurse working rotating shifts at Duke Hospital. I have a dog named Max who's super friendly. Looking for someone who loves animals and doesn't mind my occasionally weird schedule!",
  },
];

interface SwipeScreenProps {
  housingStatus: 'have-place' | 'looking' | null;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  hasSeenOnboarding?: boolean;
  onOnboardingComplete?: () => void;
}

export const SwipeScreen: React.FC<SwipeScreenProps> = ({ 
  housingStatus,
  onNavigateToProfile,
  onNavigateToNotifications,
  hasSeenOnboarding = false,
  onOnboardingComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  // Filter profiles based on user's housing status
  const filteredProfiles = useMemo(() => {
    if (housingStatus === 'have-place') {
      return FAKE_PROFILES.filter(profile => profile.housingStatus === 'looking');
    } else {
      return FAKE_PROFILES;
    }
  }, [housingStatus]);

  const currentProfile = filteredProfiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on ${currentProfile.name}`);
    setCurrentIndex(currentIndex + 1);
  };

  const handleEditPreferences = () => {
    setShowOnboarding(false);
    setShowEditPreferences(true);
  };

  const handleSaveDetailedPreferences = () => {
    setShowEditPreferences(false);
    if (onOnboardingComplete) {
      onOnboardingComplete();
    }
  };

  const onboardingSteps = [
    {
      target: 'housing-info',
      title: 'Housing Details',
      description: 'View their housing status, location, budget, and move-in date',
      showEditButton: false,
    },
    {
      target: 'badges',
      title: 'Lifestyle Badges',
      description: 'See their diet, pet preferences, sleep schedule, and more at a glance',
      showEditButton: true,
    },
    {
      target: 'swipe-buttons',
      title: 'Match or Pass',
      description: 'Swipe right to match with someone you would like as a roommate, or left to pass',
      showEditButton: false,
    },
  ];

  const currentOnboardingStep = onboardingSteps[onboardingStep];

  // Update highlight position when step changes
  useEffect(() => {
    if (showOnboarding && currentOnboardingStep) {
      const element = document.getElementById(currentOnboardingStep.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect(rect);
      }
    }
  }, [onboardingStep, showOnboarding, currentOnboardingStep]);

  const handleNextOnboarding = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
      if (onOnboardingComplete) {
        onOnboardingComplete();
      }
    }
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    if (onOnboardingComplete) {
      onOnboardingComplete();
    }
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

  const displayBadges = badges.slice(0, 4);

  const moveInDate = currentProfile.moveInDate 
    ? new Date(currentProfile.moveInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <>
      <div className="h-screen bg-white flex flex-col relative overflow-hidden">
        {/* Header - Fixed */}
        <div className="p-6 flex-shrink-0">
          <button className="text-gray-600 hover:text-black transition-colors">
            ← Back
          </button>
        </div>

        {/* Profile Card - Scrollable area */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="max-w-md mx-auto pb-32">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
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
            <div 
              className="bg-gray-100 rounded-2xl p-4 mb-6"
              id="housing-info"
            >
              {currentProfile.housingStatus === 'housed' ? (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🏠</span>
                        <span className="font-semibold text-sm">Housed | {currentProfile.houseType}</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-7">
                        {currentProfile.currentOccupants}/{currentProfile.totalRooms} occupied
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-lg">📍</span>
                        <span className="font-semibold text-sm">{currentProfile.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Move-in date</p>
                      <p className="font-semibold text-sm">{moveInDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">Rent</p>
                      <p className="font-semibold text-sm">${currentProfile.budget}/month</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🔍</span>
                        <span className="font-semibold text-sm">Looking for a place</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-7">
                        Budget: ${currentProfile.budget}/month
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Target move-in</p>
                      <p className="font-semibold text-sm">{moveInDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">Location</p>
                      <p className="font-semibold text-sm">{currentProfile.location}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Preference Badges */}
            {displayBadges.length > 0 && (
              <div 
                className="flex gap-3 mb-6 overflow-x-auto pb-2"
                id="badges"
              >
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

        {/* Swipe Buttons - Fixed */}
        <div 
          className="flex-shrink-0 border-t border-gray-200 p-6 bg-white"
          id="swipe-buttons"
        >
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

        {/* Bottom Navigation - Fixed (Only Profile and Notifications) */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
          <div className="max-w-md mx-auto flex justify-around">
            <button 
              onClick={onNavigateToProfile}
              className="p-3 text-gray-600 hover:text-black transition-colors"
            >
              <span className="text-2xl">👤</span>
            </button>
            <button 
              onClick={onNavigateToNotifications}
              className="p-3 text-gray-600 hover:text-black transition-colors"
            >
              <span className="text-2xl">🔔</span>
            </button>
          </div>
        </div>

        {/* Onboarding Overlay with Spotlight */}
        {showOnboarding && highlightRect && (
          <>
            {/* SVG mask for spotlight effect */}
            <svg className="fixed inset-0 w-full h-full pointer-events-none z-40">
              <defs>
                <mask id="spotlight-mask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <rect
                    x={highlightRect.left - 8}
                    y={highlightRect.top - 8}
                    width={highlightRect.width + 16}
                    height={highlightRect.height + 16}
                    rx="16"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="rgba(0, 0, 0, 0.75)"
                mask="url(#spotlight-mask)"
              />
            </svg>

            {/* Highlight border */}
            <div
              className="fixed border-4 border-white rounded-2xl pointer-events-none z-40 transition-all duration-300"
              style={{
                left: highlightRect.left - 8,
                top: highlightRect.top - 8,
                width: highlightRect.width + 16,
                height: highlightRect.height + 16,
              }}
            />
            
            {/* Onboarding tooltip - Positioned on the left */}
            <div className="fixed inset-0 z-50 flex items-center justify-start p-6 pointer-events-none">
              <div className="bg-white rounded-2xl p-6 max-w-xs w-full pointer-events-auto shadow-2xl ml-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{currentOnboardingStep.title}</h3>
                    <span className="text-xs text-gray-500">{onboardingStep + 1}/{onboardingSteps.length}</span>
                  </div>
                  <p className="text-sm text-gray-700">{currentOnboardingStep.description}</p>
                </div>
                
                {/* Show edit button on badges step */}
                {currentOnboardingStep.showEditButton && (
                  <button
                    onClick={handleEditPreferences}
                    className="w-full px-4 py-3 mb-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
                  >
                    Edit for better matches
                  </button>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={handleSkipOnboarding}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleNextOnboarding}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
                  >
                    {onboardingStep < onboardingSteps.length - 1 ? 'Next' : 'Got it!'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Preferences Screen Overlay */}
      {showEditPreferences && (
        <div className="fixed inset-0 bg-white z-50">
          <EditPreferencesScreen
            onSave={handleSaveDetailedPreferences}
            onBack={() => {
              setShowEditPreferences(false);
              setShowOnboarding(true);
            }}
          />
        </div>
      )}
    </>
  );
};
