import React, { useState } from "react";
import { Button } from "../ui/button";
import { SeveralPayment } from "./SeveralPayment";
import Table from "./Table";

export default function NavItem({ description }) {
  const [activeSection, setActiveSection] = useState("Description");
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Handle active button click
  const handleButtonClick = (section: string) => {
    setActiveSection(section);
    setActiveButton(section);
  };

  return (
    <div className="text-white">
      <ul className="flex gap-3 ">
        <li>
          <Button
            onClick={() => handleButtonClick("Description")}
            className={`transition-all ${
              activeButton === "Description"
                ? "transform active:scale-95 bg-red-700"
                : "bg-gray-500"
            }`}
          >
            Description
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleButtonClick("Dimensions")}
            className={`transition-all ${
              activeButton === "Dimensions"
                ? "transform active:scale-95 bg-red-700"
                : "bg-gray-500"
            }`}
          >
            Dimensions
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleButtonClick("Livraison")}
            className={`transition-all ${
              activeButton === "Livraison"
                ? "transform active:scale-95 bg-red-700"
                : "bg-gray-500"
            }`}
          >
            Livraison
          </Button>
        </li>
      </ul>
      <SeveralPayment />
      <div className="mt-8">
        {activeSection === "Description" && (
          <div className=" mb-12">
            <h2 className="text-2xl font-bold">
              Un canapé {description?.title} pour sublimer votre sallon
            </h2>
            <p className="text-lg">{description?.description}</p>
          </div>
        )}
        {activeSection === "Dimensions" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Dimensions et Caractéristiques
            </h2>
            <table className="w-full border border-white text-left  mb-12">
              <thead>
                <tr className="bg-red-700 text-white">
                  <th
                    colSpan={2}
                    className="py-2 px-4 text-left text-xl font-bold"
                  >
                    Générales
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Reference
                  </td>
                  <td className="py-2 px-4">{description?.reference}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Marque
                  </td>
                  <td className="py-2 px-4">{description?.brand}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Couleur
                  </td>
                  <td className="py-2 px-4">{description?.color}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    A monter soi-même
                  </td>
                  <td className="py-2 px-4">Oui</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Matière de la structure
                  </td>
                  <td className="py-2 px-4">Bois</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Revêtement de l’assise
                  </td>
                  <td className="py-2 px-4">{description?.fabricType}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Nombre de places
                  </td>
                  <td className="py-2 px-4">{description?.seat}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Type de convertible
                  </td>
                  <td className="py-2 px-4">Dossier rabattable</td>
                </tr>

                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Dimensions du canapé
                  </td>
                  <td className="py-2 px-4">
                    Longueur : {description?.hauteur}, Largeur :
                    {description?.largeur}, Hauteur : {description?.profondeur}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeSection === "Livraison" && (
          <div className=" mb-12">
            <h2 className="text-2xl mb-5 font-bold">
              Informations de livraison
            </h2>
            <Table />
          </div>
        )}
      </div>
    </div>
  );
}
