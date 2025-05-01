"use client";
import { useState } from "react";
import { DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
import Address from "./Adress";

export function ProfileSection({ session, signIn, signOut, isProcessing }) {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newsletter: false,
    acceptTerms: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 12) {
      setError("Le mot de passe doit contenir au moins 12 caractères.");
      return;
    }
    if (activeTab === "register" && !formData.acceptTerms) {
      setError("Vous devez accepter la politique d'utilisation.");
      return;
    }

    alert(
      activeTab === "login" ? "Connexion réussie" : "Inscription réussie !"
    );
    setError("");
  };

  return (
    <div className="flex flex-col space-y-4">
      {!session || !session.user ? (
        <>
          {/* Onglets */}
          <div className="flex space-x-2 mt-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 rounded-md py-2 font-bold ${
                activeTab === "login"
                  ? "bg-white text-black"
                  : "bg-black text-white border"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 rounded-md py-2 font-bold ${
                activeTab === "register"
                  ? "bg-white text-black"
                  : "bg-black text-white border"
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Connexion */}
          {activeTab === "login" && (
            <>
              <Button
                onClick={() => signIn("google")}
                className="mt-3 bg-red-600"
              >
                {isProcessing ? "Chargement..." : "Se connecter avec Google"}
              </Button>
              <Button
                onClick={() => signIn("facebook")}
                className="mt-3 bg-blue-600"
              >
                {isProcessing ? "Chargement..." : "Se connecter avec Facebook"}
              </Button>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-2 mt-4"
              >
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 bg-black border"
                />

                <label htmlFor="password">Mot de passe *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="p-2 bg-black border"
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="bg-white text-black py-2 px-4 rounded"
                >
                  Se connecter
                </button>
              </form>
            </>
          )}

          {/* Inscription */}
          {activeTab === "register" && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-2 mt-4"
            >
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-2 bg-black border"
              />

              <label htmlFor="password">Mot de passe *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="p-2 bg-black border"
              />
              <p className="text-xs text-gray-400">
                Au moins 12 caractères, avec majuscules, minuscules, chiffres et
                caractères spéciaux.
              </p>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                Recevoir notre newsletter
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                J'accepte la politique d'utilisation des données
              </label>

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="bg-white text-black py-2 px-4 rounded"
              >
                S'inscrire
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="mt-3 bg-red-700 rounded-none"
          >
            <DoorOpen /> Déconnecter
          </Button>
          <Address />
        </>
      )}
    </div>
  );
}
