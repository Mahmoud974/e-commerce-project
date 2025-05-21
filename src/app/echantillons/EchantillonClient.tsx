"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useSearchArticles, useCartStore } from "@/store/store";

export default function EchantillonClient({ initialEchantillons }) {
  const { filteredData } = useSearchArticles();
  const { addItem, removeItem, items } = useCartStore();
  const allProducts =
    filteredData.length > 0 ? filteredData : initialEchantillons;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const cartItemIds = items
      .filter((item) => item.price === 0)
      .map((item) => item.id);

    setSelectedIds(cartItemIds);
  }, [items]);

  const toggleSelect = (id: number) => {
    const isSelected = selectedIds.includes(id);
    const item = allProducts.find((item) => item.id === id);

    if (!item) return;

    if (isSelected) {
      removeItem(id);
    } else {
      const itemWithZeroPrice: any = {
        id: item.id,
        name: item.name || item.title || `Échantillon ${item.type || ""}`,
        title: item.title || item.name || `Échantillon ${item.type || ""}`,
        image: item.image || item.images?.[0],
        images: item.images || [item.image],
        price: 0,
        priceDisplay: "Gratuit",
        isEchantillon: true,
        quantity: 1,
        type: item.type || "standard",
        description:
          item.description || `Échantillon ${item.type || ""} gratuit`,
        color: item.color || "",
      };
      console.log(`Ajout de l'échantillon: ${itemWithZeroPrice.name}`);

      addItem(itemWithZeroPrice);
    }

    setSelectedIds((prev) => {
      return isSelected ? prev.filter((pid) => pid !== id) : [...prev, id];
    });
  };

  return (
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
                src={
                  item?.image || item?.images?.[0] || "/placeholder-image.jpg"
                }
                alt={item?.name || item?.title || "Échantillon"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {(item?.type === "cuir" || item?.type === "tissu") && (
                <span className="absolute top-3 left-3 bg-gradient-to-r bg-black text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
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
                  {isSelected && <Check className="w-4 h-4 text-green-900" />}
                </div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800 truncate">
                  {item.name || item.title || "Échantillon"}
                </h3>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {item.description}
                </p>
                {/* Affichage du prix gratuit */}
                <p className="mt-2 text-sm font-semibold text-green-600">
                  Gratuit
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
