import React from 'react';
import { Menu } from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization';
import CountrySelector from './CountrySelector';

interface HeaderProps {
  onCountryChange: (code: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCountryChange }) => {
  const { t } = useLocalization();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Ikunwi</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#products" className="text-gray-700 hover:text-indigo-600">
              {t('products')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600">
              {t('about')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600">
              {t('contact')}
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <CountrySelector onCountryChange={onCountryChange} />
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;