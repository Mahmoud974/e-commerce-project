import { Like } from "@prisma/client";

export interface Canape {
  id: number;
  nom: string;
  description: string;
  price: number;
  couleur: string[];
  largeur: string;
  profondeur: string;
  hauteur: string;
  disponibilite: boolean;
  image: string;
}

export type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  largeur: string;
  profondeur: string;
  hauteur: string;
  disponibilite: boolean;
  image: string[];
  color: string;
  seat: number;
  reference: string;
  quantity: number;
  miniDescription: string[];
  fabricType: string;
  brand: string;
  ecoMobilier: number;
  likes: Like[];
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
