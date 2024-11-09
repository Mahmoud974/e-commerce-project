"use client";
import ProductCard from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTemplate } from "@/hook/useTemplate";
import React, { useEffect, useState } from "react";
import { Canape } from "./types/canape";
import { ComboboxDemo } from "@/components/Dropbox";
import { Button } from "@/components/ui/button";
import { useSearchArticles, useSortArticlebyPrice } from "@/store/store";

export default function Page() {
  const { data } = useTemplate();
  const [filteredData, setFilteredData] = useState([]);
  const { sortData } = useSortArticlebyPrice();

  useEffect(() => {
    setFilteredData(sortData.length > 0 ? sortData : data || []);
  }, [sortData, data]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto mt-6 flex-grow">
        <section className="flex flex-col justify-between mb-12">
          <div className=""></div>
          <div className="flex flex-col mx-auto">
            <Navbar />
            <div className="flex flex-row mb-6 justify-between ">
              <ul className="space-x-4 flex">
                <li>
                  <Button>Tous les filtres</Button>
                </li>
                <li>
                  <Button>Coloris</Button>
                </li>
                <li>
                  <Button>Matériau</Button>
                </li>
                <li>
                  <Button>Collection</Button>
                </li>
                <li>
                  <Button>Prix</Button>
                </li>
              </ul>
              <div className="flex items-center">
                <p className="mr-3">{filteredData.length} articles</p>
                <ComboboxDemo data={data} />
              </div>
            </div>

            <section className="grid grid-cols-4 gap-3 max-w-6xl mx-auto">
              {filteredData.length > 0 ? (
                filteredData.map((item: Canape) => (
                  <ProductCard key={item.id} item={item} />
                ))
              ) : (
                <p className="">Aucun produit trouvé.</p>
              )}
            </section>
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}
