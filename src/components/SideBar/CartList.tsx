"use client";
import Image from "next/image";
import { Trash, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export function CartList({
  items,
  removeItem,
  handleQuantityChange,
  clearCart,
}) {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center mt-4">Votre panier est vide 🛒</div>
    );
  }

  if (!isMounted) {
    return (
      <div className="flex justify-center mt-4">Chargement du panier...</div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Votre panier</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            clearCart();
            setTotal(0);
          }}
          className="bg-red-700  border-none  text-white hover:text-red-700 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Vider
        </Button>
      </div>

      <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        <ul className="space-y-4 mt-3">
          {cartItems.map((item, index) => (
            <li
              key={`item-${item.id}`}
              className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 transition-transform duration-200 rounded-lg p-2"
            >
              <div className="flex-1 mr-2">
                <div className="flex items-center rounded-xl">
                  <Image
                    src={
                      item?.image ||
                      item?.images?.[0] ||
                      "/placeholder-image.jpg"
                    }
                    alt={item?.name || item?.title || "Produit"}
                    className="object-contain p-1 w-16 h-16 "
                    width={64}
                    height={64}
                    priority
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <Link
                      href={`/produit/${item.id}`}
                      className="text-lg font-bold truncate max-w-[150px] sm:max-w-[200px] block"
                    >
                      {item?.name?.length > 20
                        ? `${item.name.slice(0, 20)}...`
                        : item.name || item.title || "Échantillon"}
                    </Link>
                    <div className="text-gray-400">
                      {item.price > 0 ? (
                        `${item.price}€`
                      ) : (
                        <p className="text-green-800 font-bold">Gratuit</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {item.price > 0 && (
                  <input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 text-center border rounded text-white bg-black"
                    min="1"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between pt-3 items-center sticky bottom-0 bg-black mt-2 border-t border-gray-700 py-3">
        <div className="flex flex-col">
          <p>Total:</p>
          <p className="text-xl text-center font-bold">{total.toFixed(2)}€</p>
        </div>
        <Link href="/panier/validation">
          <Button variant="destructive" className="bg-red-700">
            Validez la commande
          </Button>
        </Link>
      </div>
    </>
  );
}
