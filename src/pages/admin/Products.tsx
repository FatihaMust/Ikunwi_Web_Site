import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Product, ProductForm as IProductForm } from '../../types/product';
import ProductForm from '../../components/admin/ProductForm';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash } from 'lucide-react';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    setProducts(productsData);
  };

  const handleSubmit = async (data: IProductForm) => {
    try {
      const imageRef = ref(storage, `products/${Date.now()}_${data.mainImage?.name}`);
      const imageSnapshot = await uploadBytes(imageRef, data.mainImage as File);
      const imageUrl = await getDownloadURL(imageSnapshot.ref);

      const galleryUrls = await Promise.all(
        data.gallery.map(async (file) => {
          const galleryRef = ref(storage, `products/gallery/${Date.now()}_${file.name}`);
          const gallerySnapshot = await uploadBytes(galleryRef, file);
          return getDownloadURL(gallerySnapshot.ref);
        })
      );

      let videoUrl = null;
      if (data.video) {
        const videoRef = ref(storage, `products/videos/${Date.now()}_${data.video.name}`);
        const videoSnapshot = await uploadBytes(videoRef, data.video);
        videoUrl = await getDownloadURL(videoSnapshot.ref);
      }

      let manualUrl = null;
      if (data.manual) {
        const manualRef = ref(storage, `products/manuals/${Date.now()}_${data.manual.name}`);
        const manualSnapshot = await uploadBytes(manualRef, data.manual);
        manualUrl = await getDownloadURL(manualSnapshot.ref);
      }

      const productData = {
        name: data.name,
        description: data.description,
        image: imageUrl,
        galleryUrls,
        videoUrl,
        manualUrl,
        price: data.price,
        amazonLinks: data.amazonLinks,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }

      await loadProducts();
      setIsAddingProduct(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm(t('admin.confirmDelete'))) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        await loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('admin.products')}
        </h1>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('admin.addProduct')}
        </button>
      </div>

      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editingProduct ? t('admin.editProduct') : t('admin.addProduct')}
            </h2>
            <ProductForm
              onSubmit={handleSubmit}
              initialData={editingProduct || undefined}
            />
            <button
              onClick={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('admin.cancel')}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-1 text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;