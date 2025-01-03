"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function InformationsPurchase() {
  const [formData, setFormData] = useState({
    title: "M",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    newsletter: false,
    acceptTerms: false,
  });

  const [error, setError] = useState(""); // Gestion des erreurs

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 12) {
      setError("Le mot de passe doit comporter au moins 12 caractères.");
      return;
    }
    if (!formData.acceptTerms) {
      setError("Vous devez accepter la politique d'utilisation des données.");
      return;
    }
    alert("Formulaire validé avec succès !");
    setError("");
  };

  return (
    <section className="relative bg-black text-white    ">
      {/* En-tête */}
      <div className="container mx-auto  ">
        {/* Choix de compte */}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className=" px-8  space-y-6">
          <div className="flex space-x-4  ">
            <button className="flex-1 py-3 text-center bg-white text-black font-semibold  ">
              Créer un compte
            </button>
            <button className="flex-1 py-3 text-center border border-gray-500  text-gray-300">
              J'ai déjà un compte
            </button>
          </div>
          {/* Titre */}
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="title"
                value="M"
                checked={formData.title === "M"}
                onChange={handleChange}
              />
              <span>M</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="title"
                value="Mme"
                checked={formData.title === "Mme"}
                onChange={handleChange}
              />
              <span>Mme</span>
            </label>
          </div>

          {/* Prénom et Nom */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom *"
              value={formData.firstName}
              onChange={handleChange}
              className="flex-1 bg-black p-3  border border-gray-700"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom *"
              value={formData.lastName}
              onChange={handleChange}
              className="flex-1 bg-bl p-3  bg-black border border-gray-700"
              required
            />
          </div>

          {/* E-mail */}
          <input
            type="email"
            name="email"
            placeholder="E-mail *"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black p-3  border border-gray-700"
            required
          />

          {/* Mot de passe */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe *"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black p-3  border border-gray-700"
              required
            />
            <p className="text-sm mt-2 text-gray-400">
              Le mot de passe doit avoir au minimum{" "}
              <span className="text-green-400">12 caractères</span> et inclure
              au moins <span className="text-green-400">1 minuscule</span>,{" "}
              <span className="text-green-400">1 majuscule</span>,{" "}
              <span className="text-green-400">1 chiffre</span> et{" "}
              <span className="text-green-400">1 caractère spécial</span>.
            </p>
          </div>

          {/* Date de naissance */}
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full bg-black p-3  border border-gray-700"
          />

          {/* Newsletter */}
          <label className="flex items-center space-x-3 text-gray-300">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            <span>Recevoir notre newsletter</span>
          </label>

          {/* Politique de confidentialité */}
          <label className="flex items-center space-x-3 text-gray-300">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            <span>
              J'ai lu et j'accepte la{" "}
              <a href="#" className="text-blue-400 underline">
                politique d'utilisation des données
              </a>
            </span>
          </label>

          {/* Message d'erreur */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-4  font-bold hover:bg-red-700 transition duration-300"
          >
            CONTINUER
          </button>
        </form>
      </div>
    </section>
  );
}
