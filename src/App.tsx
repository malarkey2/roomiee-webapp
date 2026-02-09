import { useState } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { UserTypeScreen } from './screens/UserTypeScreen';
import { HousingStatusScreen } from './screens/HousingStatusScreen';
import { LocationScreen } from './screens/LocationScreen';
import { HousedLocationScreen } from './screens/HousedLocationScreen';
import { HouseTypeScreen } from './screens/HouseTypeScreen';
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

type Screen = 'welcome' | 'userType' | 'housingStatus' | 'location' | 'housedLocation' | 'houseType' | 'roommatesNeeded' | 'signUp' | 'name' | 'profilePhoto' | 'avatar' | 'birthday' | 'gender' | 'desiredHouseType' | 'budget' | 'timeline' | 'contactPreference' | 'swipe' | 'profile' | 'notifications';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [housingStatus, setHousingStatus] = useState<'have-place' | 'looking' | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onNewUser={() => setCurrentScreen('userType')}
          onReturningUser={() => console.log('Login flow')}
        />
      )}
      {currentScreen === 'userType' && (
        <UserTypeScreen
          onSelect={(type) => {
            console.log('User type:', type);
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
            console.log('Housing status:', status);
            setHousingStatus(status);
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
            console.log('Looking in:', location);
            setCurrentScreen('signUp');
          }}
          onBack={() => setCurrentScreen('housingStatus')}
        />
      )}
      {currentScreen === 'housedLocation' && (
        <HousedLocationScreen
          onNext={(address) => {
            console.log('Housed at:', address);
            setCurrentScreen('houseType');
          }}
          onBack={() => setCurrentScreen('housingStatus')}
        />
      )}
      {currentScreen === 'houseType' && (
        <HouseTypeScreen
          onSelect={(houseType) => {
            console.log('House type:', houseType);
            setCurrentScreen('roommatesNeeded');
          }}
          onBack={() => setCurrentScreen('housedLocation')}
        />
      )}
      {currentScreen === 'roommatesNeeded' && (
        <RoommatesNeededScreen
          onNext={(numberOfRoommates) => {
            console.log('Roommates needed:', numberOfRoommates);
            setCurrentScreen('signUp');
          }}
          onBack={() => setCurrentScreen('houseType')}
        />
      )}
      {currentScreen === 'signUp' && (
        <SignUpScreen
          onEmailSignUp={(email, password) => {
            console.log('Email signup:', email);
            setCurrentScreen('name');
          }}
          onGoogleSignUp={() => {
            console.log('Google signup');
            setCurrentScreen('name');
          }}
          onBack={() => {
            if (housingStatus === 'have-place') {
              setCurrentScreen('roommatesNeeded');
            } else {
              setCurrentScreen('location');
            }
          }}
        />
      )}
      {currentScreen === 'name' && (
        <NameScreen
          onNext={(firstName, lastName, useAlias, alias) => {
            console.log('Name:', firstName, lastName, 'Alias:', useAlias, alias);
            setCurrentScreen('profilePhoto');
          }}
          onBack={() => setCurrentScreen('signUp')}
        />
      )}
      {currentScreen === 'profilePhoto' && (
        <ProfilePhotoScreen
          onContinue={(photoUrl) => {
            console.log('Photo:', photoUrl);
            setHasPhoto(!!photoUrl);
            setCurrentScreen('birthday');
          }}
          onChooseAvatar={() => setCurrentScreen('avatar')}
          onBack={() => setCurrentScreen('name')}
        />
      )}
      {currentScreen === 'avatar' && (
        <AvatarSelectionScreen
          onContinue={(avatarId) => {
            console.log('Avatar:', avatarId);
            setHasPhoto(true);
            setCurrentScreen('birthday');
          }}
          onBack={() => setCurrentScreen('profilePhoto')}
        />
      )}
      {currentScreen === 'birthday' && (
        <BirthdayScreen
          onNext={(birthday) => {
            console.log('Birthday:', birthday);
            setCurrentScreen('gender');
          }}
          onBack={() => setCurrentScreen('profilePhoto')}
        />
      )}
      {currentScreen === 'gender' && (
        <GenderScreen
          onNext={(gender) => {
            console.log('Gender:', gender);
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
          onNext={(houseTypes) => {
            console.log('Desired house types:', houseTypes);
            setCurrentScreen('budget');
          }}
          onBack={() => setCurrentScreen('gender')}
        />
      )}
      {currentScreen === 'budget' && (
        <BudgetScreen
          onNext={(minBudget, maxBudget) => {
            console.log('Budget:', minBudget, maxBudget);
            setCurrentScreen('timeline');
          }}
          onBack={() => setCurrentScreen('desiredHouseType')}
        />
      )}
      {currentScreen === 'timeline' && (
        <TimelineScreen
          onNext={(startDate, duration) => {
            console.log('Timeline:', startDate, duration);
            setCurrentScreen('contactPreference');
          }}
          onBack={() => setCurrentScreen('budget')}
        />
      )}
      {currentScreen === 'contactPreference' && (
        <ContactPreferenceScreen
          onNext={(preferences) => {
            console.log('Contact preferences:', preferences);
            setCurrentScreen('swipe');
          }}
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
          onOnboardingComplete={() => setHasSeenOnboarding(true)}
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

export default App;