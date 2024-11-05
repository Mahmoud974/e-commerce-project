import { create } from "zustand";

export const useNewData = create((set) => ({
  filteredData: [],

  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter((item) =>
      item.nom.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );
    set(() => ({
      filteredData: filtered,
    }));
  },
}));
