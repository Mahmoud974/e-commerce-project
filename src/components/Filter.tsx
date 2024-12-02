"use client";
import React, { useEffect } from "react";
import { ComboboxDemo } from "./Dropbox";
import { useSearchArticles, useSortdata } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { assisesData, colors } from "@/Interface/model";
import { RotateCcw } from "lucide-react";

export default function Filter({ data, colorProduct, seatProduct }) {
  const { filteredData } = useSearchArticles();
  const { filteredDataColor, setFilteredDataColor, resetFilteredDataColor } =
    useSortdata();

  useEffect(() => {
    console.log(filteredDataColor);
  });

  const filters = [
    {
      label: "Color",
      content: (
        <div className="grid grid-cols-3 gap-4">
          {colors.map((color) => {
            const isSelected = filteredDataColor.some(
              (item) => item.color.toLowerCase() === color.name.toLowerCase()
            );
            return (
              <div
                key={color.name}
                className="flex flex-col items-center space-y-2"
              >
                <button
                  className={`w-10 h-10 rounded-full ${color.colorClass} ${
                    isSelected ? "ring-4 ring-white" : ""
                  }`}
                  aria-label={color.name}
                  onClick={() => setFilteredDataColor(data, color.name)}
                />
                <p className="text-sm text-gray-800 rounded-md px-2 py-1">
                  {color.name}
                </p>
              </div>
            );
          })}
          {/* Bouton Reset */}
          <div className="col-span-3 flex justify-center mt-4">
            <button
              className="flex text-base"
              onClick={() => resetFilteredDataColor()}
            >
              <RotateCcw className="text-xs w-4 mr-2" />
              Réinitialiser
            </button>
          </div>
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
              className="flex justify-between items-center px-4 py-2 border rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => console.log(`Assise sélectionnée : ${item.name}`)}
            >
              <span>{item.name}</span>
              <span>{item.count}</span>
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
      {/* Section des filtres */}
      <ul className="flex space-x-6 md:space-x-4">
        {filters.map((filter) => (
          <li key={filter.label}>
            <Popover>
              <PopoverTrigger className="bg-black border px-6 py-2 rounded-lg text-white hover:bg-gray-100 hover:text-black">
                {filter.label}
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 border rounded-lg shadow-md bg-black text-white">
                {filter.content}
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>

      {/* Section des résultats et recherche */}
      <div className="flex items-center space-x-6 md:space-x-3">
        <p className="text-white">
          {filteredDataColor.length > 0
            ? `${filteredDataColor.length} articles sélectionnés`
            : `${filteredData.length} articles`}
        </p>
        <ComboboxDemo data={data} />
      </div>
    </div>
  );
}
