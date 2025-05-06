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
    id: 3,
    name: "Copenhagen",
    type: "tissu",
    description: `Copenhagen propose une texture bouclée inspirée du style scandinave, chaude et confortable.`,
    care: `Utilisez un aspirateur à brosse douce et évitez le soleil direct.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/10.png",
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
    id: 4,
    name: "Lucca",
    type: "tissu",
    description: `Lucca est un tissage jacquard raffiné, apportant relief et élégance.`,
    care: `Nettoyage à sec recommandé et brossage doux pour préserver le relief.`,
    image: "/images/lucca.jpg",
  },
  {
    id: 30,
    name: "Cuir Vintage",
    type: "cuir",
    description: `Cuir Vintage vieilli naturellement, apportant authenticité et caractère à votre mobilier.`,
    care: `Nettoyez avec un chiffon doux et entretenez régulièrement avec une cire neutre.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/3.png",
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
    id: 6,
    name: "Rimini",
    type: "tissu",
    description: `Rimini combine un toucher soyeux et une grande résistance à l’usure.`,
    care: `Aspirez régulièrement et évitez les produits chimiques agressifs.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/13.png",
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
    id: 10,
    name: "Bristol",
    type: "tissu",
    description: `Bristol est une toile épaisse avec un aspect légèrement rustique.`,
    care: `Brossage doux et nettoyage à sec.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/10.png",
  },
  {
    id: 11,
    name: "Ravello",
    type: "tissu",
    description: `Ravello est un chenille luxueuse très douce au toucher.`,
    care: `Aspirez avec embout brosse et utilisez un nettoyeur vapeur basse pression.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/4.pngg",
  },
  {
    id: 12,
    name: "Bologna",
    type: "tissu",
    description: `Bologna est un mélange laine-coton offrant chaleur et confort.`,
    care: `Nettoyage à sec uniquement.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/5.png",
  },
  {
    id: 13,
    name: "Skagen",
    type: "tissu",
    description: `Skagen est un mélange technique résistant aux taches.`,
    care: `Nettoyage humide doux et séchage à l'air libre.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/8.png",
  },
  {
    id: 14,
    name: "Tuscany",
    type: "tissu",
    description: `Tuscany rappelle les textures de la campagne toscane, robuste et authentique.`,
    care: `Brossage doux et nettoyage à sec.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/8.png",
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
    id: 18,
    name: "Napoli",
    type: "tissu",
    description: `Napoli est une toile technique résistante à l'eau.`,
    care: `Essuyez avec un chiffon humide et laissez sécher.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/7.png",
  },
  {
    id: 19,
    name: "Auckland Boucle",
    type: "tissu",
    description: `Auckland Boucle offre un aspect bouclé moderne.`,
    care: `Nettoyage à sec et brossage doux.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/18.png",
  },
  {
    id: 20,
    name: "Salto",
    type: "tissu",
    description: `Salto est un velours léger et légèrement brillant.`,
    care: `Aspirez doucement et nettoyez à sec.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/8.png",
  },
  {
    id: 21,
    name: "Nordic Grain",
    type: "cuir",
    description: `Nordic Grain est un mélange texturé inspiré des paysages nordiques.`,
    care: `Nettoyage humide doux.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/cuir/2.png",
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
  {
    id: 23,
    name: "Nordic Soft",
    type: "tissu",
    description: `Nordic Soft combine douceur et résistance avec un toucher velouté.`,
    care: `Nettoyage humide doux.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/14.png",
  },
  {
    id: 24,
    name: "York",
    type: "tissu",
    description: `York est un tissu épais à l'apparence classique et chic.`,
    care: `Nettoyage à sec.`,
    image:
      "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/echantillons-images-client/tissus/5.png",
  },
];
