import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en';
import fr from './translations/fr';
import de from './translations/de';
import es from './translations/es';
import it from './translations/it';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      fr,
      de,
      es,
      it
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage']
    }
  });

export default i18n;