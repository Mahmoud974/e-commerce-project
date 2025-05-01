"use client";
import React, { useState } from "react";

export default function DeliveryOption({ goToNextStep, goToPreviousStep }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const deliveryOptions = [
    {
      id: 1,
      title: "Livraison devant chez vous sur rendez-vous",
      description:
        "Livraison à domicile avec dépôt du colis au pied du camion sur RDV. En France (hors Corse et îles), Belgique et au Luxembourg.",
      price: "99,00 € TTC",
    },
    {
      id: 2,
      title: "Livraison chez vous dans la pièce de votre choix sur rendez-vous",
      description:
        "Livraison à domicile sur RDV dans la pièce de votre choix. En France (hors Corse et îles), Belgique et au Luxembourg.",
      price: "129,00 € TTC",
    },
    {
      id: 3,
      title: "Retrait chez Best Mobilier - 59554 Raillencourt-Sainte-Olle",
      description:
        "Retirez votre produit gratuitement et sur rendez-vous dans notre dépôt situé près de Cambrai dans le Nord. Retrait sur rendez-vous uniquement, les lundis et vendredis de 9h à 11h30 et les mardis, mercredis et jeudi de 9h à 11h30 et de 14h à 15h.",
      price: "Gratuit",
    },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id);
    alert(
      `Vous avez sélectionné l'option : ${
        deliveryOptions.find((opt) => opt.id === id).title
      }`
    );
  };

  return (
    <section className="relative bg-black text-white   ">
      <div className="container mx-auto  ">
        <h1 className="text-3xl font-bold mb-6 pb-5 text-center">
          Choisir le mode de livraison
        </h1>

        {/* Liste des options de livraison avec dimensions carrées */}
        <div className="flex flex-wrap justify-center gap-8">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={`w-72 h-auto flex flex-col justify-between p-6 border cursor-pointer transition-all duration-300 
                ${
                  selectedOption === option.id
                    ? "border-white bg-[#101010] scale-105"
                    : "border-gray-700"
                }`}
              onClick={() => handleSelect(option.id)}
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{option.title}</h2>
                <p className="text-gray-300 text-sm mb-4">
                  {option.description}
                </p>
              </div>
              <p className="text font-semibold mb-4">{option.price}</p>
              <button
                className={`w-full p-4 font-bold  ${
                  selectedOption === option.id
                    ? "bg-[#101010] text-white"
                    : "bg-white text-black"
                }`}
              >
                {selectedOption === option.id ? "Sélectionné" : "Sélectionner"}
              </button>
            </div>
          ))}
          <div className="flex gap-3">
            <button
              onClick={goToPreviousStep}
              className="w-full mt-4 border border-white text-white p-4 font-bold hover:bg-gray-300 transition duration-300"
            >
              Retour
            </button>

            <button
              onClick={goToNextStep}
              className="w-full mt-6 bg-white text-black p-4 font-bold hover:bg-slate-100 transition duration-300"
            >
              Continuer
            </button>
          </div>
        </div>

        {/* Message d'information */}
        <p className="text-sm mt-8 text-gray-400 text-center w-7/12  mx-auto">
          Pour assurer une livraison sur mesure, notre transporteur vous
          adressera un SMS. Profitez de cette occasion pour lui faire part de
          vos commentaires ou de toute autre précision que vous souhaiteriez
          partager.
        </p>
      </div>
    </section>
  );
}
