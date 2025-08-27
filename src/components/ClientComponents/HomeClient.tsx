"use client";

import React, { useMemo, useState, useRef } from "react";
import Navbar from "@/components/Header/Navbar";
import ProductCard from "@/components/ProduitId/Card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AccordionGeneral,
  AccordionItemType,
} from "@/components/Accordions/AccordionGeneral";



export default function HomeClient({ data }: { data: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
 

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
    {`      Tous nos meubles sont garantis 5 ans contre les défauts de
          fabrication. À partir de la date d'achat.`}
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

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 w-full container px-4 flex justify-center">
        <Navbar />
      </div>

      
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
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col text-center p-4">
  <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
    Découvrez notre collection exclusive
  </h1>
  <p className="text-white max-w-xl mb-6">
    Des canapés design, confortables et personnalisables pour tous les intérieurs.
  </p>
  
 
  
  <button 
    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
    onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
  >
    Voir la collection
  </button>
</div>

      </div>

      {/* Produits */}
      <div className="container mx-auto mb-12">
        <h2 className="font-bold text-3xl mb-8">Plongez dans le confort moderne</h2>

        <div className="relative">
          <div
            className="flex overflow-x-auto gap-6   hide-scrollbar"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {randomEight.map((item: any) => (
              <ProductCard key={item.id} item={item} className="w-1/4 min-w-[300px]" />
            ))}
          </div>
          {showLeftArrow && (
            <button
              onClick={() => scroll(-300)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scroll(300)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          )}
        </div>

        <Link href="/canapes">
          <Button className="flex justify-center mx-auto border px-20 mt-6">
            <p>Découvrez tous les fauteuils</p>
            <ArrowRight />
          </Button>
        </Link>

        {/* Inspiration */}
        <div className="mt-16">
          <div className="text-center mt-6">
            <p className="text-1xl">
              {`Sublimez votre intérieur avec nos conseils d'experts`}
            </p>
            <h3 className="text-2xl font-bold">
              Offrez-vous une ambiance chaleureuse et apaisante
            </h3>
          </div>

          <div className="flex mt-7 justify-between gap-6">
  {[
    {
      href: "/inspiration",
      image: "article-1.jpg",
      title: "Inspiration de chez-vous",
      text: "Créez un espace sur-mesure avec nos experts déco.",
      button: "Découvrir"
    },
    {
      href: "/conseil",
      image: "article-2.png",
      title: "Un havre de paix chez vous",
      text: "Confort, esthétisme et sérénité au quotidien.",
      button: "Explorer"
    }
  ].map((item, index) => (
    <Link key={index} href={item.href} className="w-1/2">
      <div className="h-[520px] relative overflow-hidden group rounded-xl shadow-lg flex flex-col">
        <Image
          src={`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/${item.image}`}
          alt={item.title}
          width={720}
          height={520}
          unoptimized
          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:-rotate-2"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-5">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-sm mb-4">{item.text}</p>
          <button className="flex items-center text-sm font-medium hover:underline">
            {item.button} <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  ))}
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
