import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  countryCode: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, countryCode }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            {product.price.amount} {product.price.currency}
          </span>
          <a
            href={product.amazonLinks[countryCode]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {t('buyOnAmazon')} <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;