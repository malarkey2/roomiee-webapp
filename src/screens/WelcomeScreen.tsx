import React from 'react';
import { Button } from '../components/Button';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
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
        
        <Button onClick={onNext} className="w-full !bg-black !text-white hover:!bg-gray-800">
          Get Started
        </Button>
      </div>
    </div>
  );
};
