"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useTemplate } from "@/hook/useTemplate";
import { Facebook, Heart, Instagram, ShoppingCart, Truck } from "lucide-react";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Caroussel";
import { colors } from "@/Interface/model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Newsletter from "@/components/Newsletter";
import Informations from "@/components/Informations";
import Image from "next/image";
import { SeveralPayment } from "@/components/SeveralPayment";
import HelpSection from "@/components/HelpSection";
import PaymentSeveral from "@/components/PaymentSeveral";
import { FaInstagram, FaPinterest } from "react-icons/fa";

export default function Page({ params }) {
  const [slug, setSlug] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeSection, setActiveSection] = useState("Description"); // Active section state
  const [activeButton, setActiveButton] = useState<string | null>(null); // New state to track active button

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    fetchParams();
  }, [params]);

  const { data } = useTemplate();
  const idArticle =
    data && slug ? data.find((article) => article.id === Number(slug)) : null;

  function handleCart(event: any): void {
    throw new Error("Function not implemented.");
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    addItems(item);
  };

  // Handle active button click
  const handleButtonClick = (section: string) => {
    setActiveSection(section);
    setActiveButton(section); // Set active button
  };

  return (
    <div>
      <main className="container mx-auto mt-6 flex-grow px-6">
        <Navbar />
        <section className="md:mx-0 flex md:mt-32 md:justify-start flex-col md:flex-row items-center">
          <div className="">
            <CarouselPlugin data={idArticle} />
          </div>

          <div className="md:ml-12 md:space-y-3">
            <div className="flex gap-5 justify-between">
              <div>
                <p className="text-4xl md:mt-0 mt-8 font-bold pl-0">
                  {idArticle?.nom}
                </p>
                <small>Ref 12578BO</small>
                <p className="text-md my-2 font-sans">
                  Canapé{" "}
                  <span className="font-bold text-red-500">
                    {idArticle?.seat}
                  </span>{" "}
                  place{idArticle?.seat !== 1 && "s"}
                </p>
              </div>
              <PaymentSeveral />
            </div>
            <p className="text-lg">{idArticle?.description}</p>
            <div className="flex   items-center">
              <p className=" ">Color: {idArticle?.color}</p>
              <div
                className={`w-5 h-5 rounded-full ml-3 ${
                  colors.find((color) => color.name === idArticle?.color)
                    ?.colorClass
                }`}
              ></div>
            </div>
            <ul className="flex   gap-5">
              <li className="flex flex-col text-md font-bold">
                <p>Hauteur </p> <p className="font-normal">54 cm</p>
              </li>
              <li className="flex flex-col  text-md font-bold">
                <p> Largeur </p> <p className="font-normal">160 cm</p>
              </li>
              <li className=" flex flex-col text-md font-bold">
                <p>Profondeur </p> <p className="font-normal">141 cm</p>
              </li>
            </ul>
            <div className="border border-green-900 bg-green-950 p-3 rounded-md  ">
              <p className="text-xs">
                Bénéficiez de 5% de réduction supplémentaire en utilisant le
                code CODE : CCFA5.
              </p>
            </div>
            <ul className="flex gap-3">
              <li>Share this product </li>
              <li>
                <Facebook />
              </li>
              <li>
                <Instagram />
              </li>
              <li></li>
            </ul>
            <div className="flex items-center">
              <span className="mr-2 text-3xl">{idArticle?.prix}€</span>

              <p className="line-through ml-2">{idArticle?.prix + 100}€</p>
              <div className="border-red-700 border px-1 ml-2 rounded-sm">
                <p className="text-red-700 font-bold">-11%</p>
              </div>
            </div>
            <p className="text-xs mt-3">{`Avec 4.80€ d'économie`}</p>
            <div className="flex">
              <Truck />
              <p className="ml-1 text-md">
                Délai de livraison estimé 4 à 6 semaines
              </p>
            </div>
            <div className="flex flex-col ">
              <div className="flex items-center justify-start gap-2 py-3 border-t border-gray-200">
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isInCart ? "bg-green-500" : "bg-gray-200"
                  }`}
                  onClick={handleCart}
                >
                  <ShoppingCart
                    className={`w-6 h-6 ${
                      isInCart ? "text-white" : "text-gray-800"
                    }`}
                  />
                </button>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isLiked ? "bg-red-500" : "bg-gray-200"
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "text-white" : "text-gray-800"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="text-white">
          <ul className="flex gap-3 mt-8">
            <li>
              <Button
                onClick={() => handleButtonClick("Description")}
                className={`transition-all ${
                  activeButton === "Description"
                    ? "transform active:scale-95 bg-gray-700"
                    : "bg-gray-500"
                }`}
              >
                Description
              </Button>
            </li>
            <li>
              <Button
                onClick={() => handleButtonClick("Dimensions")}
                className={`transition-all ${
                  activeButton === "Dimensions"
                    ? "transform active:scale-95 bg-gray-700"
                    : "bg-gray-500"
                }`}
              >
                Dimensions
              </Button>
            </li>
            <li>
              <Button
                onClick={() => handleButtonClick("Livraison")}
                className={`transition-all ${
                  activeButton === "Livraison"
                    ? "transform active:scale-95 bg-gray-700"
                    : "bg-gray-500"
                }`}
              >
                Livraison
              </Button>
            </li>
          </ul>
          <SeveralPayment />
          <div className="mt-8">
            {activeSection === "Description" && (
              <div>
                <h2 className="text-2xl font-bold">
                  Un duo de chaises Miranda pour sublimer votre salle à manger
                </h2>
                Voici une version plus étoffée de votre contenu :
                <p className="mt-4">
                  {`Transformez votre espace de vie en un havre de style et de
                  confort avec le lot de deux chaises Miranda kaki. Leur assise
                  en velours côtelé, douce et accueillante, offre non seulement
                  un confort optimal, mais aussi une esthétique sophistiquée.
                  Complétées par des pieds en métal noir, robustes et élégants,
                  ces chaises incarnent parfaitement l'équilibre entre modernité
                  et intemporalité. Que ce soit pour habiller une salle à
                  manger, un coin bureau ou même un espace détente, les chaises
                  Miranda apportent une touche d’élégance contemporaine et
                  post-industrielle. Leur design polyvalent s'intègre
                  harmonieusement à divers styles d'intérieur, tout en reflétant
                  un sens du détail et du raffinement inégalé.`}
                </p>
              </div>
            )}
            {activeSection === "Dimensions" && (
              <div>
                <h2 className="text-2xl font-bold">
                  Dimensions des chaises Miranda
                </h2>
                <table className="min-w-full mt-4 table-auto">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Dimension</th>
                      <th className="border px-4 py-2">Valeur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Hauteur totale</td>
                      <td className="border px-4 py-2">85 cm</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Largeur</td>
                      <td className="border px-4 py-2">50 cm</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Profondeur</td>
                      <td className="border px-4 py-2">45 cm</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Hauteur de l’assise</td>
                      <td className="border px-4 py-2">45 cm</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4">
                  Ces dimensions compactes permettent aux chaises Miranda de
                  s’adapter aussi bien aux petits espaces qu’aux grandes pièces
                  conviviales.
                </p>
              </div>
            )}
            {activeSection === "Livraison" && (
              <div>
                <h2 className="text-2xl font-bold">Livraison et montage</h2>
                <h3 className="mt-4 font-semibold">
                  Livraison devant chez vous sur rendez-vous
                </h3>
                <p className="mt-2">
                  <strong>Gratuit !</strong> Livraison à domicile avec dépôt du
                  colis au pied du camion sur rendez-vous. Disponible en France
                  (hors Corse et îles), Belgique, et Luxembourg.
                </p>
                <p className="mt-2">
                  <strong>Livraison estimée :</strong> Entre le **Jeudi 9
                  Janvier 2025** et le **Mardi 14 Janvier 2025**.
                </p>

                <h3 className="mt-4 font-semibold">
                  Livraison chez vous dans la pièce de votre choix sur
                  rendez-vous
                </h3>
                <p className="mt-2">
                  <strong>30,00 € TTC</strong> Livraison à domicile sur RDV dans
                  la pièce de votre choix. En France (hors Corse et îles),
                  Belgique, et Luxembourg.
                </p>
                <p className="mt-2">
                  <strong>Livraison estimée :</strong> Entre le **Jeudi 9
                  Janvier 2025** et le **Mardi 14 Janvier 2025**.
                </p>

                <h3 className="mt-4 font-semibold">Zones de livraison</h3>
                <ul className="mt-2">
                  <li>France métropolitaine</li>
                  <li>Belgique</li>
                  <li>Luxembourg</li>
                </ul>

                <h3 className="mt-4 font-semibold">
                  {`14 jours pour changer d'avis`}
                </h3>
                <p className="mt-2">
                  {` Si le produit ne vous satisfait pas pleinement, vous disposez,
                  dès réception de votre commande, d'un délai de **14 jours**
                  pour vous rétracter. Il vous suffit de nous contacter par
                  email ou par téléphone pour initier le retour et obtenir un
                  remboursement.`}
                </p>
                <p className="mt-2">
                  Ce délai de rétractation est valable uniquement pour les
                  paiements directs (carte bancaire). Si vous avez choisi un
                  paiement en plusieurs fois, le délai peut être modifié.
                </p>
              </div>
            )}
          </div>
        </div>
        <section className="mt-10">
          <div className="flex flex-col overflow-x-auto scrollbar-hide">
            <p className="text-2xl font-bold mb-6">Notre recommandation</p>
            <Recommendations />
          </div>
        </section>
      </main>

      <Informations />
      <Newsletter />
      <HelpSection />
      <div className="mx-auto container">
        <Footer />
      </div>
    </div>
  );
}

function addItems(item: any): any {
  throw new Error("Function not implemented.");
}
