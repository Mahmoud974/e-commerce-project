"use client";

import ProductCard from "@/components/ProduitId/Card";
import { useTemplate } from "@/app/hook/useTemplate";
import React, { useState } from "react";
import { useSearchArticles, useLikeData } from "@/store/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Navbar from "@/components/Header/Navbar";
import { AccordionGeneral } from "@/components/Accordion/Accordion";

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

  // 👉 Données de l'accordéon
  const accordionItems = [
    {
      value: "service",
      trigger: "Comment contacter le service client ?",
      content: (
        <p>
          Vous pouvez nous contacter par e-mail, téléphone ou via notre
          formulaire de contact en ligne. Nous sommes disponibles du lundi au
          samedi, de 9h à 18h.
        </p>
      ),
    },
    {
      value: "garantie",
      trigger: "Comment fonctionne la garantie ?",
      content: (
        <p>
          Nos produits sont garantis 5 ans contre les défauts de fabrication.
          Pour toute réclamation, présentez simplement votre preuve d’achat.
        </p>
      ),
    },
    {
      value: "delai",
      trigger: "Quels sont les délais de traitement d'une demande ?",
      content: (
        <p>
          Les demandes sont généralement traitées sous 48h. Un conseiller vous
          contactera si des informations supplémentaires sont nécessaires.
        </p>
      ),
    },
  ];

  return (
    <section className="flex flex-col min-h-screen">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 w-full container px-4 flex justify-center">
        <Navbar />
      </div>

      {/* Vidéo d'accueil */}
      <div className="relative w-full h-[900px] mb-16 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Vidéo de notre collection de meubles"
        >
          <source src="/videos/furniture.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center mb-4">
            Découvrez notre collection exclusive
          </h1>
          <button className="px-6 py-3 border text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
            En savoir +
          </button>
        </div>
      </div>

      {/* Produits aléatoires */}
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
            <p>Découvrez tous les fauteuils</p>
            <ArrowRight />
          </Button>
        </Link>

        {/* Inspirations */}
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
            {/* Image 1 */}
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
                    Nos spécialistes en décoration vous accompagnent pour créer
                    un cadre de vie sur-mesure.
                  </p>
                  <button className="flex items-center text-sm font-medium hover:underline">
                    Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>

            {/* Image 2 */}
            <Link href="">
              <div className="w-[720px] h-[520px] relative overflow-hidden group rounded-xl shadow-lg">
                <Image
                  src="/img/article-2.png"
                  alt="Espace détente"
                  className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 group-hover:scale-105"
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
                    l’équilibre.
                  </p>
                  <button className="flex items-center text-sm font-medium hover:underline">
                    Explorer <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4 w-2/3 mx-auto mt-12 text-center">
          <h2 className="text-2xl font-bold">Service client & Garantie</h2>
          <p className="text-gray-600">
            Vous avez des questions sur nos produits ou services ? Notre équipe
            du service client est disponible pour vous accompagner.
          </p>

          <AccordionGeneral items={accordionItems} />
        </div>
      </div>
    </section>
  );
}
