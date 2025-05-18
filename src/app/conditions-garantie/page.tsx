import React from "react";
import { AccordionGeneral } from "@/components/Accordion/AccordionGeneral";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import { conditionsItems } from "@/db/Accordions/conditionsItems";

export default function GuaranteePage() {
  return (
    <PageLayoutBanner
      title="CONDITIONS de la garanties"
      description="Profitez de notre garantie exceptionnelle pour une tranquillité d'esprit totale : des meubles conçus pour durer, avec un support qui vous accompagne à chaque étape."
      bannerImage={"guarantie.jpg"}
    >
      <main className="relative">
        <article className="container mx-auto">
          <header className="mt-12 text-center px-4 mb-12">
            <div
              className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"
              role="presentation"
            ></div>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 lg:px-0 px-6">
              Chez SofaChic, nous concevons nos produits avec des matériaux
              robustes [...]
            </p>
          </header>

          <section className="mb-12">
            <h2 className="font-bold text-3xl text-left sm:text-center mb-4 sm:mb-0">
              Questions fréquentes
            </h2>

            <div className="flex flex-col lg:px-0 px-6 sm:flex-row my-12 max-w-2xl mx-auto items-start sm:items-center">
              <AccordionGeneral items={conditionsItems} />
            </div>
          </section>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
