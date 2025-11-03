import { AccordionItemType } from "@/components/Accordions/conditionsItems"

export const accordionItems: AccordionItemType[] = [
  {
    value: "livraison",
    trigger: "Quels sont les délais et conditions de livraison ?",
    content: (
      <p>
        Nos canapés sont livrés sous 5 à 10 jours ouvrés, selon le modèle et la
        disponibilité. La livraison est assurée à domicile, en rez-de-chaussée
        ou à l’étage selon l’option choisie. Vous serez contacté à l’avance pour
        fixer un créneau de livraison.
      </p>
    ),
  },
  {
    value: "echantillon",
    trigger: "Comment recevoir un échantillon gratuit de tissu ?",
    content: (
      <p>
        Vous pouvez commander jusqu’à 3 échantillons de tissus gratuitement.
        Rendez-vous sur la page <strong>“Échantillons”</strong>, sélectionnez
        vos couleurs préférées, et nous vous les envoyons gratuitement sous 3 à
        5 jours ouvrés.
      </p>
    ),
  },
  {
    value: "garantie",
    trigger: "Quelle est la durée et la couverture de la garantie ?",
    content: (
      <p>
        Tous nos canapés sont garantis 5 ans contre les défauts de fabrication
        et de structure. Les tissus et revêtements bénéficient d’une garantie de
        2 ans. Pour tout souci, notre service après-vente est à votre écoute.
      </p>
    ),
  },
  {
    value: "entretien",
    trigger: "Comment entretenir mon canapé ?",
    content: (
      <p>
        Nous proposons une gamme de produits d’entretien spécialement conçus
        pour préserver vos tissus et cuirs. Aspirez régulièrement votre canapé
        et évitez l’exposition directe au soleil. Pour un nettoyage en douceur,
        utilisez nos produits certifiés SofaChic.
      </p>
    ),
  },
  {
    value: "retour",
    trigger: "Puis-je retourner ou échanger un canapé ?",
    content: (
      <p>
        Vous disposez de 14 jours après réception pour nous retourner votre
        article s’il ne vous convient pas. Le canapé doit être en parfait état
        et dans son emballage d’origine. Nous vous fournirons une étiquette de
        retour prépayée.
      </p>
    ),
  },
  {
    value: "personnalisation",
    trigger: "Puis-je personnaliser mon canapé ?",
    content: (
      <p>
        Oui ! Vous pouvez choisir la couleur, le tissu, et parfois la
        configuration (angle droit ou gauche, assises supplémentaires…). Chaque
        fiche produit indique les options disponibles et les délais associés.
      </p>
    ),
  },
  {
    value: "paiement",
    trigger: "Quels modes de paiement acceptez-vous ?",
    content: (
      <p>
        Nous acceptons les paiements par carte bancaire, PayPal, et en 3 ou 4
        fois sans frais via notre partenaire Alma. Toutes les transactions sont
        100% sécurisées.
      </p>
    ),
  },
  {
    value: "contact",
    trigger: "Comment contacter le service client ?",
    content: (
      <p>
        Vous pouvez nous contacter par e-mail à{" "}
        <a href="mailto:contact@sofchic.fr" className="text-blue-500">
          contact@sofchic.fr
        </a>{" "}
        ou via le formulaire sur notre page “Contact”. Notre équipe est
        disponible du lundi au samedi, de 9h à 18h.
      </p>
    ),
  },
]
