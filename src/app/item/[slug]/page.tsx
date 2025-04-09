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

export default function Page({ params }) {
  const [slug, setSlug] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [isHT, setIsHT] = useState(false);

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
  const priceHT = idArticle ? (idArticle.prix / 1.2).toFixed(2) : "";

  function handleCart(event: any): void {
    throw new Error("Function not implemented.");
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // addItems(item);
  };

  return (
    <div>
      {/* <SwitchHt /> */}
      <main className="container mx-auto mt-6 flex-grow px-6">
        <Navbar />
        <section className="md:mx-0 flex flex-col md:flex-row md:mt-32 mt-8  ">
          <Gallery />
          {/* <div className="w-full md:w-2/2">
            <CarouselPlugin data={idArticle} />
          </div> */}

          <div className="md:ml-12 md:w-1/2 w-full space-y-3">
            <div className="flex flex-col    md:flex-row gap-5 justify-between">
              <div className="space-y-2 ">
                <div className="flex justify-between">
                  <div>
                    <p className="text-4xl md:mt-0 mt-8 font-bold  ">
                      {idArticle?.nom}
                    </p>
                    <small>Ref 12578BO</small>
                  </div>
                  {/* Les buttons à coté du titre */}
                  <div className="flex gap-2">
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
                    <button
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isLiked ? "bg-red-500" : "bg-gray-200"
                      }`}
                      onClick={handleLike}
                    >
                      <Share2
                        className={`w-6 h-6 ${
                          isLiked ? "text-white" : "text-gray-800"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-3 py-3 border-t border-gray-200 ">
                  <div className="flex gap-3 w-full"></div>
                  <div className="flex gap-2">
                    <SquareChevronLeft className="cursor-pointer" />
                    <SquareChevronRight className="cursor-pointer" />
                  </div>
                </div>

                <div className="flex ">
                  <p className="text-md   font-sans">
                    Canapé{" "}
                    <span className="font-bold text-red-500">
                      {idArticle?.seat}
                    </span>{" "}
                    place{idArticle?.seat !== 1 && "s"} -
                  </p>
                  <div className="flex items-center ml-1">
                    <p className="mr-2">Color: {idArticle?.color} </p>{" "}
                    <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between  flex-col mt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="mr-2 text-3xl">
                          {isHT ? `${priceHT}€ HT` : `${idArticle?.prix}€ TTC`}
                        </span>
                        <div className="bg-red-700  px-1 ml-2 rounded-sm">
                          <p className="text-white font-bold">-11%</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-00">
                        dont eco-part. de 13,50 €
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex  items-center">
                        <input
                          type="number"
                          className="bg-black border border-gray-300 rounded-md w-24 py-2 px-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Qty"
                        />
                      </div>
                      <button className="bg-red-700 text-white py-2 px-4 flex items-center rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <ShoppingCart className="mr-2" />
                        AJOUTER AU PANIER
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
                  <div className="flex gap-1  items-center">
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
                    <div className="mr-1 flex mt-1">
                      <p className="mr-2">Payer en </p>
                      <p className="bg-gray-700 rounded-full w-6 h-6 flex items-center pl-0.5">
                        4x
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                  <div>
                    <div className="flex gap-2 mt-3"></div>
                  </div>
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

              {/* <PaymentSeveral /> */}
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
