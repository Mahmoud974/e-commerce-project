"use client";

import React from "react";
import { useLikeData } from "@/store/store";
import ProductCard from "@/components/ProduitId/Card";

import ProductLayout from "@/components/Layout/ProductLayout";

export default function ClientComponent({ products = [] }) {
  const { addItems } = useLikeData();

  const validProducts = Array.isArray(products) ? products : [];

  const hasValidProducts =
    validProducts.length > 0 && validProducts.every((item) => item && item.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {hasValidProducts ? (
        validProducts.map((item) => (
          <ProductCard key={item.id} item={item} addItems={addItems} />
        ))
      ) : (
        <p className="col-span-full text-center text-lg">
          Aucun produit trouvé
        </p>
      )}
    </div>
  );
}
