"use client";
import ProductCard from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTemplate } from "@/hook/useTemplate";
import React, { useEffect, useState } from "react";
import { Canape } from "./types/canape";
import { useSearchArticles, useLikeData } from "@/store/store";
import Filter from "@/components/Filter";
import Newsletter from "@/components/Newsletter";
import HelpSection from "@/components/HelpSection";
import Informations from "@/components/Informations";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();
  const [visibleCount, setVisibleCount] = useState(15);

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 15);
  };
  let color = data && data.map((item) => item.color);
  let colorProduct = [...new Set(color)];

  let seat = data && data.map((item) => item.seat);
  let seatProduct = [...new Set(seat)];

  const flexCol = "flex flex-col";

  return (
    <section className={`${flexCol} min-h-screen`}>
      <div className={`${flexCol} items-center mt-6 w-full container mx-auto`}>
        <section className={`${flexCol} justify-between w-full mb-12`}>
          <div className="flex flex-col">
            <Navbar />
            <Filter
              data={data}
              colorProduct={colorProduct}
              seatProduct={seatProduct}
            />
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto w-full">
              {filteredData && filteredData.length > 0 ? (
                filteredData
                  .slice(0, visibleCount)
                  .map((item: any) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      addItems={addItems}
                    />
                  ))
              ) : data && data.length > 0 ? (
                data
                  .slice(0, visibleCount)
                  .map((item: Canape) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      addItems={addItems}
                    />
                  ))
              ) : (
                <p>Aucun produit disponible.</p>
              )}
            </section>

            {/* Bouton "Voir plus" si plus de produits sont disponibles */}
            {filteredData.length > visibleCount && (
              <button
                onClick={handleLoadMore}
                className="mt-4 p-2 border border-white text-white font-semibold rounded"
              >
                Voir +
              </button>
            )}
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
