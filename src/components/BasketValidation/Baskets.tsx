"use client";
import { useCartStore } from "@/store/store";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Baskets() {
  const [showForm, setShowForm] = useState(false);
  const { items, removeItem, updateQuantity } = useCartStore();

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
    firstName: "Yer",
    lastName: "Mdfa",
    street: "123 Rue Edouard",
    city: "Balan",
    postalCode: "16000",
    country: "France",
    phoneNumber: "+33669112343",
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (addressData.phoneNumber.length < 10) {
      setError("Le numéro de téléphone doit comporter au moins 10 chiffres.");
      return;
    }
    alert("Adresse enregistrée avec succès !");
    setError("");
    setShowForm(false);
  };

  return (
    <section className="relative bg-black text-white    ">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl text-white font-bold mb-6">Mon panier</h1>
        {!showForm && (
          <div className="max-w-6xl ">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 cursor-pointer  transition-transform duration-200 rounded-lg p-2"
              >
                <Link href={`/item/${item.id}`} className=" ">
                  <div className="flex items-center">
                    <Image
                      src={item?.image[0]}
                      alt="product image"
                      className="object-contain p-1 w-16 h-16"
                      width={64}
                      height={64}
                      priority
                    />
                    <div className="ml-3">
                      <div className="text-lg font-bold">{item.nom}</div>
                      <div className="text-gray-400">{item.prix}€</div>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item?.quantity || 1}
                    // onChange={(e) =>
                    //   handleQuantityChange(item.id, parseInt(e.target.value))
                    // }
                    className="w-16 p-1 text-center border rounded text-white bg-black"
                    min="1"
                  />

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}

            <button className="border p-3 mt-12 rounded-md">
              <Link href="/">{"<"} CONTINUER MES ACHATS</Link>
            </button>
          </div>
        )}

        {/* Formulaire d'ajout d'adresse */}
        {showForm && (
          <form onSubmit={handleSubmit} className="    space-y-6  ">
            <h2 className="text-2xl font-bold mb-4">
              Indiquez vos détails de livraison.
            </h2>
            <p></p>

            {/* Nom et Prénom */}
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom *"
                value={addressData.firstName}
                onChange={handleChange}
                className="w-full bg-none p-3  border border-gray-700"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom *"
                value={addressData.lastName}
                onChange={handleChange}
                className="w-full bg-black p-3  border border-gray-700"
                required
              />
            </div>

            {/* Rue */}
            <input
              type="text"
              name="street"
              placeholder="Adresse *"
              value={addressData.street}
              onChange={handleChange}
              className="w-full bg-black p-3  border border-gray-700"
              required
            />

            {/* Ville */}
            <input
              type="text"
              name="city"
              placeholder="Ville *"
              value={addressData.city}
              onChange={handleChange}
              className="w-full bg-black p-3  border border-gray-700"
              required
            />

            {/* Code Postal */}
            <input
              type="text"
              name="postalCode"
              placeholder="Code Postal *"
              value={addressData.postalCode}
              onChange={handleChange}
              className="w-full bg-black p-3  border border-gray-700"
              required
            />

            {/* Pays */}
            <select
              name="country"
              value={addressData.country}
              onChange={handleChange}
              className="w-full bg-black p-3 text-slate-500 border border-gray-700"
              required
            >
              <option value="" className="">
                Sélectionner un pays *
              </option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Canada">Canada</option>
            </select>

            {/* Numéro de téléphone */}
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Numéro de téléphone *"
              value={addressData.phoneNumber}
              onChange={handleChange}
              className="w-full bg-black p-3  border border-gray-700"
              required
            />

            {/* Message d'erreur */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Boutons */}
            <div className="flex gap-5">
              <button
                type="submit"
                className="w-full  bg-white text-black   p-4  font-bold  hover:bg-slate-100 transition duration-300"
              >
                Enregistrer l'adresse
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full border border-white text-white p-4  font-bold hover:bg-gray-300 transition duration-300"
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
