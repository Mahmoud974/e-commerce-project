import { create } from "zustand";

interface SearchArticlesState {
  filteredData: any[];
  selectedColors: string[];
  selectedSeats: number[];
  nbreSeatColor: number;
  setSelectedColors: (colors: string[]) => void;
  setSelectedSeats: (seats: number[]) => void;
  setFilteredData: (db: any[], searchTerm: string) => void;
  croissantArticles: () => void;
  decroissantArticles: () => void;
  pertinenceArticles: (db: any[]) => void;
  colorsArticles: (allData: any[], selectedColors: string[]) => void;
  numberSeatArticles: (allData: any[], selectedSeats: number[]) => void;
  priceRangeArticles: (allData: any[], range: [number, number]) => void;
}

export const useSearchArticles = create<SearchArticlesState>((set, get) => ({
  filteredData: [],
  selectedColors: [],
  selectedSeats: [],
  nbreSeatColor: 0,

  setSelectedColors: (colors) => set({ selectedColors: colors }),
  setSelectedSeats: (seats) => set({ selectedSeats: seats }),

  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    set(() => ({ filteredData: filtered }));
  },

  croissantArticles: () => {
    set((state) => ({
      filteredData: [...state.filteredData].sort((a, b) => a.price - b.price),
    }));
  },

  decroissantArticles: () => {
    set((state) => ({
      filteredData: [...state.filteredData].sort((a, b) => b.price - a.price),
    }));
  },

  pertinenceArticles: (db) => {
    set(() => ({ filteredData: [...db] }));
  },

  colorsArticles: (allData, selectedColors) => {
    set(() => {
      if (!Array.isArray(allData)) return { filteredData: [] };
      const newTab = [...allData].filter(
        (item) =>
          item.color &&
          selectedColors
            .map((color) => color.toLowerCase())
            .includes(item.color.toLowerCase())
      );
      return { filteredData: newTab };
    });
  },

  numberSeatArticles: (allData, selectedSeats) => {
    set(() => {
      if (!Array.isArray(allData)) return { filteredData: [] };
      const newTab = [...allData].filter((item) =>
        selectedSeats.includes(item.seat)
      );
      return { filteredData: newTab };
    });
  },
  priceRangeArticles: (allData, [min, max]) => {
    set(() => {
      if (!Array.isArray(allData)) return { filteredData: [] };
      const newTab = allData.filter(
        (item) => item.price >= min && item.price <= max
      );
      return { filteredData: newTab };
    });
  },
}));
