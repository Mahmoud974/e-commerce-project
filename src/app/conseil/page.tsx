import React from "react";
import HelpSection from "@/components/BottomSection/HelpSection";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import {
  AccordionGeneral,
  AccordionItemType,
} from "@/components/Accordion/AccordionGeneral";

export default function Page() {
  const accordionItems: AccordionItemType[] = [
    {
      value: "service",
      trigger: "Comment contacter le service client ?",
      content: (
        <p>
          Vous pouvez nous contacter par e-mail, téléphone ou via notre
          formulaire de contact en ligne. Nous sommes disponibles du lundi au
          samedi, de 9h à 18h.
        </p>
      ),
    },
    {
      value: "garantie",
      trigger: "Comment fonctionne la garantie ?",
      content: (
        <p>
          Nos produits sont garantis 5 ans contre les défauts de fabrication.
          Pour toute réclamation, présentez simplement votre preuve d’achat.
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

  return (
    <PageLayoutBanner
      title="Un havre de paix chez vous"
      description="Confort, esthétisme et sérénité au quotidien."
      bannerImage="peace.webp"
    >
      <section className="relative">
        <div className="container mt-6 mx-auto">
          <div className="mt-12 text-center px-4 mb-12">
            <p className="text-white text-xl font-semibold mt-4 max-w-3xl mx-auto">
              Plus qu’un simple meuble, notre canapé est une invitation au
              calme. Chaque tissu est sélectionné avec soin pour offrir une
              expérience sensorielle unique — douce au toucher, chaleureuse au
              regard.
            </p>

            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              Avec SofaChic, vous transformez votre salon en un véritable
              sanctuaire de bien-être. Le design minimaliste s’adapte à tous les
              styles, tandis que la qualité des matériaux assure une durabilité
              sans compromis.
            </p>

            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Parce qu’un moment de détente mérite l’excellence, nous créons des
              canapés qui allient confort absolu, modularité et raffinement.
            </p>
          </div>

          <div>
            <div className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"></div>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 px-6">
              Nos tissus, testés pour leur résistance et leur confort, sont
              issus de partenaires européens certifiés. Chaque détail — couture,
              densité de mousse, finition bois — est pensé pour durer et vous
              apaiser.
            </p>

            <h2 className="font-bold text-3xl text-center mb-4 text-white">
              Questions fréquentes
            </h2>

            <div className="flex flex-col px-6 my-12 max-w-2xl mx-auto items-center">
              <AccordionGeneral items={accordionItems} />
            </div>

            <HelpSection />
          </div>
        </div>
      </section>
    </PageLayoutBanner>
  );
}
