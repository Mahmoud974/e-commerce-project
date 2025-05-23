"use client";
import React, { useState, useEffect } from "react";
import { useSession, update } from "next-auth/react";

export default function AddressForm({ goToNextStep, goToPreviousStep }) {
  const { data: session, status } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [message, setMessage] = useState("");
  const [addressData, setAddressData] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
  });

  const [updatedUserData, setUpdatedUserData] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Status de la session:", status);
    console.log("Session actuelle:", session);

    if (status === "authenticated" && session?.user) {
      setAddressData({
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
    setAddressData((prev) => ({
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
      setError("Veuillez vous connecter pour modifier l'adresse");
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
    const missingFields = requiredFields.filter((field) => !addressData[field]);
    if (missingFields.length > 0) {
      setMessage(`❌ Champs requis manquants: ${missingFields.join(", ")}`);
      setError(`Champs requis manquants: ${missingFields.join(", ")}`);
      return;
    }

    try {
      console.log("Envoi de la requête avec la session:", session);
      console.log("Status lors de l'envoi:", status);
      console.log("Données envoyées:", addressData);
      const res = await fetch("/api/user/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
        credentials: "include",
      });

      console.log("Statut de la réponse:", res.status);
      console.log(
        "Headers de la réponse:",
        Object.fromEntries(res.headers.entries())
      );

      if (res.status === 401) {
        setMessage("❌ Votre session a expiré. Veuillez vous reconnecter.");
        setError("Votre session a expiré. Veuillez vous reconnecter.");
        console.error("Erreur d'authentification (401)");
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error("Erreur lors du parsing JSON:", jsonError);
        setMessage("❌ Erreur lors du traitement de la réponse");
        setError("Erreur lors du traitement de la réponse");
        return;
      }

      console.log("Réponse du serveur:", data);

      if (res.ok) {
        setMessage("✅ Adresse mise à jour avec succès !");
        setError("");
        setShowForm(false);

        setUpdatedUserData(data.user);

        await update();

        if (typeof goToNextStep === "function") {
          goToNextStep();
        }
      } else {
        setMessage(`❌ ${data.message || "Erreur lors de la mise à jour"}`);
        setError(data.message || "Erreur lors de la mise à jour");
        console.error("Détails de l'erreur:", data);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setMessage("❌ Erreur de connexion au serveur");
      setError("Erreur de connexion au serveur");
    }
  };

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Veuillez vous connecter pour gérer votre adresse.</div>;
  }

  const userData = updatedUserData || session?.user;

  const hasCompleteAddress =
    userData?.name &&
    userData?.address &&
    userData?.postalCode &&
    userData?.city &&
    userData?.country &&
    userData?.phone;

  return (
    <section className="relative bg-black text-white">
      <div className="container mx-auto px-6">
        {!showForm ? (
          <div className="max-w-6xl">
            <h1 className="text-3xl text-white font-bold mb-6">
              Adresse sélectionnée
            </h1>

            <div className="   rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Nom</p>
                  <p className="text-lg">{userData?.name || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Téléphone</p>
                  <p className="text-lg">
                    {userData?.phone || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adresse</p>
                  <p className="text-lg">
                    {userData?.address || "Non renseignée"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Code postal</p>
                  <p className="text-lg">
                    {userData?.postalCode || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ville</p>
                  <p className="text-lg">
                    {userData?.city || "Non renseignée"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pays</p>
                  <p className="text-lg">{userData?.country || "France"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full mb-4 bg-white text-black p-4 font-bold hover:bg-slate-100 transition duration-300"
            >
              Modifier l'adresse de livraison
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
            {!hasCompleteAddress && (
              <p className="text-red-500 my-2">
                Veuillez remplir vos coordonnées avant de continuer
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={goToPreviousStep}
                className="w-full mt-4 border border-white text-white p-4 font-bold hover:bg-gray-300 transition duration-300"
              >
                Retour
              </button>

              <button
                onClick={
                  hasCompleteAddress ? goToNextStep : () => setShowForm(true)
                }
                className={`w-full mt-6 ${
                  hasCompleteAddress
                    ? "bg-white text-black hover:bg-slate-100"
                    : "bg-gray-500 text-white cursor-not-allowed"
                } p-4 font-bold transition duration-300`}
              >
                Continuer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              Indiquez vos détails de livraison
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                name="name"
                value={addressData.name}
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
                value={addressData.address}
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
                value={addressData.postalCode}
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
                value={addressData.city}
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
                value={addressData.country}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={addressData.phone}
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
