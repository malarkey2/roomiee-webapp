import React, { useState } from 'react';
import { Button } from '../components/Button';

interface BirthdayScreenProps {
  onNext: (birthday: string) => void;
  onBack: () => void;
}

export const BirthdayScreen: React.FC<BirthdayScreenProps> = ({ onNext, onBack }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);

  const handleNext = () => {
    if (month && day && year) {
      const birthday = `${year}-${String(months.indexOf(month) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      onNext(birthday);
    }
  };

  const isValid = month && day && year;

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-4 text-gray-600 hover:text-black transition-colors"
      >
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          When's your birthday?
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Don't worry, we won't gate crash your party. We simply require your age. Your birthday isn't visible on your profile
        </p>

        <div className="flex gap-3 mb-8">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors bg-white appearance-none"
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-24 px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors bg-white appearance-none"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-28 px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors bg-white appearance-none"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
