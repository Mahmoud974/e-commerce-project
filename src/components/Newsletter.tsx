import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Newsletter() {
  return (
    <div className="bg-red-700  w-full h-auto py-12">
      <div className="flex justify-center text-center mx-auto ">
        <p>
          {" "}
          Devenez un{" "}
          <span className="font-bold">
            membre privilégié de notre communauté
          </span>{" "}
          en vous inscrivant à notre newsletter : offres spéciales, tendances
          actuelles et nouveautés à découvrir !
        </p>
      </div>
      <div className="flex w-1/3 mx-auto py-8">
        <Input
          type="email"
          placeholder="Email"
          className=" rounded-none border-2  placeholder-white" // Utilisation de la classe Tailwind pour placeholder en noir
        />
        <Button className="bg-white text-red-700 border-none rounded-none font-bold">{`Je m'inscris`}</Button>
      </div>
    </div>
  );
}
