"use client";

import ProductCard from "@/components/ItemId/Card";
import Footer from "@/components/SectionDown/Footer";

import { useTemplate } from "@/app/hook/useTemplate";
import React, { useState } from "react";
import { useSearchArticles, useLikeData } from "@/store/store";

import Newsletter from "@/components/SectionDown/Newsletter";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { AccordionGuarantee } from "@/components/ConditionsGuarantee/Accordion";

export default function Page() {
  const { data } = useTemplate();
  const { filteredData } = useSearchArticles();
  const { addItems } = useLikeData();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const allProducts = filteredData.length > 0 ? filteredData : data || [];
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const paginatedData = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="flex flex-col min-h-screen">
      {/* Navbar Positionnée au-dessus de la vidéo */}
      <div className="absolute container top-0 left-0 w-full z-10 flex justify-center items-center my-6 container mx-auto px-4">
        <div className="flex mx-auto justify-between w-full max-w-9xl px-4">
          <div>
            <Link href="/" className="hover:underline">
              <p>Cananpé</p>
            </Link>
            <Link href="/about" className="hover:underline">
              <p>A propos de Sofachic</p>
            </Link>
          </div>

          <Image
            src="https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2xvZ28ucG5nIiwiaWF0IjoxNzQ2MTY1MDI5LCJleHAiOjIwNjE1MjUwMjl9.qJtgB6xhSlaFabNGTlv13XMRW0MbPYs_Rj1sgoW0o_E"
            alt="Profil"
            className="object-cover"
            width={220}
            height={220}
          />
          <Link href="/panier/validation" className="hover:underline">
            <ShoppingBasket />
          </Link>
        </div>
      </div>

      {/* Video avec overlay */}
      <div className="relative w-full h-[900px] mb-16 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/furniture.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center mb-4">
            Découvrez notre collection exclusive
          </h1>
          <button className="px-6 py-3  border text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
            En savoir +
          </button>
        </div>
      </div>

      {/* Contenu du reste de la page */}
      <div className="container mx-auto mb-12">
        <h2 className="font-bold text-3xl">Plongez dans le confort moderne</h2>

        <section className="grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto w-full">
          {[...paginatedData]
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map((item: any) => (
              <ProductCard key={item.id} item={item} addItems={addItems} />
            ))}
        </section>

        <Link href="/">
          <Button className="flex justify-center mx-auto border px-20 mt-6">
            <p>Découvrez tous les fauteuils </p>
            <ArrowRight />
          </Button>
        </Link>

        <div className="mt-16">
          <div className="text-center mt-6">
            <p className="text-1xl">
              Sublimez votre intérieur avec nos conseils d’experts
            </p>
            <h3 className="text-2xl font-bold">
              Offrez-vous une ambiance chaleureuse et apaisante
            </h3>
          </div>

          <div className="flex justify-between mt-7 gap-6 flex-wrap">
            {/* Première image */}
            <Link href="/inspiration">
              <div className="w-[720px] h-[520px] relative overflow-hidden group rounded-xl shadow-lg">
                <Image
                  src="/img/article-1.jpg"
                  alt="Intérieur personnalisé"
                  className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 group-hover:scale-105"
                  width={720}
                  height={520}
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Un chez-vous à votre image
                  </h3>
                  <p className="text-sm mb-4">
                    Chaque pièce a son caractère. Nos spécialistes en décoration
                    vous accompagnent pour créer un cadre de vie sur-mesure,
                    élégant et fonctionnel.
                  </p>
                  <button className="flex items-center text-sm font-medium hover:underline">
                    Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>

            {/* Deuxième image */}
            <Link href="">
              <div className="w-[720px] h-[520px] relative overflow-hidden group rounded-xl shadow-lg">
                <Image
                  src="/img/article-2.png"
                  alt="Espace détente"
                  className="w-full cursor-pointer h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  width={720}
                  height={520}
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Faites de votre maison un havre de paix
                  </h3>
                  <p className="text-sm mb-4">
                    Offrez-vous un environnement pensé pour le repos et
                    l’équilibre, alliant confort, esthétisme et sérénité au
                    quotidien.
                  </p>
                  <button className="flex items-center text-sm font-medium hover:underline">
                    Explorer <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="space-y-4 w-2/3 mx-auto mt-12 text-center">
          <h2 className="text-2xl font-bold">Service client & Garantie</h2>

          <p className="text-gray-600">
            Vous avez des questions sur nos produits ou services ? Notre équipe
            du service client est disponible pour vous accompagner. Que ce soit
            pour un renseignement sur un meuble, un conseil déco ou une demande
            de garantie, nous sommes là pour vous.
          </p>
          <AccordionGuarantee />
        </div>
      </div>

      <Informations />
      <Newsletter />
      <HelpSection />
      <div className="container mx-auto">
        <Footer />
      </div>
    </section>
  );
}
