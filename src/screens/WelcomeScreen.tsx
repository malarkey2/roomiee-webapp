import React from 'react';
import { Button } from '../components/Button';

interface WelcomeScreenProps {
  onNewUser: () => void;
  onReturningUser: () => void;
  onBack?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNewUser, onReturningUser, onBack }) => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      {onBack && (
        <button 
          onClick={onBack}
          className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
        >
          ← Back
        </button>
      )}
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <img 
              src="/assets/logo.png" 
              alt="Roomie Logo" 
              className="w-48 h-48 mx-auto mb-2 object-contain"
            />
            <p className="text-gray-600">Find your perfect roommate match</p>
          </div>

          <div className="space-y-4">
            <Button onClick={onNewUser} className="w-full">
              I'm new here
            </Button>
            
            <button
              onClick={onReturningUser}
              className="w-full text-center text-gray-600 hover:text-black transition-colors"
            >
              I already have an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
