import Image from "next/image";
import { Trash } from "lucide-react";

export function CartList({ items, removeItem, handleQuantityChange }) {
  if (items.length === 0) {
    return <div className="flex justify-center">Votre panier est vide 🛒</div>;
  }

  return (
    <ul className="space-y-4 mt-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
        >
          <div className="flex items-center">
            <Image
              src="/img/ok.webp"
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
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={1} // Ajustez pour la vraie quantité
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
              className="w-16 p-1 text-center border rounded text-white bg-black"
              min="1"
            />
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
