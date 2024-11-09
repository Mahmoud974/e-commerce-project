"use client";
import ProductCard from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTemplate } from "@/hook/useTemplate";
import React, { useEffect } from "react";
import { Canape } from "./types/canape";
import {
  useSearchArticles,
  useSortArticlebyPrice,
  useLikeData,
} from "@/store/store";
import Filter from "@/components/Filter";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useSearchArticles();
  const { setSortData, sortData } = useSortArticlebyPrice();
  const { addItems } = useLikeData();

  useEffect(() => {
    setSortData(filteredData);
  }, [filteredData, setSortData]);

  console.log(sortData);

  const flexCol = "flex flex-col";

  return (
    <section className={`${flexCol}  min-h-screen`}>
      <div
        className={`${flexCol} flex-grow items-center mt-6 w-full max-w-screen-xl mx-auto`}
      >
        <section className={`${flexCol} justify-between w-full mb-12`}>
          <div className="flex flex-col">
            <Navbar />
            <Filter data={data} />
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto w-full">
              {filteredData.length > 0 ? (
                filteredData.map((item: Canape) => (
                  <ProductCard key={item.id} item={item} addItems={addItems} />
                ))
              ) : (
                <p>Aucun produit trouvé.</p>
              )}
            </section>
          </div>
        </section>
      </div>
      <div className="  max-w-screen-xl flex justify-center py-8    ">
        <Footer />
      </div>
    </section>
  );
}
