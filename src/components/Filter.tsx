import React from "react";
import { Button } from "./ui/button";
import { ComboboxDemo } from "./Dropbox";
import { useSearchArticles } from "@/store/store";

export default function Filter({ data }) {
  const { filteredData } = useSearchArticles();
  return (
    <div className="flex flex-row mb-6 justify-between">
      <ul className="space-x-4 flex">
        <li>
          <Button>Couleur</Button>
        </li>
        <li>
          <Button>Matériau</Button>
        </li>
        <li>
          <Button>Assises</Button>
        </li>
      </ul>
      <div className="flex items-center">
        <p className="mr-3">{filteredData.length} articles</p>
        <ComboboxDemo data={data} />
      </div>
    </div>
  );
}
