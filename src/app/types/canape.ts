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
