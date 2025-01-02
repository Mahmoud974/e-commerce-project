import { AccordionGuarantee } from "@/components/AccordionGuarantee";
import Footer from "@/components/Footer";
import HelpSection from "@/components/HelpSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section className="relative">
      <div className="container mt-6 mx-auto">
        <Navbar />

        {/* Image */}
        <div className="relative w-full h-[400px] mt-12">
          <Image
            src="/banners/guarantee.jpg"
            alt="banner about"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0  "
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-lg z-20">
            <p className="text-white text-3xl font-black uppercase">
              CONDITIONS de la garantie
            </p>
            <p className="drop-shadow-lg w-1/2 text-center">
              Profitez de notre garantie exceptionnelle pour une tranquillité
              d’esprit totale : des meubles conçus pour durer, avec un support
              qui vous accompagne à chaque étape.
            </p>
          </div>
        </div>

        {/* Paragraphe sous l'image */}
        <div className="mt-12 text-center px-4 mb-12">
          <p className="text-white text-xl font-semibold mt-4 max-w-3xl mx-auto">
            Chez Sofachic./, nous sommes fiers de concevoir des meubles
            intemporels en utilisant les meilleurs matériaux pour garantir leur
            qualité et leur durabilité. Pour refléter notre engagement, nous
            offrons une garantie de 5 ans sur tous les produits achetés après le
            1er janvier 2022. Cette garantie s’ajoute à vos droits prévus par la
            loi et témoigne de notre volonté de vous fournir un service
            exceptionnel.
          </p>

          <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
            Que vous choisissiez des meubles pour vivre, travailler ou jouer,
            notre expertise de plus de 70 ans dans le design danois vous
            garantit des produits modulaires, fonctionnels et de qualité
            supérieure. Inspirés par la créativité et l’artisanat danois, nos
            designs iconiques vous offrent joie et inspiration pour embellir
            votre quotidien.
          </p>

          <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
            Nous nous efforçons d’améliorer la vie de chacun avec le design
            danois, et cette mission inspire notre devise :{" "}
            <span className="font-semibold italic">Live Ekstraordinær</span>
          </p>
        </div>

        {/* Section des caractéristiques */}
        <div>
          <div className="bg-red-700 w-1/3 h-3 mb-8 "></div>
          <p>
            Chez SofaChic, nous concevons nos produits avec des matériaux
            robustes, durables et innovants. Pour les cadres de canapé, nous
            faisons un pas de plus en proposant une garantie de 10 ans couvrant
            les défauts de fabrication et de structure.
          </p>
          <div className="flex my-12 max-w-2xl mx-auto">
            <h2 className="font-bold text-3xl text-left">
              Questions fréquentes
            </h2>
            <AccordionGuarantee />
          </div>
          <HelpSection />
        </div>
        <Footer />
      </div>
    </section>
  );
}