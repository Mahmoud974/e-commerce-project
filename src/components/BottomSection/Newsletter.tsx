"use client";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setShowConfirmation(true);
      setEmail("");

      setTimeout(() => {
        setShowConfirmation(false);
      }, 4000);
    } else {
      setErrorMessage("Veuillez entrer un email valide.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="bg-red-700 w-full h-auto py-12 px-4">
      <div className="flex flex-col items-center text-center mx-auto max-w-3xl">
        <p className="text-white mb-6">
          Devenez un{" "}
          <span className="font-bold">
            membre privilégié de notre communauté
          </span>{" "}
          en vous inscrivant à notre newsletter : offres spéciales, tendances
          actuelles et nouveautés à découvrir !
        </p>

        {showConfirmation ? (
          <div className="flex items-center gap-3   text-green-600 py-4 px-6 rounded-lg font-bold text-lg">
            <CheckCircle className="w-6 h-6" />
            Inscription confirmée ! Merci
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row w-full gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-2 p-3 border-white placeholder-white bg-transparent text-white"
            />
            <button
              type="submit"
              className="w-auto sm:w-auto bg-white text-red-700 font-bold py-3 px-12 rounded-lg whitespace-nowrap"
            >
              Je m'inscris
            </button>
          </form>
        )}

        {errorMessage && (
          <div className="text-white mt-4 font-medium">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
