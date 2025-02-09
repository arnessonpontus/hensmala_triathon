import { useState, useEffect } from 'react';
import { localStorageService } from '../../../services/localstorageService';
import { getProducts } from '../service/priceService';
import { productType, ProductWithExpandedPrice } from '../models';
import { useErrorModal } from '../../../context/ErrorModalContext';
import { oreToSek } from '../utils';

const useProducts = () => {
  const [products, setProducts] = useState<ProductWithExpandedPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const cachedProducts = localStorageService.get('products');
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
        } else {
          const data = await getProducts();
          localStorageService.set('products', JSON.stringify(data));
          setProducts(data);
        }
      } catch (err) {
        setError("Could not get products");
        showErrorModal("Vissa produkter kunde inte hämtas och kan visas fel. Gå vidare till betalning för att se de uppdaterade priserna.", "Kunde inte hämta produkter")
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductByName = (pruductName: productType): ProductWithExpandedPrice | null => {
    const product = products.find(p => p.metadata.data_id === pruductName);
    if (loading) {
      return null;
    }

    if (error || !product || !products) {
      console.error("Could not get product by name", { error, product, products })
      return null;
    }
    return product;
  }

  const getPriceByProductName = (pruductName: productType): number | null => {
    const product = getProductByName(pruductName)

    if (!product || product.default_price?.unit_amount == null) {
      return null;
    }

    return oreToSek(product.default_price.unit_amount);
  }
  
  return { products, loading, error, getProductByName, getPriceByProductName };
};

export default useProducts;
