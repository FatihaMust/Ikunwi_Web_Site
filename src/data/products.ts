import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Smart Watch',
    description: 'Advanced fitness tracking with heart rate monitoring and sleep analysis',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    price: {
      amount: 199.99,
      currency: 'EUR'
    },
    amazonLinks: {
      FR: 'https://www.amazon.fr/dp/EXAMPLE1',
      DE: 'https://www.amazon.de/dp/EXAMPLE1',
      IT: 'https://www.amazon.it/dp/EXAMPLE1',
      ES: 'https://www.amazon.es/dp/EXAMPLE1',
      GB: 'https://www.amazon.co.uk/dp/EXAMPLE1'
    }
  },
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    description: 'True wireless earbuds with active noise cancellation and premium sound quality',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    price: {
      amount: 149.99,
      currency: 'EUR'
    },
    amazonLinks: {
      FR: 'https://www.amazon.fr/dp/EXAMPLE2',
      DE: 'https://www.amazon.de/dp/EXAMPLE2',
      IT: 'https://www.amazon.it/dp/EXAMPLE2',
      ES: 'https://www.amazon.es/dp/EXAMPLE2',
      GB: 'https://www.amazon.co.uk/dp/EXAMPLE2'
    }
  }
];