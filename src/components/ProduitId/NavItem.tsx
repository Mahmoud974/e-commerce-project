import React, { useState } from "react";
import { Button } from "../ui/button";
import { SeveralPayment } from "./SeveralPayment";
import Table from "./Table";

export default function NavItem({ description }: { description: any }) {
  const [activeSection, setActiveSection] = useState<
    "Description" | "Dimensions" | "Livraison"
  >("Description");

  const sections: { key: typeof activeSection; label: string }[] = [
    { key: "Description", label: "Description" },
    { key: "Dimensions", label: "Dimensions" },
    { key: "Livraison", label: "Livraison" },
  ];

  return (
    <div className="text-white">
      <ul className="flex gap-3">
        {sections.map(({ key, label }) => (
          <li key={key}>
            <Button
              onClick={() => setActiveSection(key)}
              className={`px-4 py-2 rounded-md font-medium transition-colors 
                ${
                  activeSection === key
                    ? "bg-red-700 text-white"
                    : "bg-gray-500 text-gray-200 hover:bg-gray-600"
                }`}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>

      <SeveralPayment />

      <div className="mt-8">
        {activeSection === "Description" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold">
              Un canapé {description?.title} pour sublimer votre salon
            </h2>
            <p className="text-lg mt-2">{description?.description}</p>
          </div>
        )}

        {activeSection === "Dimensions" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Dimensions et Caractéristiques
            </h2>
            <table className="w-full border border-white text-left mb-12">
              <thead>
                <tr className="bg-red-700 text-white">
                  <th colSpan={2} className="py-2 px-4 text-xl font-bold">
                    Générales
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Référence
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
                    Matière
                  </td>
                  <td className="py-2 px-4">{description?.fabricType}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Places
                  </td>
                  <td className="py-2 px-4">{description?.seat}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Dimensions
                  </td>
                  <td className="py-2 px-4">
                    H : {description?.hauteur}, L : {description?.largeur}, P :{" "}
                    {description?.profondeur}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Livraison" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-5">
              Informations de livraison
            </h2>
            <Table />
          </div>
        )}
      </div>
    </div>
  );
}
