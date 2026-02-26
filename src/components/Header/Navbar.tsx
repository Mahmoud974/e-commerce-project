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
    defaultValue: "EUR",
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
    <nav className="relative z-50 w-full   text-white px-4 py-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT SECTION */}
      <div className="flex flex-col gap-4 w-full lg:w-auto">

        <Link href="/">
          <Image
            src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/logo.png`}
            alt="Logo"
            width={180}
            height={180}
            className="w-32 h-auto"
          />
        </Link>

        <ul className="flex gap-3 overflow-x-auto scrollbar-hide lg:overflow-visible">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-red-600 text-black font-bold shadow-md"
                      : "text-white hover:text-red-500 hover:bg-red-500/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* SEARCH */}
      {(pathname === "/" ||
        pathname.startsWith("/canapes") ||
        pathname.startsWith("/produits-entretien") ||
        pathname.startsWith("/echantillons")) && (
        <div className="relative z-40 w-full lg:max-w-xl" ref={containerRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Rechercher un produit…"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              {...register("search", {
                onChange: () => setShowSuggestions(true),
              })}
            />
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full max-h-72 overflow-auto bg-white rounded-xl shadow-2xl z-50">
              {suggestions.map((item) => (
                <Link href={`/produit/${item.id}`} key={item.id}>
                  <li
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <div className="relative flex-shrink-0 w-12 h-12">
                      <Image
                        src={item?.images?.[0] || "/images/default.png"}
                        alt={item?.title || "Produit"}
                        fill
                        unoptimized
                        className="object-contain rounded"
                      />
                    </div>
                    <div>
                      <p className="font-semibold truncate">{item.title}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {item.color}
                      </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
        <AlertElement />

        {session && (
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-sm font-medium">
              {userName || session.user?.name}
            </span>
            {session.user?.image ? (
              <Image
                src={session.user?.image ?? "/images/profil.png"}
                alt="Profil"
                width={64}
                height={64}
                className="object-cover w-10 h-10 rounded-full"
                unoptimized
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
          className="px-4 py-2 rounded-lg border border-white/30 text-sm font-medium hover:bg-white/10 transition-all"
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
    defaultValue: "EUR",
    parse: (v) => (v === "GBP" ? "GBP" : "EUR"),
    serialize: (v) => v,
  });

  return { currency, setCurrency };
};

function NavbarFallback() {
  return (
    <nav className="relative z-50 w-full bg-black text-white px-4 py-3 min-h-[4rem]" />
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}