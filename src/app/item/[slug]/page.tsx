"use client";
import Navbar from "@/components/Header/Navbar";
import React, { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { useTemplate } from "@/app/hook/useTemplate";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  SquareChevronLeft,
  SquareChevronRight,
  Star,
} from "lucide-react";
import Footer from "@/components/SectionDown/Footer";
import Newsletter from "@/components/SectionDown/Newsletter";
import HelpSection from "@/components/SectionDown/HelpSection";
import { Switch } from "@/components/ui/switch";
import { FaStar } from "react-icons/fa";
import Table from "@/components/ItemId/Table";
import NavItem from "@/components/ItemId/NavItem";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { useCartStore } from "@/store/store"; // Import du store

export default function Page({ params }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isHT, setIsHT] = useState(false);
  const [quantity, setQuantity] = useState(1); // Nouveau state pour la quantité

  const { data } = useTemplate();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    fetchParams();
  }, [params]);

  const handleShare = () => {
    const url = window.location.href; // L'URL actuelle de la page
    const text = `Découvrez ce produit incroyable: ${idArticle?.nom}`; // Texte à partager

    const shareData = {
      title: idArticle?.nom,
      text: text,
      url: url,
    };

    // Vérification de l'option de partage disponible dans le navigateur
    if (navigator.share) {
      // Utilisation de l'API de partage native (pour les appareils mobiles principalement)
      navigator
        .share(shareData)
        .catch((error) => console.error("Erreur de partage: ", error));
    } else {
      // Utilisation de liens spécifiques pour les plateformes
      const shareOptions = [
        {
          name: "WhatsApp",
          url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
            text
          )} ${encodeURIComponent(url)}`,
        },
        {
          name: "Instagram",
          url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, // Instagram ne supporte pas directement le partage via URL (utilisation de l'app pour publier)
        },
        {
          name: "Gmail",
          url: `mailto:?subject=${encodeURIComponent(
            idArticle?.nom
          )}&body=${encodeURIComponent(text)} ${encodeURIComponent(url)}`,
        },
        {
          name: "Message",
          url: `sms:?body=${encodeURIComponent(text)} ${encodeURIComponent(
            url
          )}`,
        },
      ];

      // Ouverture des liens dans une nouvelle fenêtre pour chaque plateforme
      window.open(shareOptions[0].url, "_blank"); // Exemple pour WhatsApp
      // Tu peux ajouter un menu déroulant ou plusieurs boutons pour chaque plateforme
    }
  };

  const idArticle =
    data && slug ? data.find((article) => article.id === Number(slug)) : null;
  const priceHT = idArticle ? (idArticle.prix / 1.2).toFixed(2) : "";

  // Récupération des fonctions du store
  const { handleCart, isInCart, updateCartQuantity } = useCartStore();

  // Fonction pour ajouter/retirer un produit du panier
  const handleAddToCart = () => {
    if (!idArticle) return;

    if (isInCart(idArticle.id)) {
      updateCartQuantity(idArticle.id, quantity); // Met à jour la quantité si l'article est déjà dans le panier
    } else {
      handleCart(idArticle, quantity); // Ajoute l'article au panier avec la quantité
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked); // Change l'état du like
  };

  const isAlreadyInCart = idArticle ? isInCart(idArticle.id) : false;

  return (
    <div>
      <main className="container mx-auto mt-6 flex-grow px-6">
        <Navbar />
        <section className="md:mx-0 flex flex-col md:flex-row md:mt-16 mt-8">
          <div className="flex flex-col">
            <div className="text-sm text-white flex items-center gap-2 mb-4">
              <Link href="/">
                <span className="text-gray-500 hover:underline cursor-pointer">
                  Accueil
                </span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-500 hover:underline cursor-pointer">
                Canapés
              </span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-500 font-medium">
                {idArticle?.nom}
              </span>
            </div>
            <Gallery data={data} />
          </div>

          <div className="md:ml-12 md:w-1/2 w-full space-y-3">
            <div className="flex flex-col md:flex-row gap-5 justify-between">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <p className="text-4xl md:mt-0 mt-8 font-bold">
                      {idArticle?.nom}
                    </p>
                    <small>Ref 12578BO</small>
                  </div>
                  {/* Les buttons à côté du titre */}
                  <div className="flex gap-2">
                    <button
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isLiked ? "bg-red-500" : "bg-gray-200"
                      }`}
                      onClick={() => {
                        handleLike(idArticle, session, addItems); // Utilisation de la méthode handleLike
                      }}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isLiked ? "text-white" : "text-gray-800"
                        }`}
                      />
                    </button>

                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"
                      onClick={handleShare}
                    >
                      <Share2 className="w-6 h-6 text-gray-800" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-3 py-3 border-t border-gray-200">
                  <div className="flex gap-3 w-full"></div>
                  <div className="flex gap-2">
                    <SquareChevronLeft className="cursor-pointer" />
                    <SquareChevronRight className="cursor-pointer" />
                  </div>
                </div>

                <div className="flex">
                  <p className="text-md font-sans">
                    Canapé{" "}
                    <span className="font-bold text-red-500">
                      {idArticle?.seat}
                    </span>{" "}
                    place{idArticle?.seat !== 1 && "s"} -
                  </p>
                  <div className="flex items-center ml-1">
                    <p className="mr-2">Color: {idArticle?.color} </p>
                    <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between flex-col mt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="mr-2 text-3xl">
                          {isHT ? `${priceHT}€ HT` : `${idArticle?.prix}€ TTC`}
                        </span>
                        <div className="bg-red-700 px-1 ml-2 rounded-sm">
                          <p className="text-white font-bold">-11%</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-00">
                        dont eco-part. de 13,50 €
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(Math.max(1, parseInt(e.target.value)))
                          }
                          className="bg-black border border-gray-300 rounded-md w-24 py-2 px-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Qty"
                          min="1"
                        />
                      </div>
                      <button
                        className="bg-red-700 text-white py-2 px-4 flex items-center rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2" />
                        {isAlreadyInCart
                          ? "RETIRER DU PANIER"
                          : "AJOUTER AU PANIER"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <span>Prix HT</span>
                    <Switch
                      checked={isHT}
                      onCheckedChange={setIsHT}
                      className="mx-2"
                    />
                    <span>Prix TTC</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex gap-1 items-center">
                    {[...Array(4)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                    <Star className="w-4" />
                  </div>
                  <small className="ml-2">4,3/5 + de 1000 ventes</small>
                </div>
                <div>
                  <div className="flex">
                    <p className="mr-2">Services vendeur partenaire</p>
                    <ChevronRight />
                  </div>
                  <div className="flex">
                    <div className="mr-1 flex mt-1 gap-2">
                      <p className="mr-2">Payer en</p>
                      <div className="flex items-center gap-2">
                        <p className="bg-gray-700 rounded-full w-full h-6 flex items-center  px-2">
                          3x: {(idArticle?.prix / 3).toFixed(2)}€ par mois
                        </p>
                      </div>
                      <p>ou</p>
                      <div className="flex items-center gap-2">
                        <p className="bg-gray-700 rounded-full w-full h-6 flex items-center  px-2">
                          4x: {(idArticle?.prix / 4).toFixed(2)}€ par mois
                        </p>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <Table />
                <ul className="gap-2">
                  <li className="font-bold">Les plus produit</li>
                  <li className="ml-2">
                    Magnifique canapé droit style scandinave
                  </li>
                  <li className="ml-2">
                    Revêtement tissu avec pieds en bois massif
                  </li>
                  <li className="ml-2">Deux coussins assortis fournis</li>
                </ul>
              </div>
            </div>

            <p className="text-lg">{idArticle?.description}</p>

            <div className="flex flex-col md:flex-row justify-between gap-3 py-3 border-t border-gray-200"></div>
            <NavItem />
          </div>
        </section>
      </main>

      <Newsletter />
      <HelpSection />
      <Footer />
    </div>
  );
}
