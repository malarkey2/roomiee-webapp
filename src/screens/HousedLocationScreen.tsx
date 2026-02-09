import React, { useState, useMemo } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import cityTimezones from 'city-timezones';

interface HousedLocationScreenProps {
  onNext: (address: string) => void;
  onBack: () => void;
}

export const HousedLocationScreen: React.FC<HousedLocationScreenProps> = ({ onNext, onBack }) => {
  const [address, setAddress] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Get all unique city names
  const allCities = useMemo(() => {
    const cities = cityTimezones.cityMapping.map(city => 
      `${city.city}, ${city.country}`
    );
    return [...new Set(cities)].sort();
  }, []);

  const handleInputChange = (value: string) => {
    setAddress(value);
    
    if (value.trim().length > 0) {
      const matches = allCities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setFilteredCities(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city: string) => {
    setAddress(city);
    setShowDropdown(false);
  };

  const handleNext = () => {
    if (address.trim()) {
      onNext(address.trim());
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

      <ProgressBar currentStep={3} totalSteps={8} />
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          Where are you housed?
        </h1>
        <p className="text-gray-600 mb-8">
          Tell us the name of your city/town
        </p>
        
        <div className="relative mb-6">
          <input
            type="text"
            value={address}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => address && setShowDropdown(true)}
            placeholder="Start typing a city..."
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
          />
          
          {showDropdown && filteredCities.length > 0 && (
            <div className="absolute w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
              {filteredCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectCity(city)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!address.trim()}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
