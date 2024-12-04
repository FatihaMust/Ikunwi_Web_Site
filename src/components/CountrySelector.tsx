import React from 'react';
import { countries } from '../data/countries';
import { useLocalization } from '../hooks/useLocalization';

const CountrySelector: React.FC<{ onCountryChange: (code: string) => void }> = ({ onCountryChange }) => {
  const { currentLanguage } = useLocalization();
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(event.target.value);
  };

  const currentCountry = countries.find(country => country.language === currentLanguage) || countries[0];

  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={currentCountry.code}
        onChange={handleChange}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;