"use client";
import React, { useState } from "react";

export default function Address() {
  const [address, setAddress] = useState({
    firstName: "Albert",
    lastName: "YEEERS",
    street: "18 rue Sola Bert",
    postalCode: "56100",
    city: "Meaux",
    country: "France",
    phone: "+33669791234",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Gérer les changements de l'adresse
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour sauvegarder l'adresse
  const handleSave = () => {
    setIsEditing(false);
    alert("Adresse sauvegardée avec succès !");
  };

  return (
    <div className="p-6   text-white -lg space-y-4">
      <h2 className="text-2xl font-bold">📦 Modifier l'adresse</h2>

      {/* Condition ternaire pour basculer entre mode affichage et mode édition */}
      {isEditing ? (
        // Mode édition (formulaire)
        <form className="space-y-4">
          <div>
            <label className="block">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-700 "
            />
          </div>

          <div>
            <label className="block">Nom</label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-700 "
            />
          </div>

          <div>
            <label className="block">Adresse</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-700 "
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block">Code Postal</label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                className="w-full p-2 bg-black border border-gray-700 "
              />
            </div>

            <div className="flex-1">
              <label className="block">Ville</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full p-2 bg-black border border-gray-700 "
              />
            </div>
          </div>

          <div>
            <label className="block">Pays</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-700 "
            />
          </div>

          <div>
            <label className="block">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-700 "
            />
          </div>

          {/* Boutons de sauvegarde et annulation */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="w-full p-3 bg-white  hover:bg-green-700 text-black font-bold"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full p-3 bg-gray-600 -lg hover:bg-gray-700 text-white font-bold"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        // Mode affichage
        <div className="space-y-2">
          <p>
            <strong>Nom :</strong> {`${address.firstName} ${address.lastName}`}
          </p>
          <p>
            <strong>Adresse :</strong> {address.street}
          </p>
          <p>
            <strong>Code Postal :</strong> {address.postalCode}
          </p>
          <p>
            <strong>Ville :</strong> {address.city}
          </p>
          <p>
            <strong>Pays :</strong> {address.country}
          </p>
          <p>
            <strong>Téléphone :</strong> {address.phone}
          </p>

          {/* Bouton pour passer en mode édition */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 w-full p-3     bg-white text-black   font-bold"
          >
            Modifier l'adresse
          </button>
        </div>
      )}
    </div>
  );
}
