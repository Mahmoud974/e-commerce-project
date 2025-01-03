import Footer from "@/components/Footer";
import HelpSection from "@/components/HelpSection";
import Informations from "@/components/Informations";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
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
            src="/banners/cleanSofa.png"
            alt="Entretien des produits"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-lg z-20">
            <p className="text-white text-3xl font-black uppercase">
              Entretien du produit
            </p>
            <p className="drop-shadow-lg w-1/3 text-center">
              {`Prenez soin de vos meubles pour préserver leur éclat et leur
              durabilité : des conseils simples pour une qualité qui dure.`}
            </p>
          </div>
        </div>

        {/* Paragraphe principal */}
        <div className="mt-12 text-center px-4 mb-12">
          <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
            {`Pour garantir une longévité optimale et maintenir l'apparence
            impeccable de vos meubles, un entretien régulier est essentiel. Que
            ce soit le bois, le tissu ou le cuir, chaque matériau demande des
            soins spécifiques pour résister aux défis du quotidien tout en
            conservant son charme unique.`}
          </p>

          <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
            {` Découvrez nos recommandations adaptées pour chaque type de produit
            et offrez à vos meubles l'attention qu'ils méritent.`}
          </p>
        </div>

        {/* Section entretien */}
        <div>
          <div className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"></div>
          <h2 className="font-bold text-3xl text-center mb-8">
            {`  Conseils d'entretien par type de matériau`}
          </h2>
          <ul className="flex mt-8 flex-col flex-wrap md:flex-row text-center gap-12 items-center justify-between">
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/cleanwood.jpg"
                  width={500}
                  height={500}
                  alt="Entretien du bois"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Bois : Nettoyage et entretien
              </strong>
              <p className="mt-2 max-w-xs">
                Nettoyez régulièrement avec un chiffon doux et sec. Évitez les
                produits chimiques agressifs et appliquez un soin spécifique
                pour nourrir et protéger les surfaces.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/cleantissu.jpg"
                  width={500}
                  height={500}
                  alt="Entretien des tissus"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Tissus : Protéger et nettoyer
              </strong>
              <p className="mt-2 max-w-xs">
                Aspirez régulièrement pour enlever la poussière et appliquez un
                traitement anti-taches si nécessaire. Évitez l’exposition
                prolongée à la lumière directe du soleil.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/cleancuir.jpg"
                  width={500}
                  height={500}
                  alt="Entretien du cuir"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Cuir : Nettoyer et nourrir
              </strong>
              <p className="mt-2 max-w-xs">
                Essuyez avec un chiffon humide et appliquez un baume nourrissant
                pour éviter le dessèchement. Évitez les objets pointus qui
                pourraient rayer la surface.
              </p>
            </li>
          </ul>
        </div>

        {/* Emballage et protection */}
        <div className="flex justify-center items-center mt-12">
          <div className="flex flex-col items-center w-2/3">
            <h3 className="font-bold mt-5 text-3xl text-center">
              Entretenez et protégez vos meubles au quotidien
            </h3>
            <p className="m-12 text-center">
              {`Pour préserver la beauté et la durabilité de vos meubles, adoptez des gestes simples mais efficaces : utilisez des patins pour éviter les rayures sur vos sols, optez pour des housses adaptées pour vos canapés et appliquez des traitements spécifiques, comme des solutions anti-humidité pour les meubles en bois dans les zones à fort taux d'humidité. Ces petites attentions feront toute la différence sur le long terme.`}
            </p>
          </div>

          <div className="w-2/6">
            <Image
              src="/banners/cleanTextile.webp"
              width={500}
              height={500}
              alt="Protection des meubles"
              className="object-cover w-full h-full"
            />
          </div>
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
