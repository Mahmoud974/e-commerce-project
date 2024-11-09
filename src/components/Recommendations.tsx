"use client";
import React from "react";
import Image from "next/image";
import ProductCard from "./Card";

export default function Recommendations() {
  // Liste des produits recommandés (exemple)
  const recommendedProducts = [
    {
      id: 1,
      nom: "Table de repas avec rallonge Kingston",
      prix: "1 199,00 €",
      image: "/img/table1.webp",
    },
    {
      id: 2,
      nom: "Chaise en bois massif",
      prix: "199,00 €",
      image: "/img/chair1.webp",
    },
    {
      id: 3,
      nom: "Table de repas avec rallonge Kingston",
      prix: "1 199,00 €",
      image: "/img/table1.webp",
    },
    {
      id: 4,
      nom: "Chaise en bois massif",
      prix: "199,00 €",
      image: "/img/chair1.webp",
    },
    {
      id: 5,
      nom: "Table de repas avec rallonge Kingston",
      prix: "1 199,00 €",
      image: "/img/table1.webp",
    },
  ];

  const addItems = (item) => {
    console.log("Ajout de l'article aux favoris :", item);
  };

  return (
    <section className="container mx-auto my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recommendedProducts.map((item) => (
          <ProductCard key={item.id} item={item} addItems={addItems} />
        ))}
      </div>
    </section>
  );
}
