import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useSortArticlebyPrice } from "@/store/store";

const frameworks = [
  { value: "Popular", label: "Popular" },
  { value: "Low", label: "Low" },
  { value: "High", label: "High" },
];

export function ComboboxDemo({ data }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { setSortData, toggleSortOrder } = useSortArticlebyPrice();

  const handleSortData = (type) => {
    if (data) {
      setSortData(data);

      if (type === "High") {
        toggleSortOrder();
      } else if (type === "Low") {
        toggleSortOrder();
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-black text-white border-white"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Sort by"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-white" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const selectedValue =
                      currentValue === value ? "" : currentValue;
                    setValue(selectedValue);
                    handleSortData(selectedValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
