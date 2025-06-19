import React from "react";
import HelpSection from "@/components/BottomSection/HelpSection";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import {
  AccordionGeneral,
  AccordionItemType,
} from "@/components/Accordions/AccordionGeneral";
import { conseilsItems } from "@/components/Accordions/conseilsItems";

export default function Page() {
  return (
    <PageLayoutBanner
      title="Un havre de paix chez vous"
      description="Confort, esthétisme et sérénité au quotidien."
      bannerImage="peace.webp"
    >
      <main className="relative">
        <article className="container mt-6 mx-auto">
          <header className="mt-12 text-center px-4 mb-12">
            <h2 className="text-white text-xl font-semibold mt-4 max-w-3xl mx-auto">
              Plus quuu&#39;u#39;u#39;un simple meuble, notre canapé est une invitation au
              calme. Chaque tissu est sélectionné avec soin pour offrir une
              expérience sensorielle unique — douce au toucher, chaleureuse au
              regard.
            </h2>

            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              Avec SofaChic, vous transformez votre salon en un véritable
              sanctuaire de bien-être. Le design minimaliste sss&#39;a#39;a#39;adapte à tous les
              styles, tandis que la qualité des matériaux assure une durabilité
              sans compromis.
            </p>

            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Parce quuu&#39;u#39;u#39;un moment de détente mérite lll&#39;e#39;e#39;excellence, nous créons des
              canapés qui allient confort absolu, modularité et raffinement.
            </p>
          </header>

          <section className="mb-12">
            <div
              className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"
              role="presentation"
            ></div>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 px-6">
              Nos tissus, testés pour leur résistance et leur confort, sont
              issus de partenaires européens certifiés. Chaque détail — couture,
              densité de mousse, finition bois — est pensé pour durer et vous
              apaiser.
            </p>
          </section>

          <section className="mb-12" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="font-bold text-3xl text-center mb-4 text-white"
            >
              Créer votre espace de sérénité
            </h2>

            <div className="flex flex-col px-6 my-12 max-w-2xl mx-auto items-center">
              <AccordionGeneral items={conseilsItems} />
            </div>
          </section>

          <footer>
            <HelpSection />
          </footer>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
