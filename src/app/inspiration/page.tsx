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
      title="Inspiration"
      description="Profitez de notre garantie exceptionnelle pour une tranquillité d’esprit totale : des meubles conçus pour durer, avec un support qui vous accompagne à chaque étape."
      bannerImage="woman.jpg"
    >
      <section className="relative">
        <div className="container mt-6 mx-auto">
          <div className="mt-12 text-center px-4 mb-12">
            <p className="text-white text-xl font-semibold mt-4 max-w-3xl mx-auto">
              Chez Sofachic., nous sommes fiers de concevoir des meubles
              intemporels en utilisant les meilleurs matériaux pour garantir
              leur qualité et leur durabilité. Pour refléter notre engagement,
              nous offrons une garantie de 5 ans sur tous les produits achetés
              après le 1er janvier 2022.
            </p>

            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              Que vous choisissiez des meubles pour vivre, travailler ou jouer,
              notre expertise de plus de 70 ans dans le design danois vous
              garantit des produits modulaires, fonctionnels et de qualité
              supérieure.
            </p>

            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Nous nous efforçons d’améliorer la vie de chacun avec le design
              danois, et cette mission inspire notre devise :{" "}
              <span className="font-semibold italic">Live Ekstraordinær</span>
            </p>
          </div>

          <div>
            <div className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"></div>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 px-6">
              Chez SofaChic, nous concevons nos produits avec des matériaux
              robustes, durables et innovants. Pour les cadres de canapé, nous
              proposons une garantie de 10 ans couvrant les défauts de
              fabrication et de structure.
            </p>

            <h2 className="font-bold text-3xl text-center mb-4">
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
