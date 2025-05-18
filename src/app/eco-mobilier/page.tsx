import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function EcoMobilierPage() {
  return (
    <PageLayoutBanner
      title="Éco‑mobilier"
      description="L'éco‑participation finance la collecte, le tri et le recyclage des meubles usagés."
      bannerImage={"eco-mobilier.png"}
    >
      <main className="relative">
        <article className="container my-6 mx-auto">
          <header className="mt-12 text-center px-4 mb-12">
            <div
              className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"
              role="presentation"
            ></div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Notre engagement pour l'environnement
            </h2>
          </header>

          <section className="text-center px-4 mb-12">
            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              L'éco‑participation sert à financer la collecte, le tri et le
              recyclage des meubles usagés.
            </p>
            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Le montant est déterminé par un barème national établi par
              Éco‑mobilier et s'applique à tous les types de meubles.
            </p>
            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Cette contribution est collectée par le point de vente lors de
              chaque achat, puis reversée à Éco‑mobilier, qui la gère pour
              accomplir la mission confiée par l'État.
            </p>
          </section>

          <footer className="text-center mb-8">
            <a
              href="https://ecomaison.com/"
              className="inline-block px-6 py-2 bg-red-700 text-white font-medium rounded hover:bg-red-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="En savoir plus sur Éco-mobilier (s'ouvre dans une nouvelle fenêtre)"
            >
              En savoir plus
            </a>
          </footer>
        </article>
      </main>
    </PageLayoutBanner>
  );
}
