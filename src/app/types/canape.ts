export interface Canape {
  id: number;
  nom: string;
  description: string;
  prix: number;
  couleur: string[];
  largeur: string;
  profondeur: string;
  hauteur: string;
  disponibilite: boolean;
  image: string;
}

export type Item = {
  id: number;
  nom: string;
  prix: number;
  color: string;
  seat: number;
};

export type NewDataState = {
  filteredData: Item[];
  setFilteredData: (db: Item[], searchTerm: string) => void;
};

export type SortDataState = {
  sortData: any;
  valueBoolean: boolean;
  setSortData: (db: Item[]) => void;
  toggleSortOrder: () => void;
};

export interface LikeDataState {
  selectedItems: Item[];
  addItems: (item: Item) => void;
  removeItems: (itemId: number | string) => void;
  clearItems: () => void;
}
