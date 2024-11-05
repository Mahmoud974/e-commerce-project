export interface Canape {
  id: number;
  nom: string;
  description: string;
  prix: number;
  couleur: string[]; // tableau de chaînes pour les couleurs
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
};

export type NewDataState = {
  filteredData: Item[];
  setFilteredData: (db: Item[], searchTerm: string) => void;
};

export type SortDataState = {
  sortData: Item[];
  valueBoolean: boolean;
  setSortData: (db: Item[]) => void;
  toggleSortOrder: () => void;
};
