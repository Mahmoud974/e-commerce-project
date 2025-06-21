"use client";

import React from "react";
import ProductCard from "@/components/ProduitId/Card";
import { Item } from "@/app/types/canape";

import ProductLayout from "@/components/Layouts/ProductLayout";

export default function ClientComponent({ products = [] }: { products: Item[] }) {

  const validProducts = Array.isArray(products) ? products : [];

  const hasValidProducts =
    validProducts.length > 0 && validProducts.every((item) => item && item.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {hasValidProducts ? (
        validProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))
      ) : (
        <p className="col-span-full text-center text-lg">
          Aucun produit trouvé
        </p>
      )}
    </div>
  );
}
