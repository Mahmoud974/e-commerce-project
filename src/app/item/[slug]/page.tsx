"use client";
import Navbar from "@/components/Header/Navbar";
import React, { useEffect, useState } from "react";
import { useTemplate } from "@/app/hook/useTemplate";
import {
  Facebook,
  Heart,
  Instagram,
  ShoppingCart,
  SquareChevronLeft,
  SquareChevronRight,
  Truck,
} from "lucide-react";
import Footer from "@/components/SectionDown/Footer";

import { colors } from "@/Interface/model";
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/SectionDown/Newsletter";
import { SeveralPayment } from "@/components/ItemId/SeveralPayment";
import HelpSection from "@/components/SectionDown/HelpSection";
import PaymentSeveral from "@/components/ItemId/PaymentSeveral";
import { CarouselPlugin } from "@/components/ItemId/Caroussel";

export default function Page({ params }) {
  const [slug, setSlug] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeSection, setActiveSection] = useState("Description"); // Active section state
  const [activeButton, setActiveButton] = useState<string | null>(null); // New state to track active button

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    fetchParams();
  }, [params]);

  const { data } = useTemplate();

  const idArticle =
    data && slug ? data.find((article) => article.id === Number(slug)) : null;
  console.log(idArticle?.nom);

  function handleCart(event: any): void {
    throw new Error("Function not implemented.");
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // addItems(item);
  };

  // Handle active button click
  const handleButtonClick = (section: string) => {
    setActiveSection(section);
    setActiveButton(section); // Set active button
  };

  return (
    <div>
      <main className="container mx-auto mt-6 flex-grow px-6">
        <Navbar />
        <section className="md:mx-0 flex flex-col md:flex-row md:mt-32 mt-8 items-center">
          <div className="w-full md:w-2/2">
            <CarouselPlugin data={idArticle} />
          </div>

          <div className="md:ml-12 md:w-1/2 w-full space-y-3">
            <div className="flex flex-col    md:flex-row gap-5 justify-between">
              <div>
                <p className="text-6xl  md:mt-0 mt-8 font-bold pl-0">
                  {idArticle?.nom}
                </p>
                <small>Ref 12578BO</small>
                <p className="text-md my-2 font-sans">
                  Canapé{" "}
                  <span className="font-bold text-red-500">
                    {idArticle?.seat}
                  </span>{" "}
                  place{idArticle?.seat !== 1 && "s"}
                </p>
              </div>
              <PaymentSeveral />
            </div>
            <p className="text-lg">{idArticle?.description}</p>
            <div className="flex items-center">
              <p className="mr-2">Color: {idArticle?.color}</p>
              <div
                className={`w-5 h-5 rounded-full ml-3 ${
                  colors.find((color) => color.name === idArticle?.color)
                    ?.colorClass
                }`}
              ></div>
            </div>
            <ul className="flex gap-5">
              <li className="flex flex-col text-md font-bold">
                <p>Hauteur </p> <p className="font-normal">54 cm</p>
              </li>
              <li className="flex flex-col text-md font-bold">
                <p>Largeur </p> <p className="font-normal">160 cm</p>
              </li>
              <li className="flex flex-col text-md font-bold">
                <p>Profondeur </p> <p className="font-normal">141 cm</p>
              </li>
            </ul>
            <div className="border border-green-900 bg-green-950 p-3 rounded-md">
              <p className="text-xs">
                Bénéficiez de 5% de réduction supplémentaire en utilisant le
                code CODE : CCFA5.
              </p>
            </div>
            <ul className="flex gap-3">
              <li>Share this product </li>
              <li>
                <Facebook />
              </li>
              <li>
                <Instagram />
              </li>
            </ul>
            <div className="flex items-center">
              <span className="mr-2 text-3xl">{idArticle?.prix}€</span>

              <p className="line-through ml-2">{idArticle?.prix + 100}€</p>
              <div className="border-red-700 border px-1 ml-2 rounded-sm">
                <p className="text-red-700 font-bold">-11%</p>
              </div>
            </div>
            <p className="text-xs mt-3">{`Avec 4.80€ d'économie`}</p>
            <div className="flex items-center gap-2 mt-2">
              <Truck />
              <p className="ml-1 text-md">
                Délai de livraison estimé 4 à 6 semaines
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-3 py-3 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isInCart ? "bg-green-500" : "bg-gray-200"
                  }`}
                  onClick={handleCart}
                >
                  <ShoppingCart
                    className={`w-6 h-6 ${
                      isInCart ? "text-white" : "text-gray-800"
                    }`}
                  />
                </button>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isLiked ? "bg-red-500" : "bg-gray-200"
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "text-white" : "text-gray-800"
                    }`}
                  />
                </button>
              </div>
              <div className="flex gap-2">
                <SquareChevronLeft className="cursor-pointer" />
                <SquareChevronRight className="cursor-pointer" />
              </div>
            </div>
          </div>
        </section>

        <div className="text-white mt-8">
          <ul className="flex gap-3 mt-8">
            <li>
              <Button
                onClick={() => handleButtonClick("Description")}
                className={`transition-all ${
                  activeButton === "Description"
                    ? "transform active:scale-95 bg-gray-700"
                    : "bg-gray-500"
                }`}
              >
                Description
              </Button>
            </li>
            <li>
              <Button
                onClick={() => handleButtonClick("Dimensions")}
                className={`transition-all ${
                  activeButton === "Dimensions"
                    ? "transform active:scale-95 bg-gray-700"
                    : "bg-gray-500"
                }`}
              >
                Dimensions
              </Button>
            </li>
            <li>
              <Button
                onClick={() => handleButtonClick("Livraison")}
                className={`transition-all ${
                  activeButton === "Livraison"
                    ? "transform active:scale-95 bg-gray-700"
                    : "bg-gray-500"
                }`}
              >
                Livraison
              </Button>
            </li>
          </ul>
          <SeveralPayment />
          <div className="mt-8">
            {activeSection === "Description" && (
              <div>
                <h2 className="text-2xl font-bold">
                  Un duo de chaises Miranda pour sublimer votre salle à manger
                </h2>
                <p className="text-lg">
                  Elles sont dotées de matériaux de qualité et sont adaptées à
                  des repas conviviaux.
                </p>
              </div>
            )}
            {activeSection === "Dimensions" && (
              <div>
                <h2 className="text-2xl font-bold">Dimensions du produit</h2>
                <p className="text-lg">
                  Taille de la chaise, profondeur, largeur et hauteur.
                </p>
              </div>
            )}
            {activeSection === "Livraison" && (
              <div>
                <h2 className="text-2xl font-bold">
                  Informations de livraison
                </h2>
                <p className="text-lg">
                  Les informations de livraison sont ici.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Newsletter />
      <HelpSection />
      <Footer />
    </div>
  );
}
