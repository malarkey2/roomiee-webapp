import React from 'react';
import { Button } from '../components/Button';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-8 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold">ROOMIE</div>
        <div className="flex items-center gap-8">
          <button 
            onClick={scrollToFeatures}
            className="text-gray-600 hover:text-black transition-colors"
          >
            Features
          </button>
          <Button onClick={onGetStarted} className="px-6 py-2">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Roommate Easily
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your roommate search with compatible matches based on lifestyle, preferences, and housing needs.
            </p>
            <div className="flex gap-4">
              <Button onClick={onGetStarted} className="px-8 py-4 text-lg">
                Get Started
              </Button>
              <button 
                onClick={scrollToFeatures}
                className="px-8 py-4 text-lg border-2 border-gray-300 rounded-xl font-medium hover:border-black transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full aspect-square flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-8xl mb-4">🏠</div>
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    👨
                  </div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    👩
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-sm">It's a Match!</p>
                      <p className="text-xs text-gray-600">You found a compatible roommate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Roomie?</h2>
            <p className="text-xl text-gray-600">Everything you need to find the perfect living situation</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect with Roommates</h3>
              <p className="text-gray-600 leading-relaxed">
                Find and connect with the people you'll be living with. Chat, share interests, and build relationships before moving in together.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Match Preferences</h3>
              <p className="text-gray-600 leading-relaxed">
                Filter by diet, gender, allergies, cleanliness, sleep schedule (morning/night owl), and more to find truly compatible roommates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Safe & Low Stakes</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse anonymously, share contact info only when you match, and take your time finding the right fit. No pressure, just connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Roommate?</h2>
        <p className="text-xl text-gray-600 mb-8">Join thousands of people finding their ideal living situation</p>
        <Button onClick={onGetStarted} className="px-12 py-5 text-xl">
          Get Started Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-8 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <p>© 2026 Roomie. All rights reserved.</p>
          <div className="flex gap-8">
            <button className="hover:text-black transition-colors">Privacy Policy</button>
            <button className="hover:text-black transition-colors">Terms of Service</button>
            <button className="hover:text-black transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
