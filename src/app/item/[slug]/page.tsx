"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTemplate } from "@/hook/useTemplate";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, Heart, ShoppingCart } from "lucide-react";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Caroussel";
import { Colors, colors } from "@/modules/model";

export default function Page({ params }) {
  const [slug, setSlug] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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

  function handleCart(event: any): void {
    throw new Error("Function not implemented.");
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    addItems(item);
  };
  console.log(idArticle?.color);

  return (
    <div>
      <main className="container mx-auto mt-6 flex-grow px-6">
        <Navbar />
        <section className="md:mx-0   flex md:mt-32 md:justify-start flex-col md:flex-row items-center">
          <div className="">
            <CarouselPlugin data={idArticle} />
          </div>
          <div className="md:ml-12 md:space-y-3">
            <p className="text-4xl md:mt-0 mt-8 font-bold">{idArticle?.nom}</p>
            <p className="text-md my-2 font-sans">
              Canapé{" "}
              <span className="font-bold text-red-500">{idArticle?.seat}</span>{" "}
              place{idArticle?.seat !== 1 && "s"}
            </p>
            <p className="text-lg">{idArticle?.description}</p>
            <div className="flex items-center">
              <p>Color: {idArticle?.color}</p>
              <div
                className={`w-5 h-5 rounded-full ml-3 ${
                  colors.find((color) => color.name === idArticle?.color)
                    ?.colorClass
                }`}
              ></div>
              <div
                className={`w-5 h-5 rounded-full ml-3 ${
                  colors.find((color) => color.name === idArticle?.color)
                    ?.colorClass
                }`}
              ></div>
            </div>
            <p className="max-w-xl">
              Soft, curved woods and bold geometric lines create an original
              combination. Triangular legs create a powerful silhouette for him,
              a solid base.
            </p>
            <span className="mr-2 text-3xl">{idArticle?.prix}€</span>
            <p className=" text-md">Délai de livraison estimé 4 à 6 semaines</p>
            <div className="flex flex-col mt-4">
              {/* Action Buttons */}
              <div className="flex items-center justify-start gap-2   py-3 border-t border-gray-200">
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
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="flex flex-col overflow-x-auto scrollbar-hide">
            <p className="text-2xl font-bold mb-6">Notre recommandation</p>
            <Recommendations />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
function addItems(item: any) {
  throw new Error("Function not implemented.");
}
