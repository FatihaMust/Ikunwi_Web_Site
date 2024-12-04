import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { products } from '../data/products';
import { useProductSearch } from '../hooks/useProductSearch';
import { useLocalization } from '../hooks/useLocalization';

interface ProductGridProps {
  countryCode: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ countryCode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = useProductSearch(products, searchQuery);
  const { detectUserCountry, isLoading } = useLocalization();
  const [userCountry, setUserCountry] = useState(countryCode);

  useEffect(() => {
    const initializeCountry = async () => {
      const detectedCountry = await detectUserCountry();
      setUserCountry(detectedCountry);
    };
    initializeCountry();
  }, [detectUserCountry]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            countryCode={userCountry}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;