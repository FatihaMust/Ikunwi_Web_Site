import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SocialMedia: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/ikunwi',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/ikunwi',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/ikunwi',
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/ikunwi',
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {t('followUs')}
        </h2>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 transition-colors duration-200 ${social.color}`}
              aria-label={social.name}
            >
              <social.icon className="h-8 w-8" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;