"use client";
import ProductCard from "@/components/ItemId/Card";
import Navbar from "@/components/Header/Navbar";
import { useTemplate } from "@/app/hook/useTemplate";
import React, { useState } from "react";
import { useSearchArticles, useLikeData } from "@/store/store";
import Filter from "@/components/Header/Filter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const allProducts = filteredData.length > 0 ? filteredData : data || [];
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const paginatedData = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const colorProduct = [...new Set(data?.map((item) => item.color) || [])];
  const seatProduct = [...new Set(data?.map((item) => item.seat) || [])];

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center mt-6 mb-12 w-full container mx-auto">
        <section className="flex flex-col justify-between w-full mb-12">
          <div className="flex flex-col">
            <Navbar />

            <Filter
              data={data}
              colorProduct={colorProduct}
              seatProduct={seatProduct}
            />
            <div className="text-sm text-white flex items-center gap-2 mb-4">
              <Link href="/home">
                <span className="text-gray-500 hover:underline cursor-pointer">
                  Accueil
                </span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-500  ">Canapés</span>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto w-full">
              {paginatedData.length > 0 ? (
                paginatedData.map((item: any) => (
                  <ProductCard key={item.id} item={item} addItems={addItems} />
                ))
              ) : (
                <p>Aucun produit disponible.</p>
              )}
            </section>

            {/* 🔁 Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded border ${
                      currentPage === i + 1
                        ? "bg-white text-black font-bold"
                        : "border-white text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
