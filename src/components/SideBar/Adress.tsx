"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Address() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    console.log("Status de la session:", status);
    console.log("Session actuelle:", session);

    if (status === "authenticated" && session?.user) {
      setFormData({
        name: session.user.name || "",
        address: session.user.address || "",
        postalCode: session.user.postalCode || "",
        city: session.user.city || "",
        country: session.user.country || "France",
        phone: session.user.phone || "",
      });
    }
  }, [session, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (status !== "authenticated" || !session?.user) {
      console.log("Status de la session:", status);
      console.log("Session actuelle:", session);
      setMessage("❌ Veuillez vous connecter pour modifier l'adresse");
      return;
    }

    try {
      console.log("Envoi de la requête avec la session:", session);
      console.log("Status lors de l'envoi:", status);

      const res = await fetch("/api/user/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Réponse du serveur:", data);

      if (res.ok) {
        setMessage("✅ Adresse mise à jour avec succès !");
        setIsEditing(false);
      } else {
        setMessage(`❌ ${data.message || "Erreur lors de la mise à jour"}`);
        console.error("Détails de l'erreur:", data);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setMessage("❌ Erreur de connexion au serveur");
    }
  };

  const startEditing = () => {
    if (status !== "authenticated") {
      setMessage("❌ Veuillez vous connecter pour modifier l'adresse");
      return;
    }
    setIsEditing(true);
    setMessage("");
  };

  // Si on charge la session
  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  // Si pas connecté
  if (status === "unauthenticated") {
    return <div>Veuillez vous connecter pour gérer votre adresse.</div>;
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Adresse de livraison</h2>

      {!isEditing ? (
        <div className="space-y-2">
          <p>
            <strong>Nom :</strong> {session?.user?.name || "Non renseigné"}
          </p>
          <p>
            <strong>Adresse :</strong>{" "}
            {session?.user?.address || "Non renseignée"}
          </p>
          <p>
            <strong>Code Postal :</strong>{" "}
            {session?.user?.postalCode || "Non renseigné"}
          </p>
          <p>
            <strong>Ville :</strong> {session?.user?.city || "Non renseignée"}
          </p>
          <p>
            <strong>Pays :</strong> {session?.user?.country || "Non renseigné"}
          </p>
          <p>
            <strong>Téléphone :</strong>{" "}
            {session?.user?.phone || "Non renseigné"}
          </p>
          <button
            onClick={startEditing}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Modifier l'adresse
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Code Postal
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ville</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pays</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.includes("✅") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
