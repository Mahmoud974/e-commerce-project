"use client";

import React from "react";
import { useLikeData } from "@/store/store";
import ProductCard from "@/components/ProduitId/Card";

export default function ClientComponent({ products }) {
  const { addItems } = useLikeData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((item) => (
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