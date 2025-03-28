"use client";
import ProductCard from "@/components/ItemId/Card";
import Footer from "@/components/SectionDown/Footer";
import Navbar from "@/components/Header/Navbar";
import { useTemplate } from "@/app/hook/useTemplate";
import React, { useState } from "react";
import { Canape } from "./types/canape";
import { useSearchArticles, useLikeData } from "@/store/store";
import Filter from "@/components/Header/Filter";
import Newsletter from "@/components/SectionDown/Newsletter";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();

  const initialCount = 15; // Nombre de produits affichés initialement
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const totalItems =
    filteredData.length > 0 ? filteredData.length : data?.length || 0;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + initialCount);
  };

  const handleShowLess = () => {
    setVisibleCount(initialCount);
  };

  let colorProduct = [...new Set(data?.map((item) => item.color) || [])];
  let seatProduct = [...new Set(data?.map((item) => item.seat) || [])];

  return (
    <section className="flex flex-col min-h-screen  ">
      <div className="flex flex-col items-center mt-6 w-full container mx-auto">
        <section className="flex flex-col justify-between w-full mb-12">
          <div className="flex flex-col">
            <Navbar />

            <Filter
              data={data}
              colorProduct={colorProduct}
              seatProduct={seatProduct}
            />

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto w-full">
              {filteredData.length > 0
                ? filteredData
                    .slice(0, visibleCount)
                    .map((item: any) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        addItems={addItems}
                      />
                    ))
                : data
                    ?.slice(0, visibleCount)
                    .map((item: Canape) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        addItems={addItems}
                      />
                    )) || <p>Aucun produit disponible.</p>}
            </section>

            {/* Boutons Voir + / Voir - */}
            <div className="flex justify-center mt-4">
              {visibleCount < totalItems && (
                <button
                  onClick={handleLoadMore}
                  className="mt-4 p-2 lg:mx-0 mx-8 border border-white text-white font-semibold rounded w-full"
                >
                  Voir +
                </button>
              )}
              {visibleCount >= totalItems && totalItems > initialCount && (
                <button
                  onClick={handleShowLess}
                  className="mt-4 p-2 lg:mx-0 mx-8 border border-white text-white font-semibold rounded w-full"
                >
                  Voir -
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
      <Informations />
      <Newsletter />
      <HelpSection />
      <div className="container mx-auto">
        <Footer />
      </div>
    </section>
  );
}
