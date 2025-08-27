"use client";
import React, { useState } from "react";

export default function DeliveryOption({
  goToNextStep,
  goToPreviousStep,
  setDeliveryOption,
}: {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setDeliveryOption: (option: {
    id: number;
    title: string;
    description: string;
    price: string;
  }) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const deliveryOptions = [
    {
      id: 1,
      title: "Livraison devant chez vous sur rendez-vous",
      description:
        "Livraison à domicile au pied du camion sur RDV. Disponible en France (hors Corse et îles), Belgique et Luxembourg.",
      price: "99,00 € ",
    },
    {
      id: 2,
      title: "Livraison chez vous dans la pièce de votre choix sur rendez-vous",
      description:
        "Livraison à domicile sur RDV directement dans la pièce de votre choix. Disponible en France (hors Corse et îles), Belgique et Luxembourg.",
      price: "129,00 € ",
    },
    {
      id: 3,
      title: "Retrait chez Best Mobilier - 59554 Raillencourt-Sainte-Olle",
      description:
        "Retirez votre produit gratuitement sur RDV dans notre dépôt près de Cambrai. Retraits les lundis et vendredis de 9h à 11h30, mardis, mercredis et jeudis de 9h à 11h30 et de 14h à 15h.",
      price: "Gratuit",
    },
  ];

  const handleSelect = (id: number) => {
    const selected = deliveryOptions.find((opt) => opt.id === id);
    if (selected) {
      setSelectedOption(id);
      setDeliveryOption(selected);
      alert(`Vous avez sélectionné : ${selected.title}`);
    }
  };

  return (
    <section className="relative px-4 py-10 text-white bg-black">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl">
          Choisir le mode de livraison
        </h1>

        {/* Options */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`cursor-pointer p-6 rounded-md transition-all duration-300 border flex flex-col min-h-[280px] ${ 
                selectedOption === option.id
                  ? "bg-[#101010] border-white scale-[1.02]"
                  : "border-gray-700 hover:border-white"
              }`}
            >
              <h2 className="mb-2 text-lg font-semibold">{option.title}</h2>
              <p className="mb-4 text-sm text-gray-400 flex-grow">{option.description}</p>
              <p className="mb-4 font-bold">{option.price}</p>
              <button
                className={`w-full py-2 text-sm font-bold rounded mt-auto ${ 
                  selectedOption === option.id
                    ? "bg-[#101010] text-white border border-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {selectedOption === option.id ? "Sélectionné" : "Sélectionner"}
              </button>
            </div>
          ))}
        </div>

        {/* Boutons navigation */}
        <div className="flex flex-col gap-4 justify-center mt-10 md:flex-row">
          <button
            onClick={goToPreviousStep}
            className="py-3 w-full font-bold text-white border border-white transition md:w-1/2 hover:bg-white hover:text-black"
          >
            Retour
          </button>
          <button
            onClick={goToNextStep}
            className="py-3 w-full font-bold text-black bg-white transition md:w-1/2 hover:bg-gray-200"
          >
            Continuer
          </button>
        </div>

        {/* Message */}
        <p className="mx-auto mt-10 max-w-2xl text-sm text-center text-gray-400">
          Pour assurer une livraison sur mesure, notre transporteur vous
          adressera un SMS. Profitez de cette occasion pour lui faire part de
          vos commentaires ou de toute autre précision que vous souhaiteriez
          partager.
        </p>
      </div>
    </section>
  );
}
