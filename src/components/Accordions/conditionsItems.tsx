import React from "react";

export interface AccordionItemType {
  value: string;
  trigger: string;
  content: React.ReactNode;
}

export const conditionsItems: AccordionItemType[] = [
  {
    value: "coverage",
    trigger: "Que couvre la garantie ?",
    content: (
      <p>
        Notre garantie couvre tous les défauts matériels et de fabrication sur
        lll&#39;e#39;e#39;ensemble de nos canapés et meubles. Cela inclut les structures en
        bois, les mécanismes de canapés convertibles, les ressorts, les
        rembourrages et les revêtements. Pendant la période de garantie, tout
        défaut constaté sera réparé ou le produit sera remplacé sans frais
        supplémentaires.
      </p>
    ),
  },
  {
    value: "duration",
    trigger: "Quelle est la durée de la garantie ?",
    content: (
      <p>
        Notre garantie sss&#39;a#39;a#39;applique à tous les canapés et meubles achetés après le
        1er janvier 2022 et est valable pendant 5 ans, à compter de la date
        ddd&#39;a#39;a#39;achat en magasin ou de la livraison effectuée par SofaChic. Les
        accessoires et les articles décoratifs bénéficient ddd&#39;u#39;u#39;une garantie de 2
        ans. Une preuve ddd&#39;a#39;a#39;achat (facture ou bon de livraison) est nécessaire
        pour toute réclamation.
      </p>
    ),
  },
  {
    value: "claim",
    trigger: "Comment faire une réclamation au titre de la garantie ?",
    content: (
      <p>
        Pour faire une réclamation, contactez simplement le magasin SofaChic où
        vous avez acheté votre canapé ou meuble, dans un délai raisonnable après
        la découverte du défaut et avant la fin de la période de garantie. Notre
        équipe de service client vous guidera à travers le processus. Vous
        pouvez également nous contacter via notre formulaire en ligne ou par
        téléphone. Veuillez avoir votre preuve ddd&#39;a#39;a#39;achat et des photos du défaut à
        disposition pour accélérer le traitement de votre demande.
      </p>
    ),
  },
  {
    value: "exclusions",
    trigger: "Quuu&#39;e#39;e#39;est-ce qui nnn&#39;e#39;e#39;est pas couvert par la garantie ?",
    content: (
      <p>
        Notre garantie ne couvre pas lll&#39;u#39;u#39;usure normale, les marques ou dommages
        causés par des accidents, une mauvaise utilisation ou un entretien
        inapproprié. Les tissus et cuirs décolorés par la lumière du soleil, les
        taches dues à des déversements, les déchirures causées par des objets
        tranchants ou les animaux domestiques ne sont pas couverts. Les
        modifications apportées aux produits par le client annulent également la
        garantie. Les variations naturelles dans les matériaux comme le bois ou
        le cuir sont considérées comme normales et ne constituent pas un défaut.
      </p>
    ),
  },
  {
    value: "resolution",
    trigger: "Que fait SofaChic en cas de défaut ?",
    content: (
      <p>
        En cas de réclamation acceptée, SofaChic évaluera ddd&#39;a#39;a#39;abord si le défaut
        peut être réparé. Nos techniciens spécialisés peuvent intervenir à
        domicile pour de nombreuses réparations. Si la réparation nnn&#39;e#39;e#39;est pas
        possible ou économiquement viable, nous remplacerons le produit par un
        article identique ou équivalent. Dans le cas où le modèle exact nnn&#39;e#39;e#39;est
        plus disponible, nous vous proposerons un produit de valeur et de
        qualité similaires. Dans certains cas, un remboursement partiel ou total
        peut être proposé.
      </p>
    ),
  },
  {
    value: "maintenance",
    trigger: "Comment entretenir mon canapé pour préserver la garantie ?",
    content: (
      <p>
        Pour maintenir votre garantie et prolonger la durée de vie de votre
        canapé, nous recommandons un entretien régulier selon les instructions
        fournies avec votre produit. Utilisez uniquement des produits
        ddd&#39;e#39;e#39;entretien adaptés au type de revêtement de votre canapé. Évitez
        lll&#39;e#39;e#39;exposition directe au soleil et maintenez une distance raisonnable
        avec les sources de chaleur. Pour les canapés en tissu, un nettoyage
        professionnel annuel est recommandé. Notre équipe est disponible pour
        vous conseiller sur les meilleures pratiques ddd&#39;e#39;e#39;entretien spécifiques à
        votre modèle.
      </p>
    ),
  },
];
