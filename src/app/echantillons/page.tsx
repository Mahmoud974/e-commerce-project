"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { useSearchArticles, useLikeData } from "@/store/store";
import { materials } from "@/db/echantillions";
import ProductLayout from "@/components/Layout/ProductLayout";

export default function EchantillonsPage() {
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();
  const allProducts = filteredData.length > 0 ? filteredData : materials;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);
      const newSelected = isSelected
        ? prev.filter((pid) => pid !== id)
        : [...prev, id];
      if (!isSelected) {
        const item = allProducts.find((item) => item.id === id);
        if (item) addItems(item);
      }
      return newSelected;
    });
  };

  return (
    <ProductLayout
      title="Échantillons"
      description="Découvrez notre sélection d'échantillons de tissus et de cuirs pour personnaliser votre mobilier."
      breadcrumbs={[
        { label: "Accueil", href: "/home" },
        { label: "Échantillons" }
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {allProducts.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <button
              key={item?.id}
              onClick={() => toggleSelect(item.id)}
              className={
                `group relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ` +
                (isSelected ? "ring-4 ring-blue-300" : "")
              }
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {(item?.type === "cuir" || item?.type === "tissu") && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r  bg-black text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
                    {item?.type}
                  </span>
                )}
                <div className="absolute top-3 right-3">
                  <div
                    className={
                      `flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-80 shadow-sm transition-all duration-200 ` +
                      (isSelected
                        ? "scale-110 bg-black"
                        : "group-hover:scale-105")
                    }
                  >
                    {isSelected && <Check className="w-4 h-4 text-red-700" />}
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 truncate">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between"></div>
              </div>
            </button>
          );
        })}
      </div>
    </ProductLayout>
  );
}
