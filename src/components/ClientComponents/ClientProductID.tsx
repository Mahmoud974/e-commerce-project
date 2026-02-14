"use client";

import React, { useState } from "react";
import Navbar from "@/components/Header/Navbar";
import Gallery from "@/components/ProduitId/Gallery";
import AlertMessage from "@/components/AlertNoLike";
import NavItem from "@/components/ProduitId/NavItem";
import {
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useCartStore, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import ProductCard from "../ProduitId/Card";
import { useCurrency } from "@/components/Header/Navbar";
import { useCurrencyStore } from "@/store/currencyStore";

export default function ProductPageClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [isHT, setIsHT] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { data: session } = useSession();
  const { currency } = useCurrency();
  const { convertPrice } = useCurrencyStore();

  const {
    handleCart,
    isInCart,
  } = useCartStore();

  const convertedPrice = convertPrice(product.price, currency || "EUR");
  const priceHT = (convertedPrice / 1.2).toFixed(2);

  const handleAddToCart = () => {
    handleCart(product, quantity);
  };

  const isAlreadyInCart = isInCart(product.id);

  return (
    <main className="container px-6 mx-auto mt-6">
      <Navbar />

      <section className="flex flex-col mt-8 md:flex-row">
        <Gallery data={product} />

        <div className="space-y-3 w-full md:ml-12 md:w-1/2">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center mt-2">
            <span>Prix :</span>
            <span className="ml-2 text-3xl">
              {isHT
                ? `${priceHT}${currency === "EUR" ? "€" : "£"} HT`
                : `${convertedPrice}${currency === "EUR" ? "€" : "£"} TTC`}
            </span>
            <Switch
              checked={isHT}
              onCheckedChange={setIsHT}
              className="mx-4 bg-red-600"
            />
          </div>

          <div className="mt-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="p-2 w-24 bg-black rounded-md border"
            />
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 ml-4 text-white bg-red-700 rounded-md"
            >
              <ShoppingCart className="inline mr-2" />
              {isAlreadyInCart
                ? "Retirer du panier"
                : "Ajouter au panier"}
            </button>
          </div>

          <ul className="pl-5 list-disc mt-6">
            {product.miniDescription?.map(
              (description: string, index: number) => (
                <li key={index}>{description}</li>
              )
            )}
          </ul>

          <NavItem description={product} />
        </div>
      </section>

      <section className="mb-12 mt-12">
        <h2 className="text-3xl font-bold">À vous de choisir</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
