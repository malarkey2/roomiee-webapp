import React, { useState } from 'react';

interface NotificationsScreenProps {
  onBack: () => void;
}

interface Match {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  housingStatus: 'housed' | 'looking';
  houseType?: string;
  budget: number;
  totalRooms?: number;
  currentOccupants?: number;
  moveInDate?: string;
  diet?: string;
  pets?: string;
  sleepSchedule?: string;
  smoking?: string;
  background: string;
  photo?: string;
  timestamp: string;
}

// Mock data - will be replaced with real data from database
const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 24,
    gender: 'Woman',
    location: 'Durham, NC',
    housingStatus: 'looking',
    budget: 800,
    moveInDate: '2026-03-01',
    diet: 'Vegetarian',
    pets: 'No pets',
    sleepSchedule: 'Night owl',
    smoking: 'Non-smoker',
    background: 'Recent grad working in tech. Love hiking and board games!',
    timestamp: '2 hours ago',
  },
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const badges = (match: Match) => {
    const result = [];
    if (match.diet) result.push({ icon: '🌱', label: match.diet });
    if (match.pets) {
      const icon = match.pets === 'Have pets' ? '🐕' : '✅🐾';
      result.push({ icon, label: match.pets });
    }
    if (match.sleepSchedule) {
      const icon = match.sleepSchedule.includes('Early') ? '🌅' : '🌙';
      result.push({ icon, label: match.sleepSchedule });
    }
    if (match.smoking === 'Non-smoker') result.push({ icon: '🚭', label: 'Non-smoker' });
    return result.slice(0, 4);
  };

  if (selectedMatch) {
    const displayBadges = badges(selectedMatch);
    const moveInDate = selectedMatch.moveInDate 
      ? new Date(selectedMatch.moveInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : null;

    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 flex-shrink-0 border-b border-gray-200">
          <button 
            onClick={() => setSelectedMatch(null)}
            className="text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Matches
          </button>
        </div>

        {/* Profile Card - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="max-w-md mx-auto pb-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6 mt-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">
                  {selectedMatch.gender === 'Woman' ? '👩' : selectedMatch.gender === 'Man' ? '👨' : '🧑'}
                </span>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold">{selectedMatch.name}</h2>
                <p className="text-gray-600">
                  {selectedMatch.gender} | {selectedMatch.age} | {selectedMatch.location}
                </p>
              </div>
            </div>

            {/* Housing Info */}
            <div className="bg-gray-100 rounded-2xl p-4 mb-6">
              {selectedMatch.housingStatus === 'housed' ? (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🏠</span>
                        <span className="font-semibold text-sm">Housed | {selectedMatch.houseType}</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-7">
                        {selectedMatch.currentOccupants}/{selectedMatch.totalRooms} occupied
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-lg">📍</span>
                        <span className="font-semibold text-sm">{selectedMatch.location}</span>
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
                      <p className="font-semibold text-sm">${selectedMatch.budget}/month</p>
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
                        Budget: ${selectedMatch.budget}/month
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
                      <p className="font-semibold text-sm">{selectedMatch.location}</p>
                    </div>
                  </div>
                </>
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

            {/* Background */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">My Background</h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedMatch.background}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 flex-shrink-0 border-b border-gray-200">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-black transition-colors"
        >
          ← Back to Swiping
        </button>
        <h1 className="text-2xl font-bold mt-4">Matches</h1>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-4">
          {MOCK_MATCHES.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2">No matches yet</p>
              <p className="text-sm text-gray-500">Keep swiping to find your perfect roommate!</p>
            </div>
          ) : (
            MOCK_MATCHES.map((match) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className="w-full p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">
                      {match.gender === 'Woman' ? '👩' : match.gender === 'Man' ? '👨' : '🧑'}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg">{match.name}</h3>
                      <span className="text-xs text-gray-500">{match.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {match.age} • {match.location}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {match.housingStatus === 'housed' ? '🏠 Has a place' : '🔍 Looking'}
                    </p>
                  </div>

                  <div className="text-gray-400">
                    →
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
