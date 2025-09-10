import React from "react";
import { AccordionItemType } from "./conditionsItems";

export const generalSalesConditionsItems: AccordionItemType[] = [
  {
    value: "introduction",
    trigger: "Introduction",
    content: (
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les ventes
        de produits effectuées sur le site e-commerce de SofaChic. En passant
        commande, le client accepte sans réserve ces CGV.
      </p>
    ),
  },
  {
    value: "products",
    trigger: "Produits",
    content: (
      <p>
        SofaChic propose une gamme de canapés et meubles de qualité. Les
        caractéristiques essentielles des produits sont présentées sur le site.
        Les photographies sont non contractuelles.
      </p>
    ),
  },
  {
    value: "price",
    trigger: "Prix",
    content: (
      <p>
        Les prix des produits sont indiqués en Euros toutes taxes comprises
        (TTC), hors frais de livraison. SofaChic se réserve le droit de modifier
        ses prix à tout moment. Les produits seront facturés sur la base des
        tarifs en vigueur au moment de l'enregistrement de la commande.
      </p>
    ),
  },
  {
    value: "order",
    trigger: "Commande",
    content: (
      <p>
        Le client valide sa commande lorsqu'il clique sur le bouton "Confirmer
        ma commande", après avoir vérifié le contenu du panier et renseigné les
        informations de livraison et de paiement.
      </p>
    ),
  },
  {
    value: "payment",
    trigger: "Paiement",
    content: (
      <p>
        Le paiement s'effectue en ligne par carte bancaire ou via les autres
        moyens de paiement proposés sur le site. Le paiement est entièrement
        sécurisé.
      </p>
    ),
  },
  {
    value: "delivery",
    trigger: "Livraison",
    content: (
      <p>
        Les produits sont livrés à l'adresse indiquée par le client lors de la
        commande. Les délais de livraison sont indiqués à titre indicatif. En
        cas de retard, la responsabilité de SofaChic ne pourra être engagée.
      </p>
    ),
  },
  {
    value: "retraction",
    trigger: "Droit de rétractation",
    content: (
      <p>
        Conformément à la législation en vigueur, le client dispose d'un délai
        de 14 jours à compter de la réception des produits pour exercer son
        droit de rétractation, sans avoir à justifier de motifs ni à payer de
        pénalités.
      </p>
    ),
  },
  {
    value: "guarantee",
    trigger: "Garanties",
    content: (
      <p>
        Tous les produits vendus par SofaChic bénéficient de la garantie légale
        de conformité et de la garantie des vices cachés, dans les conditions
        prévues par la loi.
      </p>
    ),
  },
  {
    value: "responsibility",
    trigger: "Responsabilité",
    content: (
      <p>
        La responsabilité de SofaChic ne saurait être engagée pour tous les
        inconvénients ou dommages inhérents à l'utilisation du réseau Internet,
        notamment une rupture de service, une intrusion extérieure ou la présence
        de virus informatiques.
      </p>
    ),
  },
  {
    value: "jurisdiction",
    trigger: "Droit applicable et juridiction compétente",
    content: (
      <p>
        Les présentes CGV sont soumises à la loi française. En cas de litige, les
        tribunaux français seront seuls compétents.
      </p>
    ),
  },
];




