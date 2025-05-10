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
} & React.ComponentProps<typeof Slider>;

export default function Filter({
  data,
  setPage,
  className,
  ...props
}: FilterProps) {
  const {
    selectedColors,
    selectedSeats,
    setSelectedColors,
    setSelectedSeats,
    colorsArticles,
    numberSeatArticles,
  } = useSearchArticles();

  const [colorQuery, setColorQuery] = useQueryState<string[]>("colors", {
    history: "push",
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
  });

  const [seatQuery, setSeatQuery] = useQueryState<string[]>("seats", {
    history: "push",
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
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
  }, [colorQuery, seatQuery]);

  const seatCount = Array.from(
    new Set(data?.map((item) => item.seat).filter(Boolean))
  ).map((seat) => ({
    seat,
    count: data.filter((item) => item.seat === seat).length,
  }));

  const prices = data?.map((item) => item.price);
  const minPrice = data && Math.min(...prices);
  const maxPrice = data && Math.max(...prices);

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedSeats([]);
    colorsArticles(data, []);
    numberSeatArticles(data, []);
    setPage("1");
    setColorQuery([]);
    setSeatQuery([]);
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
                  setPage("1");
                  setColorQuery(updatedColors);
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
          {seatCount.length > 0 ? (
            seatCount.map((item) => {
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
                    setPage("1");
                    setSeatQuery(updatedSeats.map(String));
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
            })
          ) : (
            <p>Aucune donnée d'assises disponible.</p>
          )}
        </div>
      ),
    },
    {
      label: "Prix",
      content: (
        <div className="px-2 py-4">
          <Slider
            defaultValue={[minPrice]}
            min={minPrice}
            max={maxPrice}
            step={10}
            className={cn("w-full", "bg-white/10 text-white", className)}
            {...props}
          />
          <div className="flex justify-between text-xs mt-2 text-white">
            <span>{minPrice} €</span>
            <span>{maxPrice} €</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex border-none flex-col md:flex-row items-center lg:justify-between justify-center mb-6 space-y-4 md:space-y-0">
      <ul className="flex justify-between space-x-6 md:space-x-4">
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

      <div className="flex items-center md:space-x-3">
        <ComboboxDemo data={data} />
      </div>
    </div>
  );
}
