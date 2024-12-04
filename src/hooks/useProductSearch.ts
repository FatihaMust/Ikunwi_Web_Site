import { useMemo } from 'react';
import { Product } from '../types';

export const useProductSearch = (products: Product[], searchQuery: string) => {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);
};