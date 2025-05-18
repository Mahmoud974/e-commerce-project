import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import React from "react";

export default function Page() {
  return (
    <PageLayoutBanner
      title="À propos de nous"
      description="Nous créons des meubles uniques qui améliorent les nouvelles façons de vivre, de travailler et de jouer."
      bannerImage={"about-banner.png"}
    >
      <main className="relative">
        <article className="container mt-6 mx-auto">
          <header className="mt-12 text-center px-4 mb-6">
            <h2 className="drop-shadow-lg w-1/2 text-center mx-auto">
              Nous créons des meubles uniques qui améliorent les nouvelles
              façons de vivre, de travailler et de jouer.
            </h2>
          </header>

          <section className="text-center px-4 mb-12">
            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              Depuis plus de 70 ans, nous collaborons avec les meilleurs
              designers du monde pour créer des meubles réputés pour leur
              modularité, leur fonctionnalité et leur qualité sans compromis.
              Grâce à la créativité et à l'artisanat danois, nous rehaussons les
              espaces avec un design iconique qui apporte joie et inspiration.
            </p>

            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Nous nous efforçons d'améliorer la vie de chacun avec le design
              danois, et cette mission inspire notre devise :{" "}
              <span className="font-semibold italic">Live Ekstraordinær</span>
            </p>

            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Les produits BoConcept incarnent les valeurs essentielles du
              design danois : un artisanat soigné, une simplicité élégante, une
              fonctionnalité optimale et l'utilisation de matériaux de haute
              qualité, qui sont au cœur de notre héritage.
            </p>
          </section>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
