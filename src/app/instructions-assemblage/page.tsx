import Footer from "@/components/BottomSection/Footer";
import HelpSection from "@/components/BottomSection/HelpSection";
import Informations from "@/components/BottomSection/Informations";
import Newsletter from "@/components/BottomSection/Newsletter";
import Image from "next/image";
import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";

export default function Page() {
  return (
    <PageLayoutBanner
      title="Instructions d'assemblage"
      description="Une garantie exceptionnelle pour des meubles conçus pour durer et
              un accompagnement à chaque étape."
      bannerImage={"about-banner.png"}
    >
      <section className="relative">
        <div className="container mt-6 mx-auto">
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
              {`Conseils d'entretien par type de matériau`}
            </h2>
            <ul className="flex lg:px-0 px-12 flex-col sm:flex-row mt-8 gap-12 items-center justify-center sm:space-x-8">
              <li className="flex flex-col items-center w-full sm:w-1/3">
                <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg">
                  <Image
                    src="/banners/cleanwood.jpg"
                    width={500}
                    height={500}
                    alt="Entretien du bois"
                    className="object-cover w-full h-full"
                  />
                </div>
                <strong className="text-red-600 text-center mt-4 text-xl">
                  Bois : Nettoyage et entretien
                </strong>
                <p className="mt-2 text-center sm:max-w-xs">
                  Nettoyez régulièrement avec un chiffon doux et sec. Évitez les
                  produits chimiques agressifs et appliquez un soin spécifique
                  pour nourrir et protéger les surfaces.
                </p>
              </li>
              <li className="flex flex-col items-center w-full sm:w-1/3">
                <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg">
                  <Image
                    src="/banners/cleantissu.jpg"
                    width={500}
                    height={500}
                    alt="Entretien des tissus"
                    className="object-cover w-full h-full"
                  />
                </div>
                <strong className="text-red-600 text-center mt-4 text-xl">
                  Tissus : Protéger et nettoyer
                </strong>
                <p className="mt-2 text-center sm:max-w-xs">
                  Aspirez régulièrement pour enlever la poussière et appliquez
                  un traitement anti-taches si nécessaire. Évitez l’exposition
                  prolongée à la lumière directe du soleil.
                </p>
              </li>
              <li className="flex flex-col items-center w-full sm:w-1/3">
                <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg">
                  <Image
                    src="/banners/cleancuir.jpg"
                    width={500}
                    height={500}
                    alt="Entretien du cuir"
                    className="object-cover w-full h-full"
                  />
                </div>
                <strong className="text-red-600 text-center mt-4 text-xl">
                  Cuir : Nettoyer et nourrir
                </strong>
                <p className="mt-2 text-center sm:max-w-xs">
                  Essuyez avec un chiffon humide et appliquez un baume
                  nourrissant pour éviter le dessèchement. Évitez les objets
                  pointus qui pourraient rayer la surface.
                </p>
              </li>
            </ul>
          </div>
          {/* Emballage et protection */}
          <div className="flex flex-col sm:flex-row justify-center items-center mt-12">
            <div className="flex flex-col items-center w-full sm:w-2/3">
              <h3 className="font-bold text-3xl text-center">
                Entretenez et protégez vos meubles au quotidien
              </h3>
              <p className="m-12 text-center">
                {`Pour préserver la beauté et la durabilité de vos meubles, adoptez des gestes simples mais efficaces : utilisez des patins pour éviter les rayures sur vos sols, optez pour des housses adaptées pour vos canapés et appliquez des traitements spécifiques, comme des solutions anti-humidité pour les meubles en bois dans les zones à fort taux d'humidité. Ces petites attentions feront toute la différence sur le long terme.`}
              </p>
            </div>

            <div className="w-full sm:w-1/3">
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
    </PageLayoutBanner>
  );
}
