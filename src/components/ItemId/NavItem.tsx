import React, { useState } from "react";
import { Button } from "../ui/button";
import { SeveralPayment } from "./SeveralPayment";

export default function NavItem() {
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
              Un duo de chaises Miranda pour sublimer votre salle à manger
            </h2>
            <p className="text-lg">
              Donnez du style à votre salon avec ce canapé scandinave aux pieds
              en bois massifs évasés et ses lignes épurées, parfaitement
              symétriques. Ce canapé convertible au design scandinave s'adapte à
              tous les styles d'intérieurs.
            </p>
            <p className="mt-2">
              Avec ses coussins carrés et moelleux, son capitonnage avec boutons
              et ses pieds en bois, ce canapé apportera modernité et confort à
              votre intérieur. Décliné en plusieurs coloris sobres ou colorés
              pour correspondre à tous les goûts, ce canapé scandinave
              réchauffera votre espace salon. Idéale pour les petits espaces,
              cette banquette scandinave vous permettra de passer d'un espace
              salon à un espace nuit en quelques instants. Elle se déplie très
              facilement pour se transformer en lit d'appoint et offrir une
              confortable nuit de sommeil à une ou deux personnes.
            </p>
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
                    EAN
                  </td>
                  <td className="py-2 px-4">3700538219185</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Marque
                  </td>
                  <td className="py-2 px-4">LOUNGITUDE</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Couleur
                  </td>
                  <td className="py-2 px-4">Bleu</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Nombre de produits
                  </td>
                  <td className="py-2 px-4">1</td>
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
                  <td className="py-2 px-4">Tissu</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Nombre de places
                  </td>
                  <td className="py-2 px-4">3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Type de convertible
                  </td>
                  <td className="py-2 px-4">Dossier rabattable</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Couchage
                  </td>
                  <td className="py-2 px-4">Occasionnel</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Dimensions du couchage
                  </td>
                  <td className="py-2 px-4">114 x 186 cm</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Dimensions du canapé
                  </td>
                  <td className="py-2 px-4">
                    Longueur : 205 cm, Largeur : 87 cm, Hauteur : 85 cm
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold border-r border-white">
                    Dimensions du colis
                  </td>
                  <td className="py-2 px-4">185 x 115 x 21,5 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeSection === "Livraison" && (
          <div className=" mb-12">
            <h2 className="text-2xl font-bold">Informations de livraison</h2>
            <p className="text-lg">Les informations de livraison sont ici.</p>
          </div>
        )}
      </div>
    </div>
  );
}
