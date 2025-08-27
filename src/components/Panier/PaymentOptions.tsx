"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PaymentOptions({ goToPreviousStep }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const paymentOptions = [
    { id: 1, title: "Carte bancaire (Visa / Mastercard)" },
    { id: 2, title: "Apple Pay" },
    { id: 3, title: "PayPal" },
  ];

  const handleSelectPayment = (id) => {
    setSelectedPayment(id);
    setError("");
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    setError("");
  };

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
    <section className="relative text-white bg-black">
      <div className="container px-6 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Choisir le mode de paiement</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 border cursor-pointer transition-all duration-300 ${
                selectedPayment === option.id
                  ? "border-white bg-[#101010]"
                  : "border-gray-700"
              }`}
              onClick={() => handleSelectPayment(option.id)}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">{option.title}</p>

                {option.id === 1 && (
                  <div className="flex gap-2">
                    <Image
                      src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg"
                      className="p-1 bg-white"
                      alt="Visa"
                      width={40}
                      height={25}
                    />
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      className="p-1 bg-white"
                      alt="Mastercard"
                      width={40}
                      height={25}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Afficher les champs de carte uniquement pour Visa/Mastercard */}
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
                  className="p-3 mt-2 w-full text-black border border-gray-700"
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
                    Date ddd&#39;e#39;e#39;expiration (MM/AA)
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardChange}
                    className="p-3 mt-2 w-full text-black border border-gray-700"
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
                    className="p-3 mt-2 w-full text-black border border-gray-700"
                    placeholder="CVC"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <label className="flex items-center mt-4 space-x-3">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className="w-5 h-5 text-red-600"
            />
            <Link href="/conditions-generales-de-vente">
            <span className="text-gray-300">
              {`J'ai lu les `}
              <a href="#" className="text-blue-400 underline">
                conditions générales de vente
              </a>{" "}
           {`et j'y adhère sans réserve.`}
            </span>
            </Link>
          </label>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goToPreviousStep}
              className="p-4 mt-4 w-full font-bold text-white border cursor-pointer border-white transition duration-300 hover:bg-gray-300"
            >
              Retour
            </button>

            <button
              type="submit"
              className="p-4 mt-4 w-full font-bold  cursor-pointer text-black border border-white bg-white transition duration-300 hover:bg-gray-300"
            >
              Confirmer le paiement
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
