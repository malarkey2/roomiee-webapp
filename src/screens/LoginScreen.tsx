import React, { useState } from 'react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

interface LoginScreenProps {
  onLogin: () => void;
  onBack: () => void;
  onSignUp: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (signInError) throw signInError;
    } catch (err: any) {
      setError(err.message || 'An error occurred with Google sign in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
        disabled={loading}
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          Welcome back
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Sign in to continue finding roommates
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              disabled={loading}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Connecting...' : 'Continue with Google'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <button 
            onClick={onSignUp}
            className="text-black font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};
