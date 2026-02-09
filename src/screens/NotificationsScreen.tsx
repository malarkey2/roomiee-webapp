import React from 'react';

interface NotificationsScreenProps {
  onBack: () => void;
}

// Mock notifications - people who swiped right on you
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 24,
    gender: 'Woman',
    location: 'Durham, NC',
    swipedAt: '2 hours ago',
    contactInfo: {
      phone: '(555) 234-5678',
      email: 'sarah.j@email.com',
      instagram: '@sarahjohnson',
    },
  },
  {
    id: '2',
    name: 'Marcus Williams',
    age: 27,
    gender: 'Man',
    location: 'Durham, NC',
    swipedAt: '1 day ago',
    contactInfo: {
      instagram: '@marcuswill',
      email: 'marcus.w@email.com',
    },
  },
  {
    id: '3',
    name: 'Emily Chen',
    age: 22,
    gender: 'Woman',
    location: 'Durham, NC',
    swipedAt: '3 days ago',
    contactInfo: {
      phone: '(555) 876-5432',
      facebook: 'facebook.com/emilychen',
    },
  },
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 flex-shrink-0 border-b border-gray-200">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-black transition-colors"
        >
          ← Back to Swiping
        </button>
        <h1 className="text-2xl font-bold mt-4">Notifications</h1>
        <p className="text-gray-600 text-sm mt-1">People who swiped right on you</p>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-md mx-auto">
          {MOCK_NOTIFICATIONS.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No notifications yet</p>
              <p className="text-gray-500 text-sm mt-2">Keep swiping to find matches!</p>
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              {MOCK_NOTIFICATIONS.map((notification) => (
                <div 
                  key={notification.id}
                  className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {notification.gender === 'Woman' ? '👩' : '👨'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{notification.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {notification.gender} | {notification.age} | {notification.location}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{notification.swipedAt}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Contact Info:</p>
                    <div className="space-y-1">
                      {notification.contactInfo.phone && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">📞</span>
                          <a 
                            href={`tel:${notification.contactInfo.phone}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {notification.contactInfo.phone}
                          </a>
                        </div>
                      )}
                      {notification.contactInfo.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">✉️</span>
                          <a 
                            href={`mailto:${notification.contactInfo.email}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {notification.contactInfo.email}
                          </a>
                        </div>
                      )}
                      {notification.contactInfo.instagram && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">📸</span>
                          <a 
                            href={`https://instagram.com/${notification.contactInfo.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {notification.contactInfo.instagram}
                          </a>
                        </div>
                      )}
                      {notification.contactInfo.facebook && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">💬</span>
                          <a 
                            href={`https://${notification.contactInfo.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Facebook
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
