"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTemplate } from "@/hook/useTemplate";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, Heart } from "lucide-react";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Caroussel";

export default function Page({ params }) {
  const [slug, setSlug] = useState(null);

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

  return (
    <div>
      <main className="container mx-auto mt-6 flex-grow">
        <Navbar />
        <section className="flex mt-48 justify-center items-center">
          <div>
            <CarouselPlugin data={idArticle} />
          </div>
          <div className="ml-12 space-y-3">
            <h1 className="text-4xl font-bold">{idArticle?.nom}</h1>
            <p className="text-md my-2 font-sans">Canapé 3 places</p>
            <ul className="flex space-x-4">
              <li className="mr-1">Colors:</li>
              <li className="bg-red-500 rounded-full w-5 h-5"></li>
              <li className="bg-blue-500 rounded-full w-5 h-5"></li>
              <li className="bg-yellow-500 rounded-full w-5 h-5"></li>
            </ul>

            <p className="text-lg">{idArticle?.description}</p>
            <p>
              Soft, curved woods and bold geometric lines create an original
              combination. Triangular legs create a powerful silhouette for him,
              a solid base.
            </p>
            <span className="mr-2 text-3xl">{idArticle?.prix}€</span>
            <div className="flex flex-col mt-4">
              <div className="flex">
                <Button className="rounded-none w-full">
                  <ShoppingBasket />
                  Commander
                </Button>
                <Button className="ml-2 flex items-center justify-center rounded-none bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <Heart />
                </Button>
              </div>
              <p className="mt-5 text-md">
                Délai de livraison estimé 4 à 6 semaines
              </p>
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="flex flex-col overflow-x-auto scrollbar-hide">
            <h2 className="text-2xl font-bold mb-6">Notre recommandation</h2>
            <Recommendations />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
