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
//Changer coleur, mettre en croissant et décroissant

export const useSortdata = create<any>((set) => ({
  dbSofa: [],
  filteredDataColor: [],
  sortData: [],
  valueBoolean: false,
  dbBase: (db) => {
    set({ dbSofa: db });
  },
  setFilteredDataColor: (db, colorName) => {
    set((state) => {
      const isColorSelected = state.filteredDataColor.some(
        (item) => item.color.toLowerCase() === colorName.toLowerCase()
      );

      if (isColorSelected) {
        // Si la couleur est déjà sélectionnée, on l'enlève
        const filteredData = state.filteredDataColor.filter(
          (item) => item.color.toLowerCase() !== colorName.toLowerCase()
        );
        return { filteredDataColor: filteredData };
      } else {
        // Sinon, on l'ajoute aux résultats filtrés
        const newFilteredData =
          db &&
          db.filter(
            (item) => item.color.toLowerCase() === colorName.toLowerCase()
          );
        return {
          filteredDataColor: [...state.filteredDataColor, ...newFilteredData],
        };
      }
    });
  },

  //Changer le prix en croissant ou decroissant
  setSortData: async (db) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simule un délai de 1 seconde

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

/**
 * Afficher les résultats de recherche via la barre de recherche
 */
export const useSearchArticles = create<NewDataState>((set) => ({
  filteredData: [],
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
}));
