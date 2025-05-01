"use client";

import { useCartStore } from "@/store/store";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Baskets({ goToNextStep }) {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce(
      (acc, item) => acc + item.prix * (item.quantity || 1),
      0
    );
    setTotal(newTotal);
  }, [items]);

  return (
    <section className="relative bg-black text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Mon panier</h1>

        <div className="max-w-6xl">
          {items.length === 0 ? (
            <p className="text-center">Votre panier est vide 🛒</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 transition-transform duration-200 rounded-lg p-2"
                >
                  <Link href={`/item/${item.id}`} className="flex items-center">
                    <Image
                      src={item?.image[0]}
                      alt="product image"
                      className="object-contain p-1 w-16 h-16"
                      width={64}
                      height={64}
                    />
                    <div className="ml-3">
                      <div className="text-lg font-bold">{item.nom}</div>
                      <div className="text-gray-400">{item.prix}€</div>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
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
          )}

          {items.length > 0 && (
            <div className="mt-10 space-y-6">
              <div className="text-right text-xl font-bold">
                Total : {total.toFixed(2)}€
              </div>

              <div className="flex gap-4">
                <Link
                  href="/"
                  className="w-full text-center border border-white text-white p-4 font-bold hover:bg-gray-300 hover:text-black transition duration-300"
                >
                  {"<"} Continuer mes achats
                </Link>
                <button
                  onClick={goToNextStep}
                  className="w-full bg-white text-black p-4 font-bold hover:bg-slate-200"
                >
                  Valider le panier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
