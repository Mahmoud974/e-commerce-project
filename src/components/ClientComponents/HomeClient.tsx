"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/Header/Navbar";
import ProductCard from "@/components/ProduitId/Card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  AccordionGeneral,
  AccordionItemType,
} from "@/components/Accordions/AccordionGeneral";
import BannerImage from "../BannerImage";
import { inspirations } from "../Accordions/inspirations";

export default function HomeClient({ data }: { data: any[] }) {
  const [visibleCount, setVisibleCount] = useState(8);

  const accordionItems: AccordionItemType[] = [
    {
      value: "contact",
      trigger: "Comment contacter le service client ?",
      content: (
        <p>
          Vous pouvez nous joindre par e-mail ou via le formulaire de contact.
          Notre équipe est dispo du lundi au samedi, de 9h à 18h.
        </p>
      ),
    },
    {
      value: "garantie",
      trigger: "Quelle est la durée de la garantie ?",
      content: (
        <p>
          Tous nos meubles sont garantis 5 ans contre les défauts de
          fabrication. À partir de la date d'achat.
        </p>
      ),
    },
    {
      value: "retour",
      trigger: "Comment effectuer un retour ou un échange ?",
      content: (
        <p>
          Vous avez 14 jours après réception pour nous retourner un article.
          Allez dans votre espace client pour générer une étiquette retour.
        </p>
      ),
    },
  ];

  const randomEight = useMemo(() => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  }, [data]);

  return (
    <section className="flex flex-col min-h-screen">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 w-full container px-4 flex justify-center">
        <Navbar />
      </div>

      {/* Vidéo ddd&#39;a#39;a#39;accueil */}
      <div className="relative w-full h-[900px] mb-16 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Vidéo de notre collection de meubles"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/video-home.mp4`}
            type="video/mp4"
          />
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

      {/* Produits */}
      <div className="container mx-auto mb-12">
        <h2 className="font-bold text-3xl">Plongez dans le confort moderne</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {randomEight.map((item: any) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <Link href="/">
          <Button className="flex justify-center mx-auto border px-20 mt-6">
            <p>Découvrez tous les fauteuils</p>
            <ArrowRight />
          </Button>
        </Link>

        {/* Inspiration */}
        <div className="mt-16">
          <div className="text-center mt-6">
            <p className="text-1xl">
              Sublimez votre intérieur avec nos conseils d'experts
            </p>
            <h3 className="text-2xl font-bold">
              Offrez-vous une ambiance chaleureuse et apaisante
            </h3>
          </div>

          <div className="flex   mt-7 gap-6 flex-wrap justify-center">
            <Link href="/inspiration">
              <div className="w-full sm:w-[720px] h-[520px] relative overflow-hidden group rounded-xl shadow-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/article-1.jpg`}
                  alt="Intérieur personnalisé"
                  width={720}
                  height={520}
                  unoptimized
                  className="
                    w-full h-full object-cover
                    transform transition-transform duration-500 ease-in-out
                    group-hover:scale-105
                    group-hover:-rotate-2
                  "
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Inspiration de chez-vous
                  </h3>
                  <p className="text-sm mb-4">
                    Créez un espace sur-mesure avec nos experts déco.
                  </p>
                  <button className="flex items-center text-sm font-medium hover:underline">
                    Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>

            <Link href="/conseil">
              <div className="w-full sm:w-[720px] h-[520px] relative overflow-hidden group rounded-xl shadow-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/article-2.png`}
                  alt="Espace détente"
                  width={720}
                  height={520}
                  unoptimized
                  className="
                    w-full h-full object-cover
                    transform transition-transform duration-500 ease-in-out
                    group-hover:scale-105
                    group-hover:-rotate-2
                  "
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Un havre de paix chez vous
                  </h3>
                  <p className="text-sm mb-4">
                    Confort, esthétisme et sérénité au quotidien.
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
            Notre équipe est là pour vous aider avec les commandes, les retours,
            les garanties et les conseils déco.
          </p>
          <AccordionGeneral items={accordionItems} />
        </div>
      </div>
    </section>
  );
}
