import React, { useState } from 'react';
import { Button } from '../components/Button';
import { EditPreferencesScreen } from './EditPreferencesScreen';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/profileHelpers';
import type { DetailedPreferences } from './EditPreferencesScreen';

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const { user, profile, refreshProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleEdit = (field: string, currentValue: any) => {
    setEditField(field);
    setEditValue(String(currentValue || ''));
    setIsEditModalOpen(true);
  };

  const handleEditLifestyle = () => {
    setShowEditPreferences(true);
  };

  const handleSavePreferences = (preferences: DetailedPreferences) => {
    console.log('Saved preferences:', preferences);
    setShowEditPreferences(false);
  };

  const handleSave = async () => {
    if (!editField || !user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, { [editField]: editValue });
      await refreshProfile();
      setIsEditModalOpen(false);
      setEditField(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditField(null);
    setEditValue('');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const displayName = profile.display_name || `${profile.first_name} ${profile.last_name}` || 'Anonymous';
  const moveInDate = profile.move_in_date 
    ? new Date(profile.move_in_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Not set';

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
                {profile.avatar_id ? (
                  <span className="text-6xl">
                    {profile.gender === 'Woman' ? '👩' : profile.gender === 'Man' ? '👨' : '🧑'}
                  </span>
                ) : profile.profile_photo_url ? (
                  <img src={profile.profile_photo_url} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-6xl">📷</span>
                )}
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
                    <p className="font-medium">{displayName}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('first_name', profile.first_name)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600">Age</p>
                    <p className="font-medium">{profile.age || 'Not set'}</p>
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
                    <p className="font-medium">{profile.gender || 'Not set'}</p>
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
                    <p className="font-medium">{profile.location || profile.full_address || 'Not set'}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('location', profile.location || profile.full_address)}
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
                {profile.housing_status === 'looking' ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-600">Budget Range</p>
                        <p className="font-medium">
                          ${profile.budget_min || 0} - ${profile.budget_max || 0}/month
                        </p>
                      </div>
                      <button 
                        onClick={() => handleEdit('budget_min', profile.budget_min)}
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
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-600">House Type</p>
                        <p className="font-medium">{profile.house_type || 'Not set'}</p>
                      </div>
                      <button 
                        onClick={() => handleEdit('house_type', profile.house_type)}
                        className="text-blue-600 text-sm"
                      >
                        ✏️
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-600">Rent per person</p>
                        <p className="font-medium">${profile.budget_max || 0}/month</p>
                      </div>
                      <button 
                        onClick={() => handleEdit('budget_max', profile.budget_max)}
                        className="text-blue-600 text-sm"
                      >
                        ✏️
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-600">Occupancy</p>
                        <p className="font-medium">
                          {profile.current_occupants || 0}/{profile.total_rooms || 0} rooms filled
                        </p>
                      </div>
                      <button 
                        onClick={() => handleEdit('current_occupants', profile.current_occupants)}
                        className="text-blue-600 text-sm"
                      >
                        ✏️
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Lifestyle Preferences */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Lifestyle</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Diet</p>
                    <p className={`font-medium ${!profile.diet ? 'text-gray-400' : ''}`}>
                      {profile.diet || 'Add diet preference...'}
                    </p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Pets</p>
                    <p className={`font-medium ${!profile.pets ? 'text-gray-400' : ''}`}>
                      {profile.pets || 'Add pet preference...'}
                    </p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Sleep Schedule</p>
                    <p className={`font-medium ${!profile.sleep_schedule ? 'text-gray-400' : ''}`}>
                      {profile.sleep_schedule || 'Add sleep schedule...'}
                    </p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Smoking</p>
                    <p className={`font-medium ${!profile.smoking ? 'text-gray-400' : ''}`}>
                      {profile.smoking || 'Add smoking preference...'}
                    </p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Religion</p>
                    <p className={`font-medium ${!profile.religion ? 'text-gray-400' : ''}`}>
                      {profile.religion || 'Add religion...'}
                    </p>
                  </div>
                  <button 
                    onClick={handleEditLifestyle}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Drinking</p>
                    <p className={`font-medium ${!profile.drinking ? 'text-gray-400' : ''}`}>
                      {profile.drinking || 'Add drinking preference...'}
                    </p>
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
                  <p className={`${!profile.background ? 'text-gray-400' : 'text-gray-700'}`}>
                    {profile.background || 'Add a bio to tell potential roommates about yourself...'}
                  </p>
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
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className={`font-medium ${!profile.contact_phone ? 'text-gray-400' : ''}`}>
                      {profile.contact_phone || 'Add phone number...'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleEdit('contact_phone', profile.contact_phone)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className={`font-medium ${!profile.contact_email ? 'text-gray-400' : ''}`}>
                      {profile.contact_email || 'Add email...'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleEdit('contact_email', profile.contact_email)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Instagram</p>
                    <p className={`font-medium ${!profile.contact_instagram ? 'text-gray-400' : ''}`}>
                      {profile.contact_instagram || 'Add Instagram...'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleEdit('contact_instagram', profile.contact_instagram)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Facebook</p>
                    <p className={`font-medium ${!profile.contact_facebook ? 'text-gray-400' : ''}`}>
                      {profile.contact_facebook || 'Add Facebook...'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleEdit('contact_facebook', profile.contact_facebook)}
                    className="text-blue-600 text-sm"
                  >
                    ✏️
                  </button>
                </div>
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
                disabled={loading}
              >
                Cancel
              </button>
              <Button onClick={handleSave} className="flex-1" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
