import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { LandingPage } from './screens/LandingPage';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { UserTypeScreen } from './screens/UserTypeScreen';
import { HousingStatusScreen } from './screens/HousingStatusScreen';
import { LocationScreen } from './screens/LocationScreen';
import { HousedLocationScreen } from './screens/HousedLocationScreen';
import { HouseTypeScreen } from './screens/HouseTypeScreen';
import { RentAndOccupantsScreen } from './screens/RentAndOccupantsScreen';
import { RoommatesNeededScreen } from './screens/RoommatesNeededScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { NameScreen } from './screens/NameScreen';
import { ProfilePhotoScreen } from './screens/ProfilePhotoScreen';
import { AvatarSelectionScreen } from './screens/AvatarSelectionScreen';
import { BirthdayScreen } from './screens/BirthdayScreen';
import { GenderScreen } from './screens/GenderScreen';
import { DesiredHouseTypeScreen } from './screens/DesiredHouseTypeScreen';
import { BudgetScreen } from './screens/BudgetScreen';
import { TimelineScreen } from './screens/TimelineScreen';
import { ContactPreferenceScreen } from './screens/ContactPreferenceScreen';
import { SwipeScreen } from './screens/SwipeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { updateProfile } from './lib/profileHelpers';

type Screen = 'welcome' | 'login' | 'userType' | 'housingStatus' | 'location' | 'housedLocation' | 'houseType' | 'rentAndOccupants' | 'roommatesNeeded' | 'signUp' | 'name' | 'profilePhoto' | 'avatar' | 'birthday' | 'gender' | 'desiredHouseType' | 'budget' | 'timeline' | 'contactPreference' | 'swipe' | 'profile' | 'notifications';

const PRESIGNUP_STORAGE_KEY = 'roomie_presignup_data';
const ONBOARDING_SEEN_KEY = 'roomie_onboarding_seen';

