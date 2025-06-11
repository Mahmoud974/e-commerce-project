import { create } from 'zustand';

type CurrencyStore = {
  // Taux de conversion (par rapport à l'EUR)
  rates: {
    EUR: number;
    GBP: number;
  };
  // Fonction pour convertir un prix
  convertPrice: (price: number, currency: string) => number;
};

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  rates: {
    EUR: 1,
    GBP: 0.85, // 1 EUR = 0.85 GBP (approximativement)
  },
  convertPrice: (price: number, currency: string) => {
    const { rates } = get();
    if (currency === 'EUR') return price;
    if (currency === 'GBP') return +(price * rates.GBP).toFixed(2);
    return price;
  },
}));