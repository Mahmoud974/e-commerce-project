export type FabricType = "tissu" | "cuir";

export interface Material {
  id: number;
  name: string;
  type: FabricType;
  description: string;
  care: string;
  image: string;
}

export const materials: Material[] = [
  {
    id: 1,
    name: "Arezzo",
    type: "tissu",
    description: `Arezzo est un tissu à l'aspect lin exclusif de Mario Sirtori, offrant un caractère patiné et une texture délicate. Disponible en beige, marron clair, ocre et vert.`,
    care: `Aspirez régulièrement et nettoyez la surface exposée deux fois par an avec les produits BoConcept. Évitez solvants et humidité excessive.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/8.png",
  },
  {
    id: 27,
    name: "Cuir Nappa",
    type: "cuir",
    description: `Cuir Nappa est un cuir pleine fleur souple et luxueux, au toucher lisse.`,
    care: `Nettoyez délicatement avec un chiffon humide et nourrissez avec un baume tous les 6 mois.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/2.png",
  },
  {
    id: 2,
    name: "Colmar",
    type: "tissu",
    description: `Colmar est un tissu robuste au toucher doux, décliné dans des teintes neutres faciles à intégrer.`,
    care: `Traitez les taches rapidement et effectuez un nettoyage à sec professionnel une fois par an.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/6.png",
  },
  {
    id: 28,
    name: "Cuir Grainé",
    type: "cuir",
    description: `Cuir Grainé présente un grain naturel prononcé pour un effet texturé et sophistiqué.`,
    care: `Essuyez avec un chiffon sec et appliquez un imperméabilisant cuir une fois par an.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/3.png",
  },

  {
    id: 29,
    name: "Cuir Soft",
    type: "cuir",
    description: `Cuir Soft offre une surface lisse et une grande souplesse, idéale pour un confort optimal.`,
    care: `Utilisez un savon spécial cuir et appliquez un conditionneur pour maintenir la souplesse.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/11.png",
  },

  {
    id: 5,
    name: "Orlando",
    type: "tissu",
    description: `Orlando est un velours contemporain avec un aspect légèrement vintage.`,
    care: `Passez un chiffon humide pour enlever les poussières et confiez un nettoyage professionnel si besoin.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/7.png",
  },

  {
    id: 9,
    name: "Bresso",
    type: "tissu",
    description: `Bresso est un coton lavé au toucher naturel et doux.`,
    care: `Nettoyage à sec professionnel pour conserver la souplesse du tissu.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/12%20(1).png",
  },

  {
    id: 15,
    name: "Frisco",
    type: "tissu",
    description: `Frisco combine durabilité et confort avec un motif subtil.`,
    care: `Nettoyage à sec professionnel.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/15%20(1).png",
  },
  {
    id: 16,
    name: "Tomelilla",
    type: "tissu",
    description: `Tomelilla est un chenille légère aux couleurs pastel.`,
    care: `Nettoyage humide léger et brossage doux.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/2.png",
  },
  {
    id: 17,
    name: "Avellino",
    type: "tissu",
    description: `Avellino est un jacquard à motifs géométriques sophistiqués.`,
    care: `Nettoyage à sec et entretien professionnel.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/16.png",
  },

  {
    id: 22,
    name: "Estoril",
    type: "tissu",
    description: `Estoril est un lin haut de gamme tissé en Italie.`,
    care: `Nettoyage à sec et repassage à basse température.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/4.png",
  },
];
