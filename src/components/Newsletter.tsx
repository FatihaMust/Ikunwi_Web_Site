import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NewsletterForm {
  email: string;
}

const Newsletter: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterForm>();

  const onSubmit = async (data: NewsletterForm) => {
    try {
      // TODO: Implement newsletter subscription logic
      console.log('Newsletter subscription:', data);
      reset();
      alert(t('newsletterSuccess'));
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert(t('newsletterError'));
    }
  };

  return (
    <section className="bg-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('newsletter')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('subscribePrompt')}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <div className="flex-grow relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{t('invalidEmail')}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('subscribe')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;