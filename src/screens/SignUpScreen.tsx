import React, { useState } from 'react';
import { Button } from '../components/Button';

interface SignUpScreenProps {
  onEmailSignUp: (email: string, password: string) => void;
  onGoogleSignUp: () => void;
  onBack: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ 
  onEmailSignUp, 
  onGoogleSignUp, 
  onBack 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialOrNumber = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  
  const isPasswordValid = hasMinLength && hasUpperCase && hasSpecialOrNumber && passwordsMatch;

  const handleEmailSignUp = () => {
    if (email.trim() && isPasswordValid) {
      onEmailSignUp(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2 text-black text-center">
          Create your account
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Sign up to start finding roommates
        </p>

        {/* Google Sign Up */}
        <button
          onClick={onGoogleSignUp}
          className="w-full mb-4 px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 font-medium"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
            <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
            <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email/Password Sign Up */}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
          />

          {/* Password requirements */}
          {password.length > 0 && (
            <div className="text-sm space-y-1">
              <div className={hasMinLength ? 'text-green-600' : 'text-gray-500'}>
                {hasMinLength ? '✓' : '○'} At least 8 characters
              </div>
              <div className={hasUpperCase ? 'text-green-600' : 'text-gray-500'}>
                {hasUpperCase ? '✓' : '○'} At least 1 uppercase letter
              </div>
              <div className={hasSpecialOrNumber ? 'text-green-600' : 'text-gray-500'}>
                {hasSpecialOrNumber ? '✓' : '○'} At least 1 number or special character
              </div>
              {confirmPassword.length > 0 && (
                <div className={passwordsMatch ? 'text-green-600' : 'text-red-600'}>
                  {passwordsMatch ? '✓' : '✗'} Passwords match
                </div>
              )}
            </div>
          )}

          <Button 
            onClick={handleEmailSignUp}
            disabled={!email.trim() || !isPasswordValid}
            className="w-full"
          >
            Sign Up with Email
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button className="text-black font-medium hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
