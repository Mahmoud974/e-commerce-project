"use client";
import React, { useState } from "react";

export default function AddressForm({ goToNextStep, goToPreviousStep }) {
  const [showForm, setShowForm] = useState(false);
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");

  const defaultAddress = {
    firstName: "Mahmoud",
    lastName: "Moussa",
    street: "123 Rue Edouard",
    city: "Balan",
    postalCode: "16000",
    country: "France",
    phoneNumber: "+33669112343",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (
      !addressData.firstName ||
      !addressData.lastName ||
      !addressData.street ||
      !addressData.city ||
      !addressData.postalCode
    ) {
      setError("Tous les champs marqués * sont obligatoires.");
      return;
    }

    // Validation du numéro de téléphone
    if (addressData.phoneNumber.length < 10) {
      setError("Le numéro de téléphone doit comporter au moins 10 chiffres.");
      return;
    }

    setError("");
    alert("Adresse enregistrée avec succès !");
    setShowForm(false);

    // Aller à l'étape suivante
    if (typeof goToNextStep === "function") {
      goToNextStep();
    }
  };

  return (
    <section className="relative bg-black text-white">
      <div className="container mx-auto px-6">
        {!showForm ? (
          <div className="max-w-6xl">
            <h1 className="text-3xl text-white font-bold mb-6">
              Adresse sélectionnée
            </h1>
            <p className="text-lg mb-4">
              {defaultAddress.firstName} {defaultAddress.lastName},<br />
              {defaultAddress.street}, {defaultAddress.postalCode}{" "}
              {defaultAddress.city}, {defaultAddress.country},<br />
              {defaultAddress.phoneNumber}
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="w-full mb-4 bg-white text-black p-4 font-bold hover:bg-slate-100 transition duration-300"
            >
              Indiquez vos détails de livraison.
            </button>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={billingDifferent}
                  onChange={() => setBillingDifferent(!billingDifferent)}
                />
                L'adresse de facturation diffère de l'adresse de livraison
              </label>
            </div>
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              Indiquez vos détails de livraison.
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom *"
                value={addressData.firstName}
                onChange={handleChange}
                className="w-full bg-none p-3 border border-gray-700"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom *"
                value={addressData.lastName}
                onChange={handleChange}
                className="w-full bg-black p-3 border border-gray-700"
                required
              />
            </div>

            <input
              type="text"
              name="street"
              placeholder="Adresse *"
              value={addressData.street}
              onChange={handleChange}
              className="w-full bg-black p-3 border border-gray-700"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="Ville *"
              value={addressData.city}
              onChange={handleChange}
              className="w-full bg-black p-3 border border-gray-700"
              required
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Code Postal *"
              value={addressData.postalCode}
              onChange={handleChange}
              className="w-full bg-black p-3 border border-gray-700"
              required
            />

            <select
              name="country"
              value={addressData.country}
              onChange={handleChange}
              className="w-full bg-black p-3 text-slate-500 border border-gray-700"
              required
            >
              <option value="">Sélectionner un pays *</option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Canada">Canada</option>
            </select>

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Numéro de téléphone *"
              value={addressData.phoneNumber}
              onChange={handleChange}
              className="w-full bg-black p-3 border border-gray-700"
              required
            />

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-5">
              <button
                type="submit"
                className="w-full bg-white text-black p-4 font-bold hover:bg-slate-100 transition duration-300"
              >
                Enregistrer l'adresse
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full border border-white text-white p-4 font-bold hover:bg-gray-300 transition duration-300"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
