import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Globe, Heart } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: ShoppingBag,
      title: t('about.feature1.title'),
      description: t('about.feature1.description')
    },
    {
      icon: Globe,
      title: t('about.feature2.title'),
      description: t('about.feature2.description')
    },
    {
      icon: Heart,
      title: t('about.feature3.title'),
      description: t('about.feature3.description')
    }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;