import React, { useState, useMemo, useEffect } from 'react';
import { EditPreferencesScreen } from './EditPreferencesScreen';
import { supabase } from '../lib/supabase';

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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  // Fetch profiles from database
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('onboarding_completed', true);

        if (error) throw error;

        // Map database profiles to our Profile interface
        const mappedProfiles: Profile[] = (data || []).map((p: any) => ({
          id: p.id,
          name: p.display_name || `${p.first_name} ${p.last_name}` || 'Anonymous',
          age: p.age || 0,
          gender: p.gender || 'Not specified',
          location: p.location || p.full_address || 'Unknown',
          housingStatus: p.housing_status === 'housed' ? 'housed' : 'looking',
          houseType: p.house_type,
          budget: p.budget_max || p.budget_min || 0,
          totalRooms: p.total_rooms,
          currentOccupants: p.current_occupants,
          moveInDate: p.move_in_date,
          diet: p.diet,
          religion: p.religion,
          pets: p.pets,
          smoking: p.smoking,
          sleepSchedule: p.sleep_schedule,
          background: p.background || 'No bio available',
          photo: p.profile_photo_url || p.avatar_id,
        }));

        setProfiles(mappedProfiles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on user's housing status
  const filteredProfiles = useMemo(() => {
    if (housingStatus === 'have-place') {
      return profiles.filter(profile => profile.housingStatus === 'looking');
    } else {
      return profiles;
    }
  }, [housingStatus, profiles]);

  const currentProfile = filteredProfiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on ${currentProfile?.name}`);
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

  // Update highlight position when step changes - FIXED DEPENDENCY
  useEffect(() => {
    if (showOnboarding && currentOnboardingStep?.target) {
      const updateHighlight = () => {
        const element = document.getElementById(currentOnboardingStep.target);
        if (element) {
          const rect = element.getBoundingClientRect();
          setHighlightRect(rect);
        }
      };
      
      // Use timeout to ensure element is rendered
      const timer = setTimeout(updateHighlight, 100);
      return () => clearTimeout(timer);
    }
  }, [onboardingStep, showOnboarding, currentOnboardingStep?.target]); // FIXED: Only depend on target string

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

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

        {/* Bottom Navigation */}
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

        {/* Onboarding Overlay */}
        {showOnboarding && highlightRect && (
          <>
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

            <div
              className="fixed border-4 border-white rounded-2xl pointer-events-none z-40 transition-all duration-300"
              style={{
                left: highlightRect.left - 8,
                top: highlightRect.top - 8,
                width: highlightRect.width + 16,
                height: highlightRect.height + 16,
              }}
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-start p-6 pointer-events-none">
              <div className="bg-white rounded-2xl p-6 max-w-xs w-full pointer-events-auto shadow-2xl ml-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{currentOnboardingStep.title}</h3>
                    <span className="text-xs text-gray-500">{onboardingStep + 1}/{onboardingSteps.length}</span>
                  </div>
                  <p className="text-sm text-gray-700">{currentOnboardingStep.description}</p>
                </div>
                
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
