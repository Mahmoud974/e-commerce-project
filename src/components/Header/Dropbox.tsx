import * as React from "react";
import { ArrowUpDown, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchArticles } from "@/store/store";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortingOptions = [
  { value: "Pertinence", label: "Pertinence" },
  { value: "Croissant", label: "Prix Croissant" },
  { value: "Decroissant", label: "Prix Décroissant" },
];

export function ComboboxDemo({ data }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const {
    setFilteredData,
    filteredData,
    croissantArticles,
    decroissantArticles,
    pertinenceArticles,
  } = useSearchArticles();

  const handleSort = (optionValue) => {
    switch (optionValue) {
      case "Croissant":
        croissantArticles(data);
        break;
      case "Decroissant":
        decroissantArticles(data);
        break;
      case "Pertinence":
        pertinenceArticles(data);
        break;
      default:
        console.error("Option de tri non reconnue :", optionValue);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <p>
        {filteredData.length} article{filteredData.length !== 1 && "s"}
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between bg-black text-white border-white"
            >
              <p className="flex items-center gap-2">
                <ArrowUpDown />
                {value
                  ? sortingOptions.find((option) => option.value === value)
                      ?.label
                  : "Trier par prix"}
              </p>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 text-white" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>Aucune option trouvée.</CommandEmpty>
              <CommandGroup>
                {sortingOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    className="cursor-pointer"
                    value={option.value}
                    onSelect={(currentValue) => {
                      const selectedValue =
                        currentValue === value ? "" : currentValue;
                      setValue(selectedValue);
                      handleSort(selectedValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
