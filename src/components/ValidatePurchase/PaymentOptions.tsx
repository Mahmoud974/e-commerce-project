"use client";
import React, { useState } from "react";

export default function PaymentOptions() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  // Options de paiement
  const paymentOptions = [
    { id: 1, title: "Paiement en ligne sécurisé" },
    { id: 2, title: "Payer en 3 fois avec Alma" },
    { id: 3, title: "Payer en 4 fois avec Alma" },
    { id: 4, title: "Payer en 10 fois avec Alma" },
    { id: 5, title: "Payer en 12 fois avec Alma" },
    { id: 6, title: "Payez en plusieurs fois avec Younited" },
  ];

  // Gestion de la sélection du mode de paiement
  const handleSelectPayment = (id) => {
    setSelectedPayment(id);
    setError("");
  };

  // Gestion de la saisie des informations de carte bancaire
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  // Gestion de l'acceptation des CGV
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    setError("");
  };

  // Validation avant soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      setError("Veuillez sélectionner un mode de paiement.");
      return;
    }
    if (!termsAccepted) {
      setError("Vous devez accepter les conditions générales de vente.");
      return;
    }
    if (
      selectedPayment === 1 &&
      (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvc)
    ) {
      setError(
        "Veuillez remplir toutes les informations de votre carte bancaire."
      );
      return;
    }

    alert(
      `Paiement confirmé avec : ${
        paymentOptions.find((opt) => opt.id === selectedPayment).title
      }`
    );
  };

  return (
    <section className="relative bg-black text-white    ">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Choisir le mode de paiement</h1>

        {/* Liste des options de paiement */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 border  cursor-pointer transition-all duration-300 ${
                selectedPayment === option.id
                  ? "border-white bg-[#101010]"
                  : "border-gray-700"
              }`}
              onClick={() => handleSelectPayment(option.id)}
            >
              <p className="text-lg font-semibold">{option.title}</p>
            </div>
          ))}

          {/* Afficher les champs de carte bancaire uniquement si "Paiement en ligne sécurisé" est sélectionné */}
          {selectedPayment === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm text-gray-300"
                >
                  Numéro de la carte
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  className="w-full p-3 mt-2 border border-gray-700  text-black"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm text-gray-300"
                  >
                    Date d'expiration (MM/AA)
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardChange}
                    className="w-full p-3 mt-2 border border-gray-700  text-black"
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvc" className="block text-sm text-gray-300">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={cardDetails.cvc}
                    onChange={handleCardChange}
                    className="w-full p-3 mt-2 border border-gray-700  text-black"
                    placeholder="CVC"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditions Générales de Vente */}
          <label className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className="w-5 h-5 text-red-600"
            />
            <span className="text-gray-300">
              J'ai lu les{" "}
              <a href="#" className="underline text-blue-400">
                conditions générales de vente
              </a>{" "}
              et j'y adhère sans réserve.
            </span>
          </label>

          {/* Message d'erreur */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Bouton de validation */}
          <button
            type="submit"
            className="w-full bg-white text-black   p-4  font-bold hover:border-white hover:bg-none transition duration-300"
          >
            Confirmer le paiement
          </button>
          <button
            type="button"
            className="w-full border border-white text-white p-4  font-bold hover:bg-gray-300 transition duration-300"
          >
            Annuler
          </button>
        </form>
      </div>
    </section>
  );
}
