"use client";

import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProduitId/Card";
import Navbar from "@/components/Header/Navbar";
import Filter from "@/components/Header/Filter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTemplate } from "@/app/hook/useTemplate";
import { useLikeData } from "@/store/store";
import { useQueryState } from "nuqs";

export default function CanapesClient() {
  const { data } = useTemplate();
  const { addItems } = useLikeData();

  const [page, setPage] = useQueryState("page", {
    history: "push",
    parse: (v) => parseInt(v),
    serialize: (v) => String(v),
  });

  const [colorQuery] = useQueryState<string[]>("colors", {
    parse: (v) => v.split(","),
    serialize: (v) => v.join(","),
  });

  const [seatQuery] = useQueryState<string[]>("seats", {
    parse: (v) => v.split(","),
    serialize: (v) => v.join(","),
  });

  const [priceQuery] = useQueryState<number[]>("price", {
    parse: (v) => v.split("-").map(Number),
    serialize: (v) => v.join("-"),
  });

  const [searchQuery] = useQueryState("search", {
    parse: (v) => decodeURIComponent(v),
    serialize: (v) => encodeURIComponent(v),
  });

  const [sortQuery] = useQueryState("sort", {
    parse: (v) => v,
    serialize: (v) => v,
  });

  const currentPage = page || 1;
  const itemsPerPage = 15;

  let filtered = data || [];

  // ✅ Filtres dynamiques
  if (colorQuery?.length) {
    filtered = filtered.filter((item) =>
      colorQuery.map((c) => c.toLowerCase()).includes(item.color?.toLowerCase())
    );
  }

  if (seatQuery?.length) {
    const seats = seatQuery.map(Number);
    filtered = filtered.filter((item) => seats.includes(item.seat));
  }

  if (priceQuery?.length === 2) {
    const [min, max] = priceQuery;
    filtered = filtered.filter(
      (item) => item.price >= min && item.price <= max
    );
  }

  if (searchQuery) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // ✅ Tri dynamique
  if (sortQuery === "Croissant") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortQuery === "Decroissant") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
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
