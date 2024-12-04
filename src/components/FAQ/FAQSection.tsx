import React from 'react';
import { useTranslation } from 'react-i18next';
import FAQItem from './FAQItem';

const FAQSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faq.title')}</h2>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <FAQItem
            key={index}
            question={t(`faq.q${index + 1}`)}
            answer={t(`faq.a${index + 1}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;