"use client";
import React, { useState } from "react";
import Navbar from "@/components/Header/Navbar";
import Gallery from "@/components/ProduitId/Gallery";
import AlertMessage from "@/components/AlertNoLike";
import NavItem from "@/components/ProduitId/NavItem";
import {
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  SquareChevronLeft,
  SquareChevronRight,
  Star,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useCartStore, useLikeData, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";

export default function ProductPageClient({
  data,
  slug,
}: {
  data: any[];
  slug: string;
}) {
  const [isHT, setIsHT] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const { addItems } = useLikeData();

  const {
    isLiked,
    handleLike,
    alertType: likeAlertType,
    alertMessage: likeAlertMessage,
    alertId: likeAlertId,
    showAlert: likeShowAlert,
  } = useLikeStore();

  const {
    handleCart,
    isInCart,
    updateCartQuantity,
    alertType: cartAlertType,
    alertMessage: cartAlertMessage,
    alertId: cartAlertId,
    showAlert: cartShowAlert,
  } = useCartStore();

  const idArticle = data.find((article: any) => article.id === Number(slug));
  const priceHT = idArticle ? (idArticle.price / 1.2).toFixed(2) : "";

  const onLikeClick = () => {
    handleLike(idArticle, session, addItems);
  };

  const handleAddToCart = () => {
    if (!idArticle) return;

    if (isInCart(idArticle.id)) {
      updateCartQuantity(idArticle.id, quantity);
    } else {
      handleCart(idArticle, quantity);
    }
  };

  const isAlreadyInCart = idArticle ? isInCart(idArticle.id) : false;

  const handleShare = () => {
    const url = window.location.href;
    const text = `Découvrez ce produit incroyable: ${idArticle?.nom}`;
    const shareData = { title: idArticle?.nom, text, url };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((err) => console.error("Erreur partage :", err));
    } else {
      const shareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        text
      )} ${encodeURIComponent(url)}`;
      window.open(shareURL, "_blank");
    }
  };

  return (
    <main className="container mx-auto mt-6 px-6">
      <Navbar />

      <section className="md:mx-0 flex flex-col md:flex-row mt-8">
        <div className="flex flex-col">
          <div className="text-sm text-white flex items-center gap-2 mb-4">
            <Link href="/home">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Accueil
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Canapés
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-500 font-medium">{idArticle?.nom}</span>
          </div>

          <Gallery data={data} />
        </div>

        <div className="md:ml-12 md:w-1/2 w-full space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">{idArticle?.title}</h1>
              <small>Ref. {idArticle?.reference}</small>
              <div className="flex gap-3">
                <p>{idArticle?.color}</p>
                <p className="bg-yellow-200 text-black px-3">
                  {idArticle?.fabricType}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onLikeClick}
                className="rounded-full p-2 bg-gray-300"
              >
                <Heart
                  className={
                    isLiked(idArticle?.id) ? "text-red-600" : "text-gray-800"
                  }
                />
              </button>
              <button
                onClick={handleShare}
                className="rounded-full p-2 bg-gray-300"
              >
                <Share2 className="text-gray-800" />
              </button>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <span>price :</span>
            <span className="text-3xl ml-2">
              {isHT ? `${priceHT}€ HT` : `${idArticle?.price}€ TTC`}
            </span>
            <Switch checked={isHT} onCheckedChange={setIsHT} className="mx-4" />
          </div>

          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <Star className="w-4" />
            <small className="ml-2">4,3/5 + de 1000 ventes</small>
          </div>

          <div className="flex gap-2">
            <Link href={`/item/${(idArticle?.id ?? 0) - 1}`}>
              <SquareChevronLeft className="cursor-pointer" />
            </Link>
            <Link href={`/item/${(idArticle?.id ?? 0) + 1}`}>
              <SquareChevronRight className="cursor-pointer" />
            </Link>
          </div>

          <div className="mt-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="border bg-black p-2 rounded-md w-24"
            />
            <button
              onClick={handleAddToCart}
              className="ml-4 bg-red-700 text-white px-4 py-2 rounded-md"
            >
              <ShoppingCart className="inline mr-2" />
              {isAlreadyInCart ? "Retirer du panier" : "Ajouter au panier"}
            </button>
          </div>

          <div className="mt-6">
            <ul className="list-disc pl-5">
              {idArticle.miniDescription.map((description, _) => (
                <li key={_}>{description}</li>
              ))}
            </ul>
          </div>

          <NavItem description={idArticle} />
        </div>
      </section>

      {/* Alertes */}
      {likeShowAlert && likeAlertType && (
        <AlertMessage
          key={`like-${likeAlertId}`}
          type={likeAlertType}
          message={likeAlertMessage}
        />
      )}
      {cartShowAlert && cartAlertType && (
        <AlertMessage
          key={`cart-${cartAlertId}`}
          type={cartAlertType}
          message={cartAlertMessage}
        />
      )}
    </main>
  );
}
