import { create } from "zustand";
import {
  SortDataState,
  NewDataState,
  LikeDataState,
  Item,
} from "../app/types/canape";

type CartState = {
  items: Item[]; // Liste des articles dans le panier
  addItem: (item: Item) => void; // Ajouter un article au panier
  removeItem: (itemId: number) => void; // Retirer un article du panier
  clearCart: () => void; // Vider le panier
  updateQuantity: (itemId: number, quantity: number) => void; // Mettre à jour la quantité d'un article
};

/**
 * Afficher les résultats de recherche
 */
export const useNewData = create<NewDataState>((set) => ({
  filteredData: [],
  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter((item) =>
      item.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set(() => ({
      filteredData: filtered,
    }));
  },
}));

/**
 * Trier les éléments croissant & décroissant
 */
export const useSortData = create<SortDataState>((set) => ({
  sortData: [],
  valueBoolean: false,

  setSortData: (db) => {
    set((state) => {
      const sorted = [...db].sort((a, b) =>
        state.valueBoolean ? b.prix - a.prix : a.prix - b.prix
      );
      return { sortData: sorted };
    });
  },

  toggleSortOrder: () =>
    set((state) => ({ valueBoolean: !state.valueBoolean })),
}));

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
