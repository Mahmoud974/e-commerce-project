"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Header/Navbar";
import Gallery from "@/components/ProduitId/Gallery";
import AlertMessage from "@/components/AlertNoLike";
import NavItem from "@/components/ProduitId/NavItem";
import { ShoppingCart, Heart } from "lucide-react";
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

  const {
    isLiked,
    handleLike,
    initLikes,
    alertType: likeAlertType,
    alertMessage: likeAlertMessage,
    alertId: likeAlertId,
    showAlert: likeShowAlert,
  } = useLikeStore();

  useEffect(() => {
    if (session?.user?.id) {
      initLikes(Number(session.user.id));
    }
  }, [session, initLikes]);

  const convertedPrice = convertPrice(product.price, currency || "EUR");
  const priceHT = (convertedPrice / 1.2).toFixed(2);

  const handleAddToCart = () => {
    handleCart(product, quantity);
  };

  const isAlreadyInCart = isInCart(product.id);

  const isCanape =
    typeof product?.typeCanape === "string" ||
    Array.isArray(product?.miniDescription);
  const productId = product.id;
  const liked = isLiked(productId);

  const onLikeClick = async () => {
    if (!session?.user?.id) return;
    const userId = Number(session.user.id);
    try {
      if (liked) {
        const res = await fetch(
          `/api/favorites?userId=${userId}&id=${productId}`,
          { method: "DELETE" }
        );
        if (res.ok) handleLike(product, session);
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isCanape
              ? { userId, canapeId: productId }
              : { userId, produitId: productId }
          ),
        });
        if (res.ok) handleLike(product, session);
      }
    } catch (error) {
      console.error("Erreur favori:", error);
    }
  };

  return (
    <main className="container px-6 mx-auto mt-6">
      <Navbar />

      <section className="flex flex-col mt-8 md:flex-row">
        <Gallery data={product} />

        <div className="space-y-3 w-full md:ml-12 md:w-1/2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl font-bold flex-1 min-w-0">{product.title}</h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                  isAlreadyInCart
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                aria-label={isAlreadyInCart ? "Retirer du panier" : "Ajouter au panier"}
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button
                onClick={onLikeClick}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                  liked
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                aria-pressed={liked}
                aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

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

          <div className="flex items-center gap-3 mt-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="p-2 w-24 bg-black rounded-md border"
            />
          </div>
          {likeShowAlert && likeAlertType && (
            <AlertMessage
              key={`like-${likeAlertId}`}
              type={likeAlertType}
              message={likeAlertMessage}
            />
          )}

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
