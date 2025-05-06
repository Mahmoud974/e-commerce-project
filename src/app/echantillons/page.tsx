/* src/app/echantillons/page.tsx */

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Header/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { useSearchArticles, useLikeData } from "@/store/store";

interface SampleProduct {
  id: string;
  name: string;
  description: string;
  label?: string;
  price: number;
  images: string[];
}

export default function CanapesClient() {
  // Données statiques
  const data: SampleProduct[] = [
    {
      id: "12",
      name: "Cuire",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit…",
      label: "NOUVEAU",
      price: 10,
      images: ["/images/hello-1.jpg"],
    },
  ];

  // Hooks fictifs (n'utilisent pas de db pour le moment)
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();

  const allProducts = filteredData.length > 0 ? filteredData : data;

  return (
    <section className="flex flex-col min-h-screen  ">
      <div className="container mx-auto mt-6 mb-12">
        <Navbar />

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/home" className="hover:underline">
            Accueil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>Echantillons</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/produit/${product.id}`}>
                <div className="relative h-44 w-full bg-black">
                  <Image
                    src={product.images[0]}
                    alt={`Photo du produit ${product.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-4"
                  />
                </div>
              </Link>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold truncate">
                    {product.name}
                  </h3>
                  {product.label && (
                    <span className="bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded">
                      {product.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>

              <div className="flex items-center justify-between gap-2 px-4 py-3 border-t">
                <p className="text-2xl font-bold text-gray-900">
                  {product.price.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      /* ajouter au panier */
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingCart className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={() => addItems(product as any)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 transition"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className="w-6 h-6 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
