import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { countries } from '../data/countries';

export const useLocalization = () => {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const detectUserCountry = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to get country from browser's language settings first
      const browserLang = navigator.language || (navigator as any).userLanguage;
      const browserCountry = browserLang.split('-')[1];
      
      if (browserCountry) {
        const country = countries.find(c => c.code === browserCountry.toUpperCase());
        if (country) {
          i18n.changeLanguage(country.language);
          setIsLoading(false);
          return country.code;
        }
      }

      // Fallback to a reliable, free geolocation API
      const response = await fetch('https://api.db-ip.com/v2/free/self', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const countryCode = data.countryCode;

      if (countryCode) {
        const country = countries.find(c => c.code === countryCode);
        if (country) {
          i18n.changeLanguage(country.language);
          setIsLoading(false);
          return country.code;
        }
      }

      // If no country detected or not supported, default to France
      console.log('Defaulting to France');
      i18n.changeLanguage('fr');
      setIsLoading(false);
      return 'FR';

    } catch (error) {
      console.error('Error detecting country:', error);
      // Default to France in case of any error
      i18n.changeLanguage('fr');
      setIsLoading(false);
      return 'FR';
    }
  }, [i18n]);

  const changeCountry = useCallback((countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      i18n.changeLanguage(country.language);
    }
  }, [i18n]);

  useEffect(() => {
    detectUserCountry();
  }, [detectUserCountry]);

  return {
    t,
    currentLanguage: i18n.language,
    changeCountry,
    detectUserCountry,
    isLoading
  };
};