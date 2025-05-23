"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
import Address from "./Adress";

export function ProfileSection({ session, isProcessing }) {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 12) {
      setError("Le mot de passe doit contenir au moins 12 caractères.");
      return;
    }

    if (activeTab === "register" && !formData.acceptTerms) {
      setError("Vous devez accepter la politique d'utilisation.");
      return;
    }

    try {
      if (activeTab === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Erreur à l'inscription.");
          return;
        }

        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          window.location.href = "/";
        }
      } else {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          setError("Email ou mot de passe incorrect");
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {!session?.user ? (
        <>
          <div className="flex space-x-2 mt-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 font-bold rounded ${
                activeTab === "login"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 font-bold rounded ${
                activeTab === "register"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Inscription
            </button>
          </div>

          {["login", "register"].includes(activeTab) && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-2 mt-4"
            >
              {activeTab === "register" && (
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 bg-black border"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 bg-black border"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="p-2 bg-black border"
                required
              />
              {activeTab === "register" && (
                <>
                  <label className="text-xs text-gray-400">
                    Minimum 12 caractères avec majuscules, minuscules, chiffres
                    et symboles.
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />
                    J'accepte la politique d'utilisation
                  </label>
                </>
              )}
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-white text-black py-2 rounded"
              >
                {activeTab === "login" ? "Se connecter" : "S'inscrire"}
              </button>
            </form>
          )}

          <Button onClick={() => signIn("google")} className="mt-3 bg-red-600">
            {isProcessing ? "Chargement..." : "Se connecter avec Google"}
          </Button>
          <Button
            onClick={() => signIn("facebook")}
            className="mt-3 bg-blue-600"
          >
            {isProcessing ? "Chargement..." : "Se connecter avec Facebook"}
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="mt-3 bg-red-700"
          >
            <DoorOpen /> Déconnexion
          </Button>
          <Address />
        </>
      )}
    </div>
  );
}
