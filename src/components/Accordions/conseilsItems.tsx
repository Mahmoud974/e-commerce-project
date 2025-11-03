import React from "react";
import { AccordionItemType } from "./conditionsItems";

export const conseilsItems: AccordionItemType[] = [
  {
    value: "materiaux",
    trigger: "Quels matériaux favorisent une ambiance apaisante ?",
    content: (
      <p>
        Nos tissus en velours et en lin naturel sont spécialement sélectionnés
        pour leur douceur et leur toucher apaisant. Les teintes neutres comme le
        beige, le gris clair et le bleu poudré contribuent à créer une
        atmosphère sereine dans votre salon. Nos bois sont traités sans produits
        chimiques agressifs pour préserver la qualité de votre air intérieur.
      </p>
    ),
  },
  {
    value: "confort",
    trigger: "Comment nos canapés améliorent-ils votre bien-être quotidien ?",
    content: (
      <p>
        La densité de nos mousses est étudiée pour offrir un soutien optimal
        tout en s{`'`};adaptant parfaitement à votre morphologie. Nos assises
        profondes permettent une détente complète, tandis que nos dossiers
        ergonomiques soulagent les tensions du dos. Chaque canapé est conçu pour
        devenir votre refuge quotidien contre le stress.
      </p>
    ),
  },
  {
    value: "entretien",
    trigger: "Comment entretenir votre havre de paix ?",
    content: (
      <p>
        Pour préserver la sérénité de votre espace, nos housses sont facilement
        déhoussables et lavables. Nous recommandons un nettoyage doux avec des
        produits naturels que nous pouvons vous conseiller. Un entretien
        régulier tous les 3 mois suffit pour maintenir votre canapé comme neuf
        et conserver cette sensation d{`'`}paisement au quotidien.
      </p>
    ),
  },
];
