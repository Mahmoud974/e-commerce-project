"use client";

import React, { useEffect, useState, useRef } from "react";
import SheetDisplay from "../SideBar/MenuGeneral";
import { useTemplate } from "@/app/hook/useTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchArticles } from "@/store/store";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AlertElement from "../AlertElement";
import { usePathname } from "next/navigation";

type Inputs = {
  search: string;
};

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { data } = useTemplate();
  const { setFilteredData, filteredData } = useSearchArticles();

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const searchTerm = watch("search");

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // Met à jour les données filtrées et suggestions
  useEffect(() => {
    if (data) {
      setFilteredData(data, searchTerm);
      const list = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setSuggestions(searchTerm ? list.slice(0, 5) : []);
    }
  }, [data, searchTerm, setFilteredData]);

  // Ferme suggestions au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  const handleSuggestionClick = (item) => {
    // on peut router vers la fiche produit si besoin
    setShowSuggestions(false);
    // exemple: navigate(`/product/${item.id}`)
  };

  return (
    <nav className="w-full  text-white py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <Image
              src={process.env.NEXT_PUBLIC_BANNER_IMAGE + "/logo.png"}
              alt="Logo"
              width={180}
              height={180}
            />
          </Link>
          <ul className="  gap-6">
            <Link href="/">
              <li className="hover:underline cursor-pointer">Canapés</li>
            </Link>
            <li className="hover:underline cursor-pointer">Produits</li>
            <Link href="/echantillons">
              <li className="hover:underline cursor-pointer">Échantillons</li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <AlertElement />
          {session && (
            <div className="flex items-center gap-2">
              <span className="hidden lg:block">{session.user?.title}</span>
              <Image
                src={session.user?.image ?? "/default.png"}
                alt="Profil"
                className="w-8 h-8 rounded-full object-cover"
                width={32}
                height={32}
              />
            </div>
          )}
          <SheetDisplay />
        </div>
      </div>

      {/* Barre de recherche avec suggestions */}
      {pathname === "/" && (
        <div
          className="w-full flex   justify-center relative"
          ref={containerRef}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full py-2 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...register("search", {
                onChange: () => setShowSuggestions(true),
              })}
            />
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 z-20 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-auto max-h-60">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.image[0]}
                      alt={item.title}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="ml-3 text-gray-800 truncate font-bold">
                      {item.title}
                    </p>
                    <small className="ml-3 text-gray-800 truncate">
                      {item.color}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}
