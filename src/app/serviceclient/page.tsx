import Footer from "@/components/Footer";
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
            src="/banners/service-img.png"
            alt="banner about"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0  "
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-lg z-20">
            <p className="text-white text-3xl font-black uppercase">
              Service client
            </p>
            <p className="drop-shadow-lg w-1/2 text-center">
              Chez Sofachic, notre équipe d’experts est là pour vous offrir un
              service personnalisé et vous accompagner dans vos projets
              d’aménagement, de la commande à la livraison, pour créer
              l’intérieur de vos rêves.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-red-700 w-1/3 h-3 my-8"></div>

          <p>
            Les produits BoConcept incarnent les valeurs essentielles du design
            danois : un artisanat soigné, une simplicité élégante, une
            fonctionnalité optimale et l’utilisation de matériaux de haute
            qualité, qui sont au cœur de notre héritage
          </p>
          <ul className="flex mt-8    md:flex-row text-center     ">
            <li className="flex flex-col items-center">
              <div className="w-1/2 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/cuir.jpg"
                  width={500}
                  height={500}
                  alt="Forme"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">Forme</strong>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </section>
  );
}
