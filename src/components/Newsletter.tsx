import React from "react";
import Image from "next/image";

export default function Newsletter() {
  return (
    <div className="bg-slate-900 w-full h-auto py-12 px-4">
      <div className="flex flex-col items-center text-center mx-auto max-w-3xl">
        <p className="text-white mb-6">
          Devenez un{" "}
          <span className="font-bold">
            membre privilégié de notre communauté
          </span>{" "}
          en vous inscrivant à notre newsletter : offres spéciales, tendances
          actuelles et nouveautés à découvrir !
        </p>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border-2 p-3 placeholder-white bg-transparent text-white"
          />
          <button className="w-full sm:w-auto bg-white text-slate-900 font-bold py-3 px-6 rounded-lg">
            Je m'inscris
          </button>
        </div>
      </div>
    </div>
  );
}
