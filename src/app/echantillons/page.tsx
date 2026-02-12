import React from "react";
import ProductLayout from "@/components/Layouts/ProductLayout";
import EchantillonClient from "./EchantillonClient";
import { getEchantillons } from "@/lib/data";

export default async function EchantillonsPage() {
  const echantillons = await getEchantillons() ?? [];

  return (
    <ProductLayout
      title="Échantillons"
      description="Découvrez notre sélection d'echantillons de tissus et de cuirs pour personnaliser votre mobilier."
      breadcrumbs={[
        { label: "Accueil", href: "/home" },
        { label: "Échantillons" },
      ]}
    >
      <EchantillonClient initialEchantillons={echantillons} />
  
    </ProductLayout>
  );
}
