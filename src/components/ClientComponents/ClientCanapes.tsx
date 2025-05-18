"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProduitId/Card";
import Navbar from "@/components/Header/Navbar";
import Filter from "@/components/Header/Filter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLikeData } from "@/store/store";
import { useQueryState } from "nuqs";
import LexChat from "../chat/Chat";

export default function CanapesClient({ data }) {
  const { addItems } = useLikeData();
  const [filteredData, setFilteredData] = useState(data || []);

  const [page, setPage] = useQueryState("page", {
    history: "push",
    parse: (v) => parseInt(v || "1"),
    serialize: (v) => String(v),
  });

  const [colorQuery] = useQueryState<string[]>("colors", {
    parse: (v) => v?.split(",").filter(Boolean) || [],
    serialize: (v) => v?.join(",") || "",
  });

  const [seatQuery] = useQueryState<string[]>("seats", {
    parse: (v) => v?.split(",").filter(Boolean) || [],
    serialize: (v) => v?.join(",") || "",
  });

  const [priceQuery] = useQueryState<number[]>("price", {
    parse: (v) => v?.split("-").map(Number) || [],
    serialize: (v) => v?.join("-") || "",
  });

  const [searchQuery] = useQueryState("search", {
    parse: (v) => v ? decodeURIComponent(v) : "",
    serialize: (v) => v ? encodeURIComponent(v) : "",
  });

  const [sortQuery] = useQueryState("sort", {
    parse: (v) => v || "",
    serialize: (v) => v || "",
  });

  // Effet pour appliquer les filtres lorsque les paramètres d'URL changent
  useEffect(() => {
    if (!data) return;
    
    let result = [...data];

    // Filtre par couleur
    if (colorQuery?.length) {
      result = result.filter((item) =>
        colorQuery
          .map((c) => c.toLowerCase())
          .includes(item.color?.toLowerCase())
      );
    }

    // Filtre par nombre de places
    if (seatQuery?.length) {
      const seats = seatQuery.map(Number);
      result = result.filter((item) => seats.includes(item.seat));
    }

    // Filtre par prix
    if (priceQuery?.length === 2) {
      const [min, max] = priceQuery;
      result = result.filter((item) => item.price >= min && item.price <= max);
    }

    // Filtre par recherche
    if (searchQuery) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tri
    if (sortQuery === "Croissant") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortQuery === "Decroissant") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    setFilteredData(result);
  }, [data, colorQuery, seatQuery, priceQuery, searchQuery, sortQuery]);

  const currentPage = page || 1;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const colorProduct = [...new Set(data?.map((item) => item.color) || [])];
  const seatProduct = [...new Set(data?.map((item) => item.seat) || [])];

  return (
    <section className="flex flex-col min-h-screen">
      <LexChat />
      <div className="flex flex-col items-center mt-6 mb-12 w-full container mx-auto">
        <section className="flex flex-col justify-between w-full mb-12">
          <div className="flex flex-col">
            <Navbar />

            <Filter
              data={data || []}
              setPage={(v) => setPage(parseInt(v))}
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
              <span className="text-gray-500">Canapés</span>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto w-full">
              {paginatedData.length > 0 ? (
                paginatedData.map((item: any) => (
                  <ProductCard key={item.id} item={item} addItems={addItems} />
                ))
              ) : (
                <p className="text-white">Aucun produit disponible.</p>
              )}
            </section>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
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
