import Image from "next/image";
import { Trash } from "lucide-react";
import Link from "next/link";

export function FavoritesList({ selectedItems, removeItems }) {
  if (selectedItems.length === 0) {
    return <div className="flex justify-center">Aucun Like 💔</div>;
  }

  return (
    <ul className="space-y-4 mt-3">
      {selectedItems.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
        >
          <Link href={`/item/${item.id}`} className=" ">
            <div className="flex items-center">
              <Image
                src={item?.image[0]}
                alt="product image"
                className="object-contain p-1 w-16 h-16"
                width={64}
                height={64}
                priority
              />
              <div className="ml-3">
                <div className="text-lg font-bold">{item.nom}</div>
                <div className="text-gray-400">{item.prix}€</div>
              </div>
            </div>
          </Link>
          <button
            onClick={() => removeItems(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
