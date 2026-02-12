"use client";

import React, { useEffect, useState, useRef, useCallback, Suspense } from "react";
import SheetDisplay from "../SideBar/MenuGeneral";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AlertElement from "../AlertElement";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";

type Inputs = { search: string };

function NavbarContent() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const searchTerm = watch("search");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currency, setCurrency] = useQueryState("currency", {
    parse: (v) => (v === "GBP" ? "GBP" : "EUR"),
    serialize: (v) => v,
  });

  const toggleCurrency = () => {
    setCurrency(currency === "EUR" ? "GBP" : "EUR");
  };

  const fetchSuggestions = useCallback(async () => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchSuggestions]);

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  const navItems = [
    { href: "/canapes", label: "Canapés" },
    { href: "/produits-nettoyant", label: "Produits d' entretien" },
    { href: "/echantillons", label: "Échantillons" },
  ];

  return (
    <nav className="flex relative z-50 justify-between items-center py-4 w-full text-white">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <Image
            src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/logo.png`}
            alt="Logo"
            width={180}
            height={180}
            className="w-auto"
          />
        </Link>
        <ul className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-1.5    transition-colors duration-200 ${
                    isActive
                      ? "bg-red-600 text-black font-bold shadow-[0_0_0_1px_rgba(220,38,38,0.2)]"
                      : "border-transparent text-white hover:text-red-500 hover:border-red-500 hover:bg-red-500/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {(pathname === "/" ||
        pathname.startsWith("/canapes") ||
        pathname.startsWith("/produits-entretien") ||
        pathname.startsWith("/echantillons")) && (
        <div className="relative z-40 w-full max-w-xl" ref={containerRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Rechercher un produit…"
              autoComplete="off"
              className="px-4 py-2 w-full text-white bg-transparent placeholder-white rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-transparent"
              {...register("search", {
                onChange: () => setShowSuggestions(true),
              })}
            />
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="overflow-auto absolute top-full z-50 mt-1 w-full max-h-60 text-black bg-white rounded-lg shadow-lg">
              {suggestions.map((item) => (
                <Link href={`/produit/${item.id}`} key={item.id}>
                  <li
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <div className="relative flex-shrink-0 w-12 h-12">
                      <Image
                        src={item?.images?.[0] || "/images/default.png"}
                        alt={item?.title || "Produit"}
                        fill
                        unoptimized
                        className="object-contain w-auto rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold truncate">{item.title}</p>
                      <p className="text-sm truncate">{item.color}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex items-center space-x-4">
        <AlertElement />
        {session && (
          <div className="flex items-center space-x-2">
            <span className="hidden lg:block">
              {userName || session.user?.name}
            </span>
            {session.user?.image ? (
              <Image
                src={session.user?.image ?? "/images/profil.png"}
                alt="Profil"
                width={64}
                height={64}
                className="object-cover w-10 h-10 rounded-full"
                unoptimized={true}
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full text-white text-lg font-semibold">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>
        )}
        <button
          onClick={toggleCurrency}
          className="px-3 py-1 text-white rounded border border-white focus:outline-none"
        >
          {currency === "EUR" ? "€ EUR" : "£ GBP"}
        </button>
        <SheetDisplay />
      </div>
    </nav>
  );
}


export const useCurrency = () => {
  const [currency, setCurrency] = useQueryState("currency", {
    parse: (v) => (v === "GBP" ? "GBP" : "EUR"),
    serialize: (v) => v,
  });

  return { currency, setCurrency };
};

function NavbarFallback() {
  return (
    <nav className="flex relative z-50 justify-between items-center py-4 w-full text-white min-h-[4rem]" />
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}
