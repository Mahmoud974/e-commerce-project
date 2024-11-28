import React from "react";
import ProductCard from "./Card";
import { useTemplate } from "@/hook/useTemplate";

export default function Recommendations() {
  const { data } = useTemplate();

  // Ensure fivesRecommendations is an array
  let fivesRecommendations = (data && data.slice(0, 5)) || [];

  const addItems = (item) => {
    console.log("Ajout de l'article aux favoris :", item);
  };

  return (
    <section className="container mx-auto my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {fivesRecommendations.length > 0 ? (
          fivesRecommendations.map((item) => (
            <ProductCard key={item.id} item={item} addItems={addItems} />
          ))
        ) : (
          <div>No recommendations available</div>
        )}
      </div>
    </section>
  );
}
