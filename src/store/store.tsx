import { create } from "zustand";
import {
  SortDataState,
  NewDataState,
  LikeDataState,
  Item,
} from "../app/types/canape";

type CartState = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
};

export const useLikeData = create<LikeDataState>((set) => ({
  selectedItems: [],
  addItems: (item: Item) => {
    set((state) => {
      if (
        state.selectedItems.some((existingItem) => existingItem.id === item.id)
      ) {
        console.log(`L'item avec l'id ${item.id} est déjà dans la liste.`);
        return state;
      }
      const newItems = [...state.selectedItems, item];
      console.log(newItems);
      return { selectedItems: newItems };
    });
  },
  removeItems: (itemId: any) => {
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== itemId),
    }));
  },
  clearItems: () => {
    set({ selectedItems: [] });
  },
}));

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item: Item) => {
    set((state) => {
      const itemExists = state.items.find(
        (existingItem) => existingItem.id === item.id
      );
      if (itemExists) {
        console.log(`L'article avec l'id ${item.id} est déjà dans le panier.`);
        return state;
      }

      return { items: [...state.items, item] };
    });
  },
  removeItem: (itemId: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  updateQuantity: (itemId: number, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },
}));

/**
 * Afficher les résultats de recherche via la barre de recherche
 */
export const useSearchArticles = create<any>((set) => ({
  filteredData: [],
  //Triez les éléments
  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter(
      (item) =>
        item.nom.toLowerCase() &&
        item.nom.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    set(() => ({
      filteredData: filtered,
    }));
  },
  croissantArticles: (db) => {
    const newTab = [...db]?.sort((a, b) => a.prix - b.prix);
    set(() => ({ filteredData: newTab }));
    console.log("Tri croissant appliqué :", newTab);
  },
  decroissantArticles: (db) => {
    const newTab = [...db]?.sort((a, b) => b.prix - a.prix);
    set(() => ({ filteredData: newTab }));
    console.log("Tri décroissant appliqué :", newTab);
  },
  pertinenceArticles: (db) => {
    set(() => ({ filteredData: [...db] }));
    console.log("Tri par pertinence appliqué :", db);
  },

  //Triez en fonction des coleurs
  colorsArticles: (db, color) => {
    const newTab = [...db]?.filter(
      (item) => item.color === color.toLowerCase()
    );
    console.log(newTab);

    set(() => ({ filteredData: newTab }));
  },
}));
