"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProduitId/Card";
import Filter from "@/components/Header/Filter";
import { useQueryState } from "nuqs";
import LexChat from "../chat/Chat";
import ProductLayout from "@/components/Layouts/ProductLayout";
import { Item } from "@/app/types/canape";

export default function CanapesClient({ data }: { data: Item[] }) {
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
    parse: (v) => (v ? decodeURIComponent(v) : ""),
    serialize: (v) => (v ? encodeURIComponent(v) : ""),
  });

  const [sortQuery] = useQueryState("sort", {
    parse: (v) => v || "",
    serialize: (v) => v || "",
  });

  useEffect(() => {
    if (!data) return;

    let result = [...data];

    if (colorQuery?.length) {
      result = result.filter((item: Item) =>
        colorQuery
          .map((c) => c.toLowerCase())
          .includes(item.color?.toLowerCase())
      );
    }

    if (seatQuery?.length) {
      const seats = seatQuery.map(Number);
      result = result.filter((item: Item) => seats.includes(item.seat));
    }

    if (priceQuery?.length === 2) {
      const [min, max] = priceQuery;
      result = result.filter((item: Item) => item.price >= min && item.price <= max);
    }

    if (searchQuery) {
      result = result.filter((item: Item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortQuery === "Croissant") {
      result = [...result].sort((a: Item, b: Item) => a.price - b.price);
    } else if (sortQuery === "Decroissant") {
      result = [...result].sort((a: Item, b: Item) => b.price - a.price);
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

  const colorProduct = [...new Set(data?.map((item: Item) => item.color) || [])];
  const seatProduct = [...new Set(data?.map((item: Item) => item.seat) || [])];

  return (
    <ProductLayout
      title="Canapés"
      description="Découvrez notre sélection de canapés confortables et élégants pour votre intérieur."
      breadcrumbs={[{ label: "Accueil", href: "/home" }, { label: "Canapés" }]}
    >
      <section className="flex flex-col min-h-screen">
        <div className="flex flex-col items-center w-full">
          <section className="flex flex-col justify-between w-full mb-8 sm:mb-12">
            <div className="flex flex-col">
              <Filter
                data={data || []}
                setPage={(v) => setPage(parseInt(v))}
                colorProduct={colorProduct}
                seatProduct={seatProduct}
              />
              <LexChat />

              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mx-auto w-full">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item: Item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                    />
                  ))
                ) : (
                  <p className="text-white text-center col-span-full">
                    Aucun produit disponible.
                  </p>
                )}
              </section>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded border ${
                        currentPage === i + 1
                          ? "bg-white text-black font-bold"
                          : "border-white text-white hover:bg-gray-800 transition-colors"
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
    </ProductLayout>
  );
}
