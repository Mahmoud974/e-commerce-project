"use client";
import ProductCard from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTemplate } from "@/hook/useTemplate";
import React, { useEffect } from "react";
import { Canape } from "./types/canape";
import { ComboboxDemo } from "@/components/Dropbox";
import { Button } from "@/components/ui/button";
import {
  useNewData,
  useSortData,
  useLikeData,
  useCartStore,
} from "@/store/store";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useNewData();
  const { setSortData } = useSortData();
  const { selectedItems, addItems } = useLikeData();
  const { items, addItemCart } = useCartStore();

  useEffect(() => {
    if (data) {
      setSortData(data.filter((item) => item.prix <= 10));
      setSortData(data);
    }
  }, [data, setSortData]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-grow items-center mt-6 w-full max-w-screen-xl mx-auto">
        {/* Le conteneur principal est centré horizontalement */}
        <section className="flex flex-col justify-between w-full mb-12">
          <div className="flex flex-col justify-center w-full">
            <Navbar selectedItems={selectedItems} />
            <div className="flex flex-row mb-6 justify-between">
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

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto w-full">
              {filteredData.length > 0 ? (
                filteredData.map((item: Canape) => (
                  <div className="w-full flex justify-center" key={item.id}>
                    <ProductCard
                      key={item.id}
                      item={item}
                      addItems={addItems}
                    />
                  </div>
                ))
              ) : (
                <p>Aucun produit trouvé.</p>
              )}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
