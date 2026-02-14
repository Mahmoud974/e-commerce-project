"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HelpSection() {
  const helpItems = [
    {
      title: "Nous contacter",
      image: "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/help/call.jpg",
      link: "/contactez-nous",
    },
    {
      title: "Délai de livraison",
      image: "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/help/fourgon.jpg",
      link: "/infos-livraison",
    },
    {
      title: "Entretien",
      image: "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/help/entretien.jpg",
      link: "/produits-entretien",
    },
    {
      title: "Instructions",
      image: "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/help/instructions.jpg",
      link: "/instructions-assemblage",
    },
    {
      title: "Garantie",
      image: "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/public/help/garantie.jpg",
      link: "/conditions-garantie",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold mb-8 px-5 lg:px-0">
        Comment pouvons-nous vous aider ?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {helpItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group overflow-hidden rounded-xl cursor-pointer flex flex-col items-center text-center px-5 lg:px-0"
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-rotate-2"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                priority={index < 2}
              />
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}