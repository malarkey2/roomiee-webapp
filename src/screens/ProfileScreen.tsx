import React, { useState } from 'react';
import { Button } from '../components/Button';
import { EditPreferencesScreen } from './EditPreferencesScreen';
import type { DetailedPreferences } from './EditPreferencesScreen';

interface ProfileScreenProps {
  onBack: () => void;
}

// Mock user data - in real app this would come from state/database
const MOCK_USER_PROFILE = {
  name: 'John Doe',
  age: 25,
  gender: 'Man',
  location: 'Durham, NC',
  housingStatus: 'looking',
  budget_min: 800,
  budget_max: 1200,
  move_in_date: '2026-04-01',
  cleanliness: 4,
  noise_tolerance: 3,
  guest_frequency: 2,
  diet: 'Vegetarian',
  pets: 'Open to pets',
  sleepSchedule: 'Night owl',
  smoking: 'Non-smoker',
  background: "I'm a software engineer who loves hiking and cooking. Looking for a clean, respectful roommate.",
  contactPreferences: {
    phone: '(555) 123-4567',
    email: 'john@example.com',
    instagram: '@johndoe',
  },
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (field: string, currentValue: any) => {
    setEditField(field);
    setEditValue(String(currentValue));
    setIsEditModalOpen(true);
  };

  const handleEditLifestyle = () => {
    setShowEditPreferences(true);
  };

  const handleSavePreferences = (preferences: DetailedPreferences) => {
    console.log('Saved preferences:', preferences);
    // Update profile with new preferences
    // You can map the preferences back to profile fields here
    setShowEditPreferences(false);
  };

  const handleSave = () => {
    if (editField) {
      setProfile({ ...profile, [editField]: editValue });
    }
    setIsEditModalOpen(false);
    setEditField(null);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditField(null);
    setEditValue('');
  };

  const moveInDate = new Date(profile.move_in_date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  // If editing preferences, show that screen
  if (showEditPreferences) {
    return (
      <EditPreferencesScreen
        onSave={handleSavePreferences}
        onBack={() => setShowEditPreferences(false)}
      />
    );
  }

  return (
    <>
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 flex-shrink-0 border-b border-gray-200">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Swiping
          </button>
          <h1 className="text-2xl font-bold mt-4">My Profile</h1>
        </div>

        {/* Scrollable Profile Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="max-w-md mx-auto">
            {/* Profile Photo */}
            <div className="flex flex-col items-center my-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-6xl">👨</span>
              </div>
              <button 
                onClick={() => handleEdit('photo', 'photo')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Edit Photo
              </button>
            </div>

            {/* Basic Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Basic Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Name</p>
                    <p className="font-medium">{profile.name}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('name', profile.name)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Age</p>
                    <p className="font-medium">{profile.age}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('age', profile.age)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Gender</p>
                    <p className="font-medium">{profile.gender}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('gender', profile.gender)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('location', profile.location)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>

            {/* Housing Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Housing Details</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Budget Range</p>
                    <p className="font-medium">${profile.budget_min} - ${profile.budget_max}/month</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('budget', `${profile.budget_min}-${profile.budget_max}`)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Move-in Date</p>
                    <p className="font-medium">{moveInDate}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('move_in_date', profile.move_in_date)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>

            {/* Lifestyle Preferences */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Lifestyle</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Diet</p>
                    <p className="font-medium">{profile.diet}</p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Pets</p>
                    <p className="font-medium">{profile.pets}</p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Sleep Schedule</p>
                    <p className="font-medium">{profile.sleepSchedule}</p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Smoking</p>
                    <p className="font-medium">{profile.smoking}</p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">My Background</h2>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-gray-700">{profile.background}</p>
                </div>
                <button 
                  onClick={() => handleEdit('background', profile.background)}
                  className="text-blue-600 text-sm ml-3"
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Contact Preferences */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Contact Info (Shared with Matches)</h2>
              
              <div className="space-y-3">
                {profile.contactPreferences.phone && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="font-medium">{profile.contactPreferences.phone}</p>
                    </div>
                    <button 
                      onClick={() => handleEdit('contact_phone', profile.contactPreferences.phone)}
                      className="text-blue-600 text-sm"
                    >
                      ✏️
                    </button>
                  </div>
                )}

                {profile.contactPreferences.email && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium">{profile.contactPreferences.email}</p>
                    </div>
                    <button 
                      onClick={() => handleEdit('contact_email', profile.contactPreferences.email)}
                      className="text-blue-600 text-sm"
                    >
                      ✏️
                    </button>
                  </div>
                )}

                {profile.contactPreferences.instagram && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600">Instagram</p>
                      <p className="font-medium">{profile.contactPreferences.instagram}</p>
                    </div>
                    <button 
                      onClick={() => handleEdit('contact_instagram', profile.contactPreferences.instagram)}
                      className="text-blue-600 text-sm"
                    >
                      ✏️
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal (for non-lifestyle fields) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit {editField?.replace('_', ' ')}</h3>
            
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors mb-4"
              rows={editField === 'background' ? 5 : 2}
            />

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <Button onClick={handleSave} className="flex-1">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};