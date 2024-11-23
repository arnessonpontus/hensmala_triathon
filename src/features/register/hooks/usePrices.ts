import { useState, useEffect } from 'react';
import { localStorageService } from '../service/localstorageService';
import { getPrices } from '../service/priceService';
import { priceType } from '../models';
import { getPriceId } from '../../../../netlify/functions/payment/pricing';
import { useErrorModal } from '../../../context/ErrorModalContext';

const usePrices = () => {
  const [prices, setPrices] = useState<Record<string, number>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const cachedPrices = localStorageService.get('prices');
        if (cachedPrices) {
          setPrices(JSON.parse(cachedPrices));
        } else {
          const data = await getPrices();
          localStorageService.set('prices', JSON.stringify(data));
          setPrices(data);
        }
      } catch (err) {
        setError("Could not get prices");
        showErrorModal("Vissa kunde inte hämtas och kan visas fel. Gå vidare till betalning för att de de uppdaterade priserna.", "Kunde inte hämta priser")
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getPriceByName = (priceName: priceType): number | null => {
    const priceId = getPriceId(priceName);
    if (error || !priceId || !prices) {
      return null;
    }
    return prices[priceId];
  }

  return { prices, loading, error, getPriceByName};
};

export default usePrices;
