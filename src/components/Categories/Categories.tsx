import * as React from "react";
import { BedDouble, Sofa, Armchair, Home } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

const categoryOptions = {
  bedroom: {
    label: "BEDROOM",
    icon: <BedDouble size={20} className="text-gray-700" />,
  },
  "living-room": {
    label: "LIVING ROOM",
    icon: <Home size={20} className="text-gray-700" />,
  },
  "dining-room": {
    label: "DINING ROOM",
    icon: <Home size={20} className="text-gray-700" />,
  },
  sofa: { label: "SOFA", icon: <Sofa size={20} className="text-gray-700" /> },
  armchair: {
    label: "ARMCHAIR",
    icon: <Armchair size={20} className="text-gray-700" />,
  },
};

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  return (
    <div className="flex flex-col rounded-lg shadow-md max-w-xs">
      <Select onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-[250px] text-white">
          {selectedCategory ? (
            <div className="flex items-center gap-2">
              {categoryOptions[selectedCategory].icon}
              <span className="text-white">
                {categoryOptions[selectedCategory].label}
              </span>
            </div>
          ) : (
            <span className="text-white">Select a category</span>
          )}
        </SelectTrigger>

        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {Object.entries(categoryOptions).map(([value, { label, icon }]) => (
              <SelectItem
                key={value}
                value={value}
                className="flex flex-row   items-center gap-2"
              >
                <p> {icon}</p>
                <p className="text-gray-700">{label}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Categories;
