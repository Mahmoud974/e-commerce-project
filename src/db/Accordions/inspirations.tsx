import React from "react";
import { AccordionItemType } from "./conditionsItems";

export const inspirationsItems: AccordionItemType[] = [
  {
    value: "service",
    trigger: "Comment contacter le service client ?",
    content: (
      <p>
        Vous pouvez nous contacter par e-mail, téléphone ou via notre formulaire
        de contact en ligne. Nous sommes disponibles du lundi au samedi, de 9h à
        18h.
      </p>
    ),
  },
  {
    value: "garantie",
    trigger: "Comment fonctionne la garantie ?",
    content: (
      <p>
        Nos produits sont garantis 5 ans contre les défauts de fabrication. Pour
        toute réclamation, présentez simplement votre preuve d’achat.
      </p>
    ),
  },
  {
    value: "delai",
    trigger: "Quels sont les délais de traitement d'une demande ?",
    content: (
      <p>
        Les demandes sont généralement traitées sous 48h. Un conseiller vous
        contactera si des informations supplémentaires sont nécessaires.
      </p>
    ),
  },
];
