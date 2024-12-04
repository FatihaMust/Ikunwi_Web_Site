export interface ProductForm {
  name: string;
  description: string;
  mainImage: File | null;
  gallery: File[];
  video: File | null;
  manual: File | null;
  price: {
    amount: number;
    currency: string;
  };
  amazonLinks: {
    [key: string]: string;
  };
}

export interface Product extends Omit<ProductForm, 'mainImage' | 'gallery' | 'video' | 'manual'> {
  id: string;
  image: string;
  galleryUrls: string[];
  videoUrl?: string;
  manualUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}