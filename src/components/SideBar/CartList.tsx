"use client";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export function CartList({ items, removeItem, handleQuantityChange }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce(
      (acc, item) => acc + item.prix * (item.quantity || 1),
      0
    );
    setTotal(newTotal);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex justify-center mt-4">Votre panier est vide 🛒</div>
    );
  }

  return (
    <>
      <div className="max-h-[900px] overflow-y-auto pr-2">
        <ul className="space-y-4 mt-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
            >
              <Link href={`/produit/${item.id}`} className="">
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
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.quantity || 1}
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
      </div>

      <div className="flex justify-between pt-3 items-center">
        <div className="flex flex-col">
          <p>Total:</p>
          <p className="text-xl text-center font-bold">{total.toFixed(2)}€</p>
        </div>
        <Button variant="destructive" className="bg-red-700">
          <Link href="/panier/validation">Validez la commande</Link>
        </Button>
      </div>
    </>
  );
}
