"use client";

import React, { useEffect } from "react";
import { ComboboxDemo } from "./Dropbox";
import { useSearchArticles } from "@/store/store";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { colors } from "@/Interface/model";
import { RotateCcw } from "lucide-react";
import { useQueryState } from "nuqs";

type Article = {
  seat: number;
  color: string;
  title: string;
  price: number;
};

type FilterProps = {
  data: Article[];
  setPage: (value: string) => void;
  colorProduct?: string[];
  seatProduct?: number[];
} & React.ComponentProps<typeof Slider>;

export default function Filter({
  data,
  setPage,
  className,
  colorProduct,
  seatProduct,
  ...props
}: FilterProps) {
  const {
    selectedColors,
    selectedSeats,
    setSelectedColors,
    setSelectedSeats,
    colorsArticles,
    numberSeatArticles,
    priceRangeArticles,
  } = useSearchArticles();

  const [colorQuery, setColorQuery] = useQueryState<string[]>("colors", {
    history: "push",
    parse: (value) => value?.split(",").filter(Boolean) || [],
    serialize: (value) => value?.join(",") || "",
  });

  const [seatQuery, setSeatQuery] = useQueryState<string[]>("seats", {
    history: "push",
    parse: (value) => value?.split(",").filter(Boolean) || [],
    serialize: (value) => value?.join(",") || "",
  });

  const [priceQuery, setPriceQuery] = useQueryState<any>("price", {
    history: "push",
    parse: (value) => value?.split("-").map(Number) || [],
    serialize: (value) => value?.join("-") || "",
  });

  useEffect(() => {
    if (colorQuery?.length) {
      setSelectedColors(colorQuery);
      colorsArticles(data, colorQuery);
    }

    if (seatQuery?.length) {
      const seatNumbers = seatQuery.map(Number);
      setSelectedSeats(seatNumbers);
      numberSeatArticles(data, seatNumbers);
    }

    if (priceQuery?.length === 2) {
      priceRangeArticles(data, priceQuery);
    }
  }, [
    colorQuery,
    seatQuery,
    priceQuery,
    data,
    colorsArticles,
    numberSeatArticles,
    priceRangeArticles,
    setSelectedColors,
    setSelectedSeats,
  ]);

  // Assurez-vous que les données sont disponibles avant de calculer
  const seatCount = Array.from(
    new Set(data?.map((item) => item.seat).filter(Boolean))
  ).map((seat) => ({
    seat,
    count: data.filter((item) => item.seat === seat).length,
  }));

  const prices = data?.map((item) => item.price) || [0, 1000];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 1000;
  const selectedPrice =
    priceQuery?.length === 2 ? priceQuery : [minPrice, maxPrice];

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedSeats([]);
    colorsArticles(data, []);
    numberSeatArticles(data, []);
    priceRangeArticles(data, [minPrice, maxPrice]);
    setPage("1");
    setColorQuery([]);
    setSeatQuery([]);
    setPriceQuery([]);
  };

  const filters = [
    {
      label: "Couleur",
      content: (
        <div className="grid grid-cols-3 gap-4">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <div
                key={color.name}
                className="flex flex-col items-center space-y-2 cursor-pointer"
                onClick={() => {
                  const updatedColors = isSelected
                    ? selectedColors.filter((c) => c !== color.name)
                    : [...selectedColors, color.name];
                  setSelectedColors(updatedColors);
                  colorsArticles(data, updatedColors);
                  setColorQuery(updatedColors);
                  setPage("1");
                }}
              >
                <button
                  className={`w-10 h-10 rounded-full ${
                    color.colorClass
                  } border ${isSelected ? "ring-4 ring-white" : ""}`}
                ></button>
                <p
                  className={`text-sm rounded-md px-2 py-1 ${
                    isSelected ? "bg-white text-black" : "text-white"
                  }`}
                >
                  {color.name}
                </p>
              </div>
            );
          })}
          <div className="col-span-3 flex justify-center mt-4">
            <button
              className="flex text-base text-white hover:text-black"
              onClick={handleReset}
            >
              <RotateCcw className="text-xs w-4 text-white mr-2" />
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
          {seatCount.map((item) => {
            const isSelected = selectedSeats.includes(item.seat);
            return (
              <button
                key={item.seat}
                className={`flex justify-between items-center px-4 py-2 border rounded-md hover:bg-gray-200 ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => {
                  const updatedSeats = isSelected
                    ? selectedSeats.filter((s) => s !== item.seat)
                    : [...selectedSeats, item.seat];
                  setSelectedSeats(updatedSeats);
                  numberSeatArticles(data, updatedSeats);
                  setSeatQuery(updatedSeats.map(String));
                  setPage("1");
                }}
              >
                <span>
                  {item.seat} place{item.seat > 1 ? "s" : ""}
                </span>
                <span>
                  {item.count} produit{item.count > 1 ? "s" : ""}
                </span>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      label: "Prix",
      content: (
        <div className=" py-4 space-y-4">
          <p className="text-sm text-white font-semibold">Filtrer par prix :</p>

          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              value={selectedPrice[0]}
              onChange={(e) => {
                const value = Math.max(minPrice, Number(e.target.value));
                const updated: any = [value, selectedPrice[1]];
                priceRangeArticles(data, updated);
                setPriceQuery(updated);
                setPage("1");
              }}
              className="w-20 px-2 py-1 text-sm text-black rounded border border-gray-300"
            />
            <span className="text-white">à</span>
            <input
              type="number"
              value={selectedPrice[1]}
              onChange={(e) => {
                const value = Math.min(maxPrice, Number(e.target.value));
                const updated: any = [selectedPrice[0], value];
                priceRangeArticles(data, updated);
                setPriceQuery(updated);
                setPage("1");
              }}
              className="w-20 px-2 py-1 text-sm text-black rounded border border-gray-300"
            />
            <span className="text-white">€</span>
          </div>

          <Slider
            value={selectedPrice}
            min={minPrice}
            max={maxPrice}
            step={10}
            onValueChange={(range: any) => {
              priceRangeArticles(data, range);
              setPriceQuery(range);
              setPage("1");
            }}
            className={cn("w-full", "bg-white/10 text-white", className)}
            {...props}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex border-none flex-col md:flex-row items-center lg:justify-between justify-center mb-4 sm:mb-6 space-y-4 md:space-y-0 px-2 sm:px-4">
      <ul className="flex flex-wrap justify-center md:justify-between gap-2 sm:gap-4 md:space-x-4 w-full md:w-auto">
        {filters.map((filter) => (
          <li key={filter.label} className="mb-2 md:mb-0">
            <Popover>
              <PopoverTrigger className="bg-black border px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg text-white hover:bg-gray-100 hover:text-black transition-colors">
                {filter.label}
              </PopoverTrigger>
              <PopoverContent className="w-64 sm:w-72 p-3 sm:p-4 border rounded-lg shadow-md bg-black text-white">
                {filter.content}
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>

      <div className="flex items-center w-full md:w-auto justify-center md:justify-end mt-2 md:mt-0">
        <ComboboxDemo data={data} />
      </div>
    </div>
  );
}
