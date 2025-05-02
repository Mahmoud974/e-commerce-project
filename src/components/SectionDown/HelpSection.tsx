"use client";
import React from "react";

const baseImageUrl = process.env.NEXT_PUBLIC_BANNER_IMAGE || "";

export default function HelpSection() {
  const helpItems = [
    {
      title: "Nous contacter",
      image: baseImageUrl + "/logo-mockup.png",
      link: "/contact",
    },
    {
      title: "Délai de livraison",
      image: baseImageUrl + "delivery1.png",
      link: "/delivery",
    },
    {
      title: "Entretien des meubles",
      image: baseImageUrl + "cleanSofa2.jpg",
      link: "/product-interviews",
    },
    {
      title: "Instructions d’assemblage",
      image: baseImageUrl + "instruction.jpg",
      link: "/assembly-instructions",
    },
    {
      title: "Garantie",
      image: baseImageUrl + "guarantie.jpg",
      link: "/conditions-guarantee",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold mb-8 lg:px-0 px-5">
        Comment pouvons-nous vous aider ?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {helpItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex cursor-pointer flex-col lg:px-0 px-5 items-center text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
