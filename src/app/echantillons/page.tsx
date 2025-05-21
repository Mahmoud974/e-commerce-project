import React from "react";
import ProductLayout from "@/components/Layout/ProductLayout";
import EchantillonClient from "./EchantillonClient";

async function getEchantillons() {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL); // Ajoutez cette ligne pour vérifier l'URL
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/echantillons`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des échantillons");
    }

    return res.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des échantillons:", error);

    return;
  }
}

export default async function EchantillonsPage() {
  const echantillons = await getEchantillons();

  return (
    <ProductLayout
      title="Échantillons"
      description="Découvrez notre sélection d'échantillons de tissus et de cuirs pour personnaliser votre mobilier."
      breadcrumbs={[
        { label: "Accueil", href: "/home" },
        { label: "Échantillons" },
      ]}
    >
      <EchantillonClient initialEchantillons={echantillons} />
    </ProductLayout>
  );
}