function AppFlow() {
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [housingStatus, setHousingStatus] = useState<'have-place' | 'looking' | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true';
  });
  const [preSignupDataSaved, setPreSignupDataSaved] = useState(false);

  // Load pre-signup data from localStorage
  const loadPreSignupData = () => {
    const stored = localStorage.getItem(PRESIGNUP_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  };

  // Save pre-signup data to localStorage
  const savePreSignupData = (data: any) => {
    const existing = loadPreSignupData();
    const updated = { ...existing, ...data };
    localStorage.setItem(PRESIGNUP_STORAGE_KEY, JSON.stringify(updated));
    console.log('Saved to localStorage:', updated);
  };

  // Clear pre-signup data
  const clearPreSignupData = () => {
    localStorage.removeItem(PRESIGNUP_STORAGE_KEY);
  };

  // Mark onboarding as seen
  const markOnboardingSeen = () => {
    localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
    setHasSeenOnboarding(true);
  };

  // STAGE 1 → STAGE 2: After signup, save pre-signup data to database
  useEffect(() => {
    if (user && profile && !preSignupDataSaved) {
      const preSignupData = loadPreSignupData();
      console.log('User logged in, checking pre-signup data:', preSignupData);
      
      if (Object.keys(preSignupData).length > 0) {
        console.log('Found pre-signup data, saving to database...');
        const saveToDatabase = async () => {
          try {
            await updateProfile(user.id, preSignupData);
            console.log('Pre-signup data saved to database!');
            await refreshProfile();
            clearPreSignupData();
            setPreSignupDataSaved(true);
          } catch (error) {
            console.error('Error saving pre-signup data:', error);
          }
        };
        saveToDatabase();
      }
    }
  }, [user, profile]);

  // Resume onboarding if user is logged in
  useEffect(() => {
    if (loading) return;

    if (user && profile) {
      if (profile.onboarding_completed) {
        setCurrentScreen('swipe');
      } else {
        const step = determineOnboardingStep(profile);
        setCurrentScreen(step);
        
        if (profile.housing_status) {
          setHousingStatus(profile.housing_status === 'housed' ? 'have-place' : 'looking');
        }
      }
    }
  }, [user, profile, loading]);

  const determineOnboardingStep = (profile: any): Screen => {
    if (!profile.first_name) return 'name';
    if (!profile.profile_photo_url && !profile.avatar_id) return 'profilePhoto';
    if (!profile.birthday) return 'birthday';
    if (!profile.gender) return 'gender';
    
    if (profile.housing_status === 'looking') {
      if (!profile.budget_min || !profile.budget_max) return 'budget';
      if (!profile.move_in_date) return 'timeline';
    }
    
    if (!profile.contact_phone && !profile.contact_email && !profile.contact_instagram) {
      return 'contactPreference';
    }
    
    return 'swipe';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onNewUser={() => setCurrentScreen('userType')}
          onReturningUser={() => setCurrentScreen('login')}
          onBack={() => navigate('/')}
        />
      )}
      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={() => {}}
          onBack={() => setCurrentScreen('welcome')}
          onSignUp={() => setCurrentScreen('userType')}
        />
      )}
      {currentScreen === 'userType' && (
        <UserTypeScreen
          onSelect={(type) => {
            savePreSignupData({ user_type: type });
            if (type === 'city') {
              setCurrentScreen('housingStatus');
            }
          }}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}
      {currentScreen === 'housingStatus' && (
        <HousingStatusScreen
          onSelect={(status) => {
            setHousingStatus(status);
            savePreSignupData({ 
              housing_status: status === 'have-place' ? 'housed' : 'looking' 
            });
            
            if (status === 'have-place') {
              setCurrentScreen('housedLocation');
            } else {
              setCurrentScreen('location');
            }
          }}
          onBack={() => setCurrentScreen('userType')}
        />
      )}
      {currentScreen === 'location' && (
        <LocationScreen
          onNext={(location) => {
            savePreSignupData({ location });
            setCurrentScreen('signUp');
          }}
          onBack={() => setCurrentScreen('housingStatus')}
        />
      )}
      {currentScreen === 'housedLocation' && (
        <HousedLocationScreen
          onNext={(address) => {
            savePreSignupData({ full_address: address });
            setCurrentScreen('houseType');
          }}
          onBack={() => setCurrentScreen('housingStatus')}
        />
      )}
      {currentScreen === 'houseType' && (
        <HouseTypeScreen
          onSelect={(houseType) => {
            savePreSignupData({ house_type: houseType });
            setCurrentScreen('rentAndOccupants');
          }}
          onBack={() => setCurrentScreen('housedLocation')}
        />
      )}
      {currentScreen === 'rentAndOccupants' && (
        <RentAndOccupantsScreen
          onNext={(rent, currentOccupants, totalRooms) => {
            savePreSignupData({ 
              budget_max: rent,
              current_occupants: currentOccupants,
              total_rooms: totalRooms,
            });
            setCurrentScreen('roommatesNeeded');
          }}
          onBack={() => setCurrentScreen('houseType')}
        />
      )}
      {currentScreen === 'roommatesNeeded' && (
        <RoommatesNeededScreen
          onNext={(numberOfRoommates) => {
            savePreSignupData({ roommates_needed: numberOfRoommates });
            setCurrentScreen('signUp');
          }}
          onBack={() => setCurrentScreen('rentAndOccupants')}
        />
      )}
      {currentScreen === 'signUp' && (
        <SignUpScreen
          onEmailSignUp={() => setCurrentScreen('name')}
          onGoogleSignUp={() => setCurrentScreen('name')}
          onBack={() => {
            if (housingStatus === 'have-place') {
              setCurrentScreen('roommatesNeeded');
            } else {
              setCurrentScreen('location');
            }
          }}
          onGoToLogin={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'name' && (
        <NameScreen
          onNext={() => setCurrentScreen('profilePhoto')}
          onBack={() => setCurrentScreen('signUp')}
        />
      )}
      {currentScreen === 'profilePhoto' && (
        <ProfilePhotoScreen
          onContinue={() => setCurrentScreen('birthday')}
          onChooseAvatar={() => setCurrentScreen('avatar')}
          onBack={() => setCurrentScreen('name')}
        />
      )}
      {currentScreen === 'avatar' && (
        <AvatarSelectionScreen
          onContinue={() => setCurrentScreen('birthday')}
          onBack={() => setCurrentScreen('profilePhoto')}
        />
      )}
      {currentScreen === 'birthday' && (
        <BirthdayScreen
          onNext={() => setCurrentScreen('gender')}
          onBack={() => setCurrentScreen('profilePhoto')}
        />
      )}
      {currentScreen === 'gender' && (
        <GenderScreen
          onNext={() => {
            if (housingStatus === 'have-place') {
              setCurrentScreen('contactPreference');
            } else {
              setCurrentScreen('desiredHouseType');
            }
          }}
          onBack={() => setCurrentScreen('birthday')}
        />
      )}
      {currentScreen === 'desiredHouseType' && (
        <DesiredHouseTypeScreen
          onNext={() => setCurrentScreen('budget')}
          onBack={() => setCurrentScreen('gender')}
        />
      )}
      {currentScreen === 'budget' && (
        <BudgetScreen
          onNext={() => setCurrentScreen('timeline')}
          onBack={() => setCurrentScreen('desiredHouseType')}
        />
      )}
      {currentScreen === 'timeline' && (
        <TimelineScreen
          onNext={() => setCurrentScreen('contactPreference')}
          onBack={() => setCurrentScreen('budget')}
        />
      )}
      {currentScreen === 'contactPreference' && (
        <ContactPreferenceScreen
          onNext={() => setCurrentScreen('swipe')}
          onBack={() => {
            if (housingStatus === 'have-place') {
              setCurrentScreen('gender');
            } else {
              setCurrentScreen('timeline');
            }
          }}
        />
      )}
      {currentScreen === 'swipe' && (
        <SwipeScreen
          housingStatus={housingStatus}
          onNavigateToProfile={() => setCurrentScreen('profile')}
          onNavigateToNotifications={() => setCurrentScreen('notifications')}
          hasSeenOnboarding={hasSeenOnboarding}
          onOnboardingComplete={markOnboardingSeen}
        />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen
          onBack={() => setCurrentScreen('swipe')}
        />
      )}
      {currentScreen === 'notifications' && (
        <NotificationsScreen
          onBack={() => setCurrentScreen('swipe')}
        />
      )}
    </>
  );
}

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Landing page at root */}
      <Route path="/" element={<LandingPage onGetStarted={() => navigate('/app')} />} />
      
      {/* App flow at /app */}
      <Route path="/app" element={<AppFlow />} />
    </Routes>
  );
}

export default App;
