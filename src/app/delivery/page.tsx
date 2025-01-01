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
            src="/banners/delivery-img.png"
            alt="banner about"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0  "
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-lg z-20">
            <p className="text-white text-3xl font-black uppercase">
              Livraison
            </p>
            <p className="drop-shadow-lg w-1/3 text-center">
              {`Votre meuble sur-mesure, livré avec soin et dans les meilleurs
              délais, pour une expérience unique jusque dans les moindres
              détails.`}
            </p>
          </div>
        </div>

        {/* Paragraphe sous l'image */}
        <div className="mt-12 text-center px-4 mb-12">
          <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
            Nous sommes fiers de notre capacité à concevoir et personnaliser des
            meubles parfaitement adaptés à vos besoins. Cela signifie que chaque
            produit est unique et que nous maintenons un stock très limité de
            nos designs. Nos artisans, dans notre atelier, fabriquent votre
            mobilier sur-mesure en utilisant des matériaux de la plus haute
            qualité, provenant des quatre coins du monde. Cependant, cela
            demande du temps. Chaque détail nécessite une attention particulière
            pour garantir la qualité, et bien que nous fassions tout notre
            possible pour vous livrer dans les meilleurs délais, les délais
            indiqués ci-dessous reflètent le temps de fabrication habituel.
          </p>

          <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
            Nous nous efforçons d’améliorer la vie de chacun avec le design
            danois, et cette mission inspire notre devise :{" "}
            <span className="font-semibold italic">Live Ekstraordinær</span>
          </p>
        </div>
        <div>
          <div className="bg-red-700 w-1/3 h-3 mb-8"></div>
          <h2 className="font-bold text-3xl">
            Estimations des dates de livraison
          </h2>
          <ul className="flex mt-8 flex-col flex-wrap md:flex-row text-center gap-12 items-center justify-between">
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/art.jpg"
                  width={500}
                  height={500}
                  alt="Forme"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Meubles en bois : 2 à 4 semaines
              </strong>
              <p className="mt-2 max-w-xs">
                Fabriqués dans notre atelier au Danemark, nos meubles en bois
                sont expédiés directement vers vous une fois terminés. Chaque
                pièce est soigneusement conçue pour garantir une qualité
                exceptionnelle.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/art2.jpg"
                  width={500}
                  height={500}
                  alt="Sensation"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Meubles capitonnés : 6 à 8 semaines
              </strong>
              <p className="mt-2 max-w-xs">
                La fabrication de meubles capitonnés exige un savoir-faire
                spécialisé, avec des artisans qualifiés pour des pièces comme le
                fauteuil Imola, dont la formation dure près d’un an.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/sofa.jpg"
                  width={500}
                  height={500}
                  alt="Fonctionnalité"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Chaises : 6 à 8 semaines
              </strong>
              <p className="mt-2 max-w-xs">
                {`  Nous proposons une large gamme de chaises, bancs et fauteuils inclinables, tous fabriqués avec soin et livrés dans les délais mentionnés.`}
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center w-2/3">
            <h3 className="font-bold mt-5 text-3xl text-center">
              Emballage et protection
            </h3>
            <p className="m-12 text-center">
              {` Tous nos meubles en bois sont soigneusement emballés selon des
              normes strictes de sécurité pour le transport. Chaque pièce est
              protégée avec de la mousse et du polystyrène expansé (EPS) sur les
              surfaces et les bords, et soumise à des tests de chute pour éviter
              tout dommage en cas d'impact. Les cartons sont renforcés aux deux
              extrémités pour permettre un placement vertical sécurisé, et des
              symboles sur les articles fragiles indiquent la manière correcte
              de les manipuler. Nos emballages sont conçus pour résister à une
              pluie légère, bien qu'ils ne soient pas totalement étanches.`}
            </p>
          </div>
          <div className="w-2/6">
            <Image
              src="/banners/sofa.jpg"
              width={500}
              height={500}
              alt="Fonctionnalité"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <HelpSection />

        <Footer />
      </div>
    </section>
  );
}
