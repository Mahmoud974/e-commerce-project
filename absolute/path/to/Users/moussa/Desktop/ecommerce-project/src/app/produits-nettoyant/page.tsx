import React from "react";
import ProductLayout from "@/components/Layout/ProductLayout";
import ClientComponent from "@/components/ClientComponents/ClientProduitEntretien";

export default async function NettoyantsProduits() {
  return <ClientComponent products={adaptedProducts} />;
}
