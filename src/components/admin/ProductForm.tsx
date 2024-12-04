import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProductForm as IProductForm } from '../../types/product';
import { useTranslation } from 'react-i18next';
import { Upload, X } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  mainImage: z.any(),
  gallery: z.array(z.any()),
  video: z.any().nullable(),
  manual: z.any().nullable(),
  price: z.object({
    amount: z.number().min(0),
    currency: z.string()
  }),
  amazonLinks: z.record(z.string().url())
});

interface ProductFormProps {
  onSubmit: (data: IProductForm) => Promise<void>;
  initialData?: Partial<IProductForm>;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IProductForm>({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });

  const handleFormSubmit = async (data: IProductForm) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('admin.productName')}
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('admin.description')}
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('admin.mainImage')}
        </label>
        <input
          type="file"
          accept="image/*"
          {...register('mainImage')}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('admin.gallery')}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          {...register('gallery')}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('admin.video')}
        </label>
        <input
          type="file"
          accept="video/*"
          {...register('video')}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('admin.manual')}
        </label>
        <input
          type="file"
          accept=".pdf"
          {...register('manual')}
          className="mt-1 block w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('admin.price')}
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price.amount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('admin.currency')}
          </label>
          <select
            {...register('price.currency')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {t('admin.saveProduct')}
      </button>
    </form>
  );
};

export default ProductForm;