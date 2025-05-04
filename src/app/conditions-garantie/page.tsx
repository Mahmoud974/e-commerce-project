import React from "react";
import { AccordionGeneral } from "@/components/Accordion/AccordionGeneral";
import HelpSection from "@/components/BottomSection/HelpSection";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function GuaranteePage() {
  const accordionItems = [
    {
      value: "coverage",
      trigger: "Que couvre la garantie ?",
      content: (
        <p>
          La garantie couvre les défauts matériels et de fabrication sur tous
          les produits de notre collection. Pendant la période de garantie, tout
          défaut constaté sera corrigé ou le produit sera remplacé.
        </p>
      ),
    },
    {
      value: "duration",
      trigger: "Quelle est la durée de la garantie ?",
      content: (
        <p>
          La garantie s’applique aux produits achetés après le 1er janvier 2022
          et est valable pendant 5 ans, à compter de la date d’achat en magasin
          ou de la livraison effectuée par Sofachic./.
        </p>
      ),
    },
    {
      value: "claim",
      trigger: "Comment faire une réclamation au titre de la garantie ?",
      content: (
        <p>
          Les réclamations doivent être adressées au magasin Sofachic./ où le
          produit a été acheté, dans un délai raisonnable après la découverte du
          défaut et avant la fin de la période de garantie. [...]
        </p>
      ),
    },
    {
      value: "exclusions",
      trigger: "Qu’est-ce qui n’est pas couvert par la garantie ?",
      content: (
        <p>
          La garantie ne couvre pas l’usure normale, les marques causées par des
          accidents ou une mauvaise utilisation [...]
        </p>
      ),
    },
    {
      value: "resolution",
      trigger: "Que fait Sofachic./ en cas de défaut ?",
      content: (
        <p>
          En cas de réclamation acceptée, Sofachic./ décidera si le défaut peut
          être corrigé ou si le produit doit être remplacé. [...]
        </p>
      ),
    },
  ];

  return (
    <PageLayoutBanner
      title="CONDITIONS de la garanties"
      description="Profitez de notre garantie exceptionnelle pour une tranquillité d’esprit totale : des meubles conçus pour durer, avec un support qui vous accompagne à chaque étape."
      bannerImage={"guarantie.jpg"}
    >
      <div className="mt-12 text-center px-4 mb-12">
        {/* Texte de présentation */}
      </div>

      <div>
        <div className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"></div>
        <p className="text-white text-lg max-w-3xl mx-auto mb-8 lg:px-0 px-6">
          Chez SofaChic, nous concevons nos produits avec des matériaux robustes
          [...]
        </p>

        <h2 className="font-bold text-3xl text-left sm:text-center mb-4 sm:mb-0">
          Questions fréquentes
        </h2>

        <div className="flex flex-col lg:px-0 px-6 sm:flex-row my-12 max-w-2xl mx-auto items-start sm:items-center">
          <AccordionGeneral items={accordionItems} />
        </div>
      </div>
    </PageLayoutBanner>
  );
}
