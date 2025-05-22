"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Address() {
  const { data: session, status, update: updateSession } = useSession();
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

  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
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
  }, [session, status, refreshKey]);

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
      setMessage("❌ Veuillez vous connecter pour modifier l'adresse");
      return;
    }

    const requiredFields = [
      "name",
      "address",
      "postalCode",
      "city",
      "country",
      "phone",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setMessage(`❌ Champs requis manquants: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const res = await fetch("/api/user/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.status === 401) {
        setMessage("❌ Votre session a expiré. Veuillez vous reconnecter.");
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        setMessage("❌ Erreur lors du traitement de la réponse");
        return;
      }

      if (res.ok) {
        setUpdatedUserData(data.user);

        setMessage("✅ Adresse mise à jour avec succès !");
        setIsEditing(false);

        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        setMessage(`❌ ${data.message || "Erreur lors de la mise à jour"}`);
      }
    } catch (error) {
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

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Veuillez vous connecter pour gérer votre adresse.</div>;
  }

  const userData = updatedUserData || session?.user;

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Adresse de livraison</h2>
      
      {session?.user?.provider === "google" || session?.user?.provider === "facebook" ? (
        <div className="mb-4 p-3 bg-blue-900 rounded text-sm">
          <p>
            <strong>Note :</strong> La modification de ces coordonnées n'affectera pas votre compte 
            {session?.user?.provider === "google" ? " Google" : " Facebook"}. 
            Ces informations sont uniquement utilisées pour la livraison de vos commandes.
          </p>
        </div>
      ) : null}

      {!isEditing ? (
        <div className="space-y-2">
          <p>
            <strong>Nom :</strong> {userData?.name || "Non renseigné"}
          </p>
          <p>
            <strong>Adresse :</strong> {userData?.address || "Non renseignée"}
          </p>
          <p>
            <strong>Code Postal :</strong>{" "}
            {userData?.postalCode || "Non renseigné"}
          </p>
          <p>
            <strong>Ville :</strong> {userData?.city || "Non renseignée"}
          </p>
          <p>
            <strong>Pays :</strong> {userData?.country || "Non renseigné"}
          </p>
          <p>
            <strong>Téléphone :</strong> {userData?.phone || "Non renseigné"}
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
