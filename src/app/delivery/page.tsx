import Banner from "@/components/BannerImage";
import Footer from "@/components/SectionDown/Footer";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";
import Navbar from "@/components/Header/Navbar";
import Newsletter from "@/components/SectionDown/Newsletter";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section className="relative">
      <div className="container my-6 mx-auto">
        <Navbar />

        {/* Image */}
        <Banner
          title="Livraison"
          description="Votre meuble sur-mesure, livré avec soin et dans les meilleurs
              délais, pour une expérience unique jusque dans les moindres
              détails."
          imageSrc="https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/delivery-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2RlbGl2ZXJ5LWltZy5wbmciLCJpYXQiOjE3NDYxNjI1MTcsImV4cCI6MjA2MTUyMjUxN30.G4qjPzulU_mPxWRCjeDbuGXaxgtMnStVHpJUD6Wr0Bc"
        />

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

        {/* Estimations des dates de livraison */}
        <div>
          <div className="bg-red-700 w-1/3 h-3 mb-8 mx-auto"></div>
          <h2 className="font-bold text-3xl text-center">
            Estimations des dates de livraison
          </h2>
          <ul className="flex mx-12 flex-col sm:flex-row mt-8 gap-12 items-center justify-center sm:space-x-8">
            <li className="flex flex-col items-center w-full sm:w-1/3">
              <div className="w-full  h-72 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/art.jpg"
                  width={500}
                  height={500}
                  alt="Forme"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 text-center mt-4 text-xl">
                Meubles en bois : 2 à 4 semaines
              </strong>
              <p className="mt-2 text-center sm:max-w-xs">
                Fabriqués dans notre atelier au Danemark, nos meubles en bois
                sont expédiés directement vers vous une fois terminés. Chaque
                pièce est soigneusement conçue pour garantir une qualité
                exceptionnelle.
              </p>
            </li>
            <li className="flex flex-col items-center w-full sm:w-1/3">
              <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/art2.jpg"
                  width={500}
                  height={500}
                  alt="Sensation"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 text-center mt-4 text-xl">
                Meubles capitonnés : 6 à 8 semaines
              </strong>
              <p className="mt-2 text-center sm:max-w-xs">
                La fabrication de meubles capitonnés exige un savoir-faire
                spécialisé, avec des artisans qualifiés pour des pièces comme le
                fauteuil Imola, dont la formation dure près d’un an.
              </p>
            </li>
            <li className="flex flex-col items-center w-full sm:w-1/3">
              <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg ">
                <Image
                  src="/banners/sofa.jpg"
                  width={500}
                  height={500}
                  alt="Fonctionnalité"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 text-center mt-4 text-xl">
                Chaises : 6 à 8 semaines
              </strong>
              <p className="mt-2 text-center sm:max-w-xs">
                Nous proposons une large gamme de chaises, bancs et fauteuils
                inclinables, tous fabriqués avec soin et livrés dans les délais
                mentionnés.
              </p>
            </li>
          </ul>
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
