import Image from "next/image";
import React from "react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
const baseImageUrl = process.env.NEXT_PUBLIC_BANNER_IMAGE || "";
export default function Page() {
  return (
    <PageLayoutBanner
      title="Livraison"
      description="Votre meuble sur-mesure, livré avec soin et dans les meilleurs
              délais, pour une expérience unique jusque dans les moindres
              détails."
      bannerImage={"delivery-img.png"}
    >
      <section className="relative">
        <div className="container my-6 mx-auto">
          {/* Paragraphe sous l'image */}
          <div className="mt-12 text-center px-4 mb-12">
            <p className="text-white text-lg mt-6 max-w-3xl mx-auto">
              Nous sommes fiers de notre capacité à concevoir et personnaliser
              des meubles parfaitement adaptés à vos besoins. Cela signifie que
              chaque produit est unique et que nous maintenons un stock très
              limité de nos designs. Nos artisans, dans notre atelier,
              fabriquent votre mobilier sur-mesure en utilisant des matériaux de
              la plus haute qualité, provenant des quatre coins du monde.
              Cependant, cela demande du temps. Chaque détail nécessite une
              attention particulière pour garantir la qualité, et bien que nous
              fassions tout notre possible pour vous livrer dans les meilleurs
              délais, les délais indiqués ci-dessous reflètent le temps de
              fabrication habituel.
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
            <ul className="flex   flex-col sm:flex-row mt-8 gap-12 items-center justify-start sm:space-x-8">
              <li className="flex flex-col items-center w-full sm:w-1/3">
                <div className="w-full  h-72 bg-gray-200 overflow-hidden rounded-lg">
                  <Image
                    src={baseImageUrl + "/art2.jpg"}
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
                  Conçus dans notre atelier au Danemark, ces meubles sont
                  fabriqués avec des matériaux nobles. Chaque pièce est unique,
                  alliant artisanat traditionnel et design moderne pour une
                  qualité durable.
                </p>
              </li>
              <li className="flex flex-col items-center w-full sm:w-1/3">
                <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg">
                  <Image
                    src={baseImageUrl + "/art.jpg"}
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
                  Réalisés par des artisans experts, nos meubles capitonnés
                  demandent un savoir-faire de précision. Chaque modèle est
                  soigneusement assemblé à la main pour garantir confort et
                  élégance.
                </p>
              </li>
              <li className="flex flex-col items-center w-full sm:w-1/3">
                <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg ">
                  <Image
                    src={baseImageUrl + "/sofa.jpg"}
                    width={500}
                    height={500}
                    alt="Fonctionnalité"
                    className="object-cover w-full h-full"
                  />
                </div>
                <strong className="text-red-600 text-center mt-4 text-xl">
                  Meubles capitonnés : 6 à 8 semaines
                </strong>
                <p className="mt-2 text-center sm:max-w-xs">
                  Nos chaises sont pensées pour allier confort et esthétique.
                  Disponibles en plusieurs styles et couleurs, elles sont
                  parfaites pour compléter votre intérieur avec raffinement.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </PageLayoutBanner>
  );
}
