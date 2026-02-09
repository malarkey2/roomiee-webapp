import React from 'react';
import { Button } from '../components/Button';

interface WelcomeScreenProps {
  onNewUser: () => void;
  onReturningUser: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNewUser, onReturningUser }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo placeholder */}
        <div className="w-16 h-16 mx-auto mb-8 border-2 border-black rounded-full flex items-center justify-center">
          <span className="text-2xl">R</span>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-3 text-black">Roomie</h1>
        <p className="text-center text-gray-600 mb-12">
          Find your perfect roommate match
        </p>
        
        <div className="space-y-3">
          <Button onClick={onNewUser} className="w-full">
            I'm new here
          </Button>
          <button 
            onClick={onReturningUser}
            className="w-full py-4 text-gray-600 hover:text-black transition-colors font-medium"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  );
};
