import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function EcoMobilierPage() {
  return (
    <PageLayoutBanner
      title="Éco‑mobilier"
      description="L’éco‑participation finance la collecte, le tri et le recyclage des meubles usagés."
      bannerImage={"eco-mobilier.png"}
    >
      <section className="relative">
        <div className="container my-6 mx-auto">
          <div className="mt-12 text-center px-4 mb-12">
            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              L’éco‑participation sert à financer la collecte, le tri et le
              recyclage des meubles usagés.
            </p>
            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Le montant est déterminé par un barème national établi par
              Éco‑mobilier et s’applique à tous les types de meubles.
            </p>
            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Cette contribution est collectée par le point de vente lors de
              chaque achat, puis reversée à Éco‑mobilier, qui la gère pour
              accomplir la mission confiée par l’État.
            </p>
            <a href="https://ecomaison.com/">en savoir +</a>
          </div>
        </div>
      </section>
    </PageLayoutBanner>
  );
}
