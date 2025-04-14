"use client";
import React, { useEffect, useState } from "react";
import { ComboboxDemo } from "./Dropbox";
import { useSearchArticles } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { assisesData as defaultAssisesData, colors } from "@/Interface/model";
import { RotateCcw } from "lucide-react";
import Categories from "../Categories/Categories";

export default function Filter({ data, colorProduct, seatProduct }) {
  const { nbreSeatColor, colorsArticles, numberSeatArticles } =
    useSearchArticles();

  const [assisesData, setAssisesData] = useState([]);
  const uniqueSeats = [...new Set(data?.map((item) => item.seat))];

  const blueItems = data?.filter((el) => el.color?.toLowerCase() === "gray");
  console.log("Articles gray :", blueItems);

  // Compter le nombre d'articles pour chaque siège unique
  const seatCount = uniqueSeats.map((seat) => ({
    seat,
    count: data?.filter((item) => item.seat === seat).length,
  }));

  console.log("Nombre d'articles pour chaque siège similaire :", seatCount);

  useEffect(() => {
    if (data) {
      const seatCounts = data.reduce((acc, item) => {
        const seat = item.seat;
        acc[seat] = (acc[seat] || 0) + 1;
        return acc;
      }, {});

      // Convert seatCounts to assisesData structure
      const newAssisesData = Object.entries(seatCounts).map(
        ([seat, count]) => ({
          name: `Seat ${seat}`,
          count,
        })
      );

      setAssisesData(newAssisesData);
    }
  }, [data]);

  const filters = [
    {
      label: "Color",
      content: (
        <div className="grid grid-cols-3 gap-4">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => colorsArticles(data, color.name)}
            >
              <button
                className={`w-10 h-10 rounded-full ${color.colorClass} border`}
              ></button>
              <p className="text-sm text-white rounded-md px-2 py-1 ">
                {color.name}
              </p>
            </div>
          ))}
          {/* Bouton Reset */}
          <div className="col-span-3 flex justify-center mt-4">
            <button className="flex text-base text-white hover:text-black">
              <RotateCcw className="text-xs w-4 text-white" />
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
          {seatCount.length > 0 ? (
            seatCount.map((item) => (
              <button
                key={Math.random()}
                className="flex justify-between items-center px-4 py-2 border rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                onClick={() => numberSeatArticles(data, item.seat)} // Utiliser `item.seat` pour passer la valeur correcte
              >
                <span>{`Seat ${item.seat}`}</span>
                <span>{item.count}</span>
              </button>
            ))
          ) : (
            <p>{`Aucune donnée d'assises disponible.`}</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex border-none flex-col md:flex-row items-center lg:justify-between justify-center  mb-6 space-y-4 md:space-y-0">
      {/* Section des filtres */}

      <ul className="flex space-x-6 md:space-x-4">
        {filters.map((filter) => (
          <li key={filter.label}>
            <Popover>
              <PopoverTrigger className="bg-black   border px-6 py-2 rounded-lg text-white hover:bg-gray-100 hover:text-black">
                {filter.label}
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4   border rounded-lg shadow-md bg-black text-white">
                {filter.content}
              </PopoverContent>
            </Popover>
          </li>
        ))}
        <Categories />
      </ul>

      {/* Section des résultats et recherche */}
      <div className="flex items-center md:space-x-3">
        <ComboboxDemo data={data} />
      </div>
    </div>
  );
}
