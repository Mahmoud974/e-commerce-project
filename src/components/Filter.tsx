import React from "react";
import { ComboboxDemo } from "./Dropbox";
import { useSearchArticles } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Données pour les filtres
const colors = [
  { name: "Beige", colorClass: "bg-beige" },
  { name: "Bleu", colorClass: "bg-blue-500" },
  { name: "Gris clair", colorClass: "bg-gray-300" },
  { name: "Vert", colorClass: "bg-green-500" },
  { name: "Marron", colorClass: "bg-brown-500" },
  { name: "Blanc", colorClass: "bg-white border" },
  { name: "Rouge", colorClass: "bg-red-500" },
  { name: "Noir", colorClass: "bg-black" },
  { name: "Jaune", colorClass: "bg-yellow-400" },
  { name: "Gris foncé", colorClass: "bg-gray-700" },
  { name: "Gris", colorClass: "bg-gray-500" },
];

const assisesData = [
  { name: "2", count: 6055 },
  { name: "3", count: 5938 },
  { name: "2½", count: 1779 },
  { name: "4", count: 3172 },
  { name: "6", count: 507 },
  { name: "5", count: 1791 },
  { name: "1", count: 214 },
  { name: "1½", count: 140 },
];

const materialsData = [
  { name: "Tissu", count: 23010 },
  { name: "Laqué", count: 4889 },
  { name: "Métal", count: 12224 },
  { name: "Cuir", count: 3324 },
  { name: "Chêne", count: 4592 },
  { name: "Aluminium", count: 1199 },
  { name: "Bois", count: 356 },
  { name: "Plastique", count: 180 },
  { name: "Acier", count: 288 },
];

const filters = [
  {
    label: "Color",
    content: (
      <div className="grid grid-cols-3 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="flex flex-col items-center space-y-2"
          >
            <button
              className={`w-10 h-10 rounded-full ${color.colorClass}`}
              aria-label={color.name}
            />
            <p className="text-sm bg-black text-white">{color.name}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Assises",
    content: (
      <div className="flex flex-col space-y-2">
        {assisesData.map((item) => (
          <button
            key={item.name}
            className="flex justify-between items-center px-4 py-2 border rounded-md bg-black text-white"
          >
            <span>{item.name}</span>
            <span>{item.count}</span>
          </button>
        ))}
      </div>
    ),
  },
  {
    label: "Material",
    content: (
      <div className="flex flex-col space-y-2">
        {materialsData.map((item) => (
          <button
            key={item.name}
            className="flex justify-between items-center px-4 py-2 border rounded-md bg-black text-white"
          >
            <span>{item.name}</span>
            <span>{item.count}</span>
          </button>
        ))}
      </div>
    ),
  },
];

export default function Filter({ data }) {
  const { filteredData } = useSearchArticles();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
      {/* Section des filtres */}
      <ul className="flex space-x-9 md:space-x-4">
        {filters.map((filter) => (
          <li key={filter.label}>
            <Popover>
              <PopoverTrigger className="border px-8 py-2 rounded-lg ">
                {filter.label}
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4   border rounded-lg shadow-md bg-black text-white">
                {filter.content}
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>

      {/* Section des résultats et recherche */}
      <div className="flex items-center space-x-9 md:space-x-3">
        <p>{filteredData.length} articles</p>
        <ComboboxDemo data={data} />
      </div>
    </div>
  );
}
