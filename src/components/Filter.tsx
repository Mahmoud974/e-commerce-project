import React from "react";
import { ComboboxDemo } from "./Dropbox";
import { useSearchArticles } from "@/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Colors, Seats } from "@/modules/model";

const colors = [
  { name: Colors.Beige, colorClass: "bg-yellow-100" },
  { name: Colors.Blue, colorClass: "bg-blue-500" },
  { name: Colors.Brown, colorClass: "bg-amber-800" },
  { name: Colors.Gray, colorClass: "bg-gray-400" },
  { name: Colors.Black, colorClass: "bg-black" },
  { name: Colors.Pink, colorClass: "bg-pink-200" },
  { name: Colors.GrayDark, colorClass: "bg-gray-800" },
  { name: Colors.Yellow, colorClass: "bg-yellow-200" },
  { name: Colors.Green, colorClass: "bg-green-500" },
];

const assisesData = [
  { name: Seats.Seat1, count: 214 },
  { name: Seats.Seat2, count: 214 },
  { name: Seats.Seat3, count: 5938 },
  { name: Seats.Seat4, count: 3172 },
  { name: Seats.Seat5, count: 1791 },
  { name: Seats.Seat6, count: 507 },
  { name: Seats.Seat7, count: 5938 },
  { name: Seats.Seat8, count: 1200 },
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
];

export default function Filter({ data, colorProduct, seatProduct }) {
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
