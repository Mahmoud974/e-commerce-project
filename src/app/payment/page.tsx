import { AccordionGuarantee } from "@/components/AccordionGuarantee";
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
            src="/banners/payment-img.jpg"
            alt="banner about"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0"
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

        {/* Section des caractéristiques */}
        <div>
          <div className="bg-red-700 w-1/3 h-3 my-8  "></div>
          <p>
            {`Chez SofaChic, nous mettons un point d'honneur à utiliser des
            matériaux robustes et durables. C’est pourquoi nous proposons une
            garantie de 10 ans pour les cadres de canapé, couvrant les défauts
            de fabrication et de structure.`}
          </p>

          <div className="mt-12">
            <h2 className="font-bold text-3xl text-left">Moyens de paiement</h2>
            <p className="mt-4">
              Vous pouvez régler vos achats en toute sérénité grâce à nos
              options de paiement sécurisé.
            </p>

            {/* Paiement par carte bancaire */}
            <div className="mt-8">
              <h3 className="font-semibold text-xl">
                Paiement par carte bancaire
              </h3>
              <p className="mt-2">
                Payez en ligne en toute sécurité avec votre carte bancaire. Nous
                acceptons les cartes CB, VISA et MASTERCARD, valides en France,
                Belgique et Luxembourg.
              </p>
              <p className="mt-4">
                {` Le paiement par carte bancaire est totalement sécurisé grâce au
                protocole 3D Secure. Votre banque sera uniquement impliquée dans
                la transaction pour garantir sa sécurité, et nous n'enregistrons
                aucune donnée bancaire.`}
              </p>
              <p className="mt-4">
                {` En cas d'utilisation frauduleuse de la carte, vous avez la
                possibilité de demander l'annulation du paiement et le
                remboursement.`}
              </p>
            </div>

            {/* Options de paiement en plusieurs fois */}
            <div className="mt-8">
              <h3 className="font-semibold text-xl">
                Paiement en plusieurs fois
              </h3>
              <p className="mt-2">
                Pour faciliter vos achats, nous vous proposons des solutions de
                paiement en plusieurs fois :
              </p>
              <table className="mt-4 table-auto w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Option de paiement</th>
                    <th className="border px-4 py-2">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">
                      Paiement en 3 ou 4 fois
                    </td>
                    <td className="border px-4 py-2">Avec Alma</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">
                      Paiement en 10 ou 12 fois
                    </td>
                    <td className="border px-4 py-2">Avec Alma</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <HelpSection />
        </div>
      </div>
      <Informations />
      <Newsletter />
      <div className="mx-auto container">
        <Footer />
      </div>
    </section>
  );
}
