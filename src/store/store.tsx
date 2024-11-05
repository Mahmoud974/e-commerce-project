import { create } from "zustand";
import { SortDataState, NewDataState } from "../app/types/canape";

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

export const useLikeData = create((set) => ({
  selectedItems: [],
  addItems: (item) => {
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
  removeItems: (itemId) => {
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== itemId),
    }));
  },
  clearItems: () => {
    set({ selectedItems: [] });
  },
}));
