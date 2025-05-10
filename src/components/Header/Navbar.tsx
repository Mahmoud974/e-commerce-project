"use client";

import React, { useEffect, useState, useRef, KeyboardEvent } from "react";
import SheetDisplay from "../SideBar/MenuGeneral";
import { useTemplate } from "@/app/hook/useTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AlertElement from "../AlertElement";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";

type Inputs = { search: string };

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { data } = useTemplate();
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const searchTerm = watch("search");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    parse: (v) => decodeURIComponent(v),
    serialize: (v) => encodeURIComponent(v),
  });

  useEffect(() => {
    if (data) {
      const list = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setSuggestions(searchTerm ? list.slice(0, 5) : []);
    }
  }, [data, searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm !== undefined) {
        setSearchQuery(searchTerm);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

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

  const navLinkKey = (e: KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = href;
    }
  };

  const navItems = [
    { href: "/", label: "Canapés" },
    { href: "/produits", label: "Produits" },
    { href: "/echantillons", label: "Échantillons" },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Barre de navigation principale"
      className="relative z-50 w-full flex items-center justify-between py-4 text-white"
    >
      {/* === GAUCHE === */}
      <div className="flex items-center space-x-8">
        <Link
          href="/home"
          aria-label="Accueil"
          tabIndex={0}
          className="focus:outline-none focus:ring-2 focus:ring-white rounded"
          onKeyDown={(e) => navLinkKey(e, "/home")}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/logo.png`}
            alt="Logo"
            width={180}
            height={180}
          />
        </Link>

        <ul role="menubar" className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                tabIndex={0}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
                onKeyDown={(e) => navLinkKey(e, item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* === MILIEU : recherche === */}
      {pathname === "/" && (
        <div className="relative z-40 w-1/3" ref={containerRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Rechercher un produit…"
              aria-label="Recherche de produit"
              className="w-full py-2 px-4 border border-white bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...register("search", {
                onChange: () => setShowSuggestions(true),
              })}
            />
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-white text-black rounded-lg shadow-lg max-h-60 overflow-auto z-50">
              {suggestions.map((item) => (
                <Link href={`/produit/${item.id}`} key={item.id}>
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-contain rounded"
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

      {/* === DROITE === */}
      <div className="flex items-center space-x-4">
        <AlertElement />
        {session && (
          <div className="flex items-center space-x-2">
            <span className="hidden lg:block">{session.user?.title}</span>
            <Image
              src={session.user?.image ?? "/default.png"}
              alt="Photo de profil"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
        )}
        <SheetDisplay />
      </div>
    </nav>
  );
}
