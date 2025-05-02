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
      <div className="container mt-6 mx-auto">
        <Navbar />

        {/* Image */}
        <Banner
          title="À propos de nous"
          description="Nous créons des meubles uniques qui améliorent les nouvelles façons
            de vivre, de travailler et de jouer."
          imageSrc="https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/about-banner.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2Fib3V0LWJhbm5lci5wbmciLCJpYXQiOjE3NDYxNjIyNDAsImV4cCI6MjA2MTUyMjI0MH0.0zw9nIMGcKq1ZZVn1E4HTTnfkqyshaFb2sbmQulF3M8"
        />

        {/* Paragraphe sous l'image */}
        <div className="mt-12 text-center px-4 mb-12">
          <p className="drop-shadow-lg w-1/2 text-center mx-auto">
            Nous créons des meubles uniques qui améliorent les nouvelles façons
            de vivre, de travailler et de jouer.
          </p>

          <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
            Depuis plus de 70 ans, nous collaborons avec les meilleurs designers
            du monde pour créer des meubles réputés pour leur modularité, leur
            fonctionnalité et leur qualité sans compromis. Grâce à la créativité
            et à l’artisanat danois, nous rehaussons les espaces avec un design
            iconique Timeless qui apporte joie et inspiration.
          </p>

          <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
            Nous nous efforçons d’améliorer la vie de chacun avec le design
            danois, et cette mission inspire notre devise :{" "}
            <span className="font-semibold italic">Live Ekstraordinær</span>
          </p>
        </div>
        <div>
          <div className="bg-red-700 w-1/3 h-3 mb-8"></div>
          <p>
            Les produits BoConcept incarnent les valeurs essentielles du design
            danois : un artisanat soigné, une simplicité élégante, une
            fonctionnalité optimale et l’utilisation de matériaux de haute
            qualité, qui sont au cœur de notre héritage
          </p>
          <ul className="flex mt-8 flex-col flex-wrap md:flex-row text-center gap-12 items-center justify-between">
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/cuir.jpg"
                  width={500}
                  height={500}
                  alt="Forme"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">Forme</strong>
              <p className="mt-2 max-w-xs">
                Chaque détail est méticuleusement pensé, apportant à nos
                créations une précision pure et un artisanat fonctionnel.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/comfortable.jpg"
                  width={500}
                  height={500}
                  alt="Sensation"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">Sensation</strong>
              <p className="mt-2 max-w-xs">
                Conçus pour être irrésistibles, nos produits offrent une
                expérience tactile et visuelle, éveillant tous les sens.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-96 h-96 bg-gray-200 overflow-hidden rounded-lg">
                <Image
                  src="/banners/function.jpg"
                  width={500}
                  height={500}
                  alt="Fonctionnalité"
                  className="object-cover w-full h-full"
                />
              </div>
              <strong className="text-red-600 mt-4 text-xl">
                Fonctionnalité
              </strong>
              <p className="mt-2 max-w-xs">
                {`  Nos designs allient forme et praticité, perpétuant la tradition
                du design danois qui met l'accent.`}
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
