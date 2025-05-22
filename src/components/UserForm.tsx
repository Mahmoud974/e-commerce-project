"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Composant de débogage qui affiche les informations de session
function SessionDebug() {
  const { data: session, status } = useSession();

  return (
    <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-red-700">
      <h3 className="text-white font-bold mb-2">Débogage Session</h3>
      <div className="text-white text-sm">
        <p>Status: {status}</p>
        <p>Session: {session ? "Présente" : "Absente"}</p>
        {session && (
          <div>
            <p>Email: {session.user?.email}</p>
            <p>Nom: {session.user?.name}</p>
            <details>
              <summary className="cursor-pointer">Détails complets</summary>
              <pre className="mt-2 p-2 bg-black rounded overflow-auto text-xs">
                {JSON.stringify(session, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UserForm() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    country: "France",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Session actuelle:", session);
    console.log("Status de la session:", status);

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (status !== "authenticated") {
      setMessage(
        "❌ Vous devez être connecté pour enregistrer vos coordonnées"
      );
      setLoading(false);
      return;
    }

    try {
      console.log("Envoi des données:", formData);
      console.log("Token de session:", session);

      const res = await fetch("/api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("Statut de la réponse:", res.status);
      const data = await res.json();
      console.log("Réponse du serveur:", data);

      if (res.ok) {
        setMessage("✅ Adresse enregistrée avec succès !");
      } else {
        setMessage(`❌ ${data.message || "Erreur lors de l'enregistrement"}`);
        console.error("Détails de l'erreur:", data);
      }
    } catch (error) {
      console.error("Erreur complète lors de la requête:", error);
      setMessage("❌ Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const testSession = async () => {
    try {
      setMessage("Test en cours...");
      setLoading(true);

      console.log("Information de session:", session);
      console.log("Status:", status);

      // Vérifier si la session est active
      if (status !== "authenticated" || !session) {
        setMessage("❌ Test échoué: Vous n'êtes pas authentifié");
        return;
      }

      // Tester le endpoint directement avec une requête minimale
      const testResponse = await fetch("/api/user/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: "Test",
          address: "Test",
          postalCode: "Test",
          city: "Test",
          country: "Test",
          phone: "Test",
        }),
      });

      console.log("Statut de la réponse de test:", testResponse.status);
      const testData = await testResponse.json();
      console.log("Réponse du test:", testData);

      if (testResponse.ok) {
        setMessage("✅ Test réussi! L'API est accessible et fonctionne.");
      } else {
        setMessage(`❌ Test échoué: ${testData.message || "Erreur inconnue"}`);
      }
    } catch (error) {
      console.error("Erreur lors du test:", error);
      setMessage("❌ Test échoué: Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-white">Chargement...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-black rounded-lg border border-red-700 text-white">
        <p>Vous devez être connecté pour accéder à cette fonctionnalité.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-black rounded-lg border border-red-700">
      <h2 className="text-xl font-bold mb-4 text-white">
        Adresse de livraison
      </h2>

      {/* Afficher les informations de débogage */}
      <SessionDebug />

      <p className="text-white mb-4">
        Connecté en tant que: <strong>{session?.user?.email}</strong>
      </p>

      {/* Bouton de test */}
      <div className="mb-6">
        <button
          type="button"
          onClick={testSession}
          disabled={loading}
          className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-semibold"
        >
          Tester la connexion API
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-red-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-red-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Code Postal
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-red-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Ville
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-red-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Pays
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-red-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-red-700 rounded text-white"
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

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Envoi en cours..." : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                name: "",
                address: "",
                postalCode: "",
                city: "",
                country: "France",
                phone: "",
              })
            }
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
