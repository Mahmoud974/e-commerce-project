"use client";
import React, { useMemo, useState } from "react";
import Navbar from "@/components/Header/Navbar";
import Gallery from "@/components/ProduitId/Gallery";
import AlertMessage from "@/components/AlertNoLike";
import NavItem from "@/components/ProduitId/NavItem";
import {
  ArrowRight,
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
import { useCartStore, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import ProductCard from "../ProduitId/Card";
import { useCurrency } from "@/components/Header/Navbar";
import { useCurrencyStore } from "@/store/currencyStore";

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
  const { currency } = useCurrency();
  const { convertPrice } = useCurrencyStore();
  const randomFive = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [data]);
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

  const idArticle = data.find((article: any) => {
    if (!article.id || !slug) return false;

    const articleIdStr = String(article.id).trim();
    const slugStr = String(slug).trim();

    return articleIdStr === slugStr;
  });

  // Convertir le prix selon la devise sélectionnée
  const convertedPrice = idArticle
    ? convertPrice(idArticle.price, currency || "EUR")
    : 0;
  const priceHT = idArticle ? (convertedPrice / 1.2).toFixed(2) : "";

  const onLikeClick = () => {
    handleLike(idArticle, session);
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
    <main className="container px-6 mx-auto mt-6">
      <Navbar />

      {!idArticle ? (
        <div className="py-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-500">
            Produit non trouvé
          </h2>
          <p className="mb-4">
            Le produit avec l&apos;identifiant &quot;{slug}&quot; n&apos;a pas été trouvé dans notre
            catalogue.
          </p>
          <Link href="/">
            <Button className="text-white bg-red-700">
              Retourner à la page d&apos;accueil
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <section className="flex flex-col mt-8 md:mx-0 md:flex-row">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center mb-4 text-sm text-white">
                <Link href="/home">
                  <span className="text-gray-500 cursor-pointer hover:underline">
                    Accueil
                  </span>
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/">
                  <span className="text-gray-500 cursor-pointer hover:underline">
                    Canapés
                  </span>
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-500">
                  {idArticle?.nom}
                </span>
              </div>

              <Gallery data={idArticle} />
            </div>

            <div className="space-y-3 w-full md:ml-12 md:w-1/2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold">{idArticle?.title}</h1>
                  <small>Ref. {idArticle?.reference}</small>
                  <div className="flex gap-3">
                    <p>{idArticle?.color}</p>
                    <p className="px-3 text-black bg-yellow-200">
                      {idArticle?.fabricType}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onLikeClick}
                    className="p-2 bg-gray-300 rounded-full"
                  >
                    <Heart
                      className={
                        isLiked(idArticle?.id)
                          ? "text-red-600"
                          : "text-gray-800"
                      }
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-gray-300 rounded-full"
                  >
                    <Share2 className="text-gray-800" />
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-2">
                <span>prix :</span>
                <span className="ml-2 text-3xl">
                  {isHT
                    ? `${priceHT}${currency === "EUR" ? "€" : "£"} HT`
                    : `${convertedPrice}${currency === "EUR" ? "€" : "£"} TTC`}
                </span>
                <Switch
                  checked={isHT}
                  onCheckedChange={setIsHT}
                  className="mx-4"
                />
              </div>

              <div className="flex gap-2 items-center">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <Star className="w-4" />
                <small className="ml-2">4,3/5 + de 1000 ventes</small>
              </div>

              <div className="flex gap-2">
                <Link href={`/produit/${(idArticle?.id ?? 0) - 1}`}>
                  <SquareChevronLeft className="cursor-pointer" />
                </Link>
                <Link href={`/produit/${(idArticle?.id ?? 0) + 1}`}>
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
                  className="p-2 w-24 bg-black rounded-md border"
                />
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 ml-4 text-white bg-red-700 rounded-md"
                >
                  <ShoppingCart className="inline mr-2" />
                  {isAlreadyInCart ? "Retirer du panier" : "Ajouter au panier"}
                </button>
              </div>

              <div className="mt-6">
                <ul className="pl-5 list-disc">
                  {idArticle.id <= 55 &&
                    idArticle?.miniDescription.map((description: any, _: any) => (
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

          <section className="mt-12">
            <h2 className="text-3xl font-bold">À vous de choisir</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-40">
              {randomFive.map((item) => {
                return <ProductCard key={item.id} item={item} />;
              })}
            </section>
            <Link href={idArticle.id <= 55 ? "/" : "/produits-nettoyant"}>
              <Button className="flex mx-auto mt-6">
                Découvrir tous les produits
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
