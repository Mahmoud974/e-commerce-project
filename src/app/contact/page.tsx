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
        <Banner
          title="Contactez-nous"
          description=" Nous nous réjouissons de vous rencontrer bientôt."
          imageSrc="/banners/service-img.png"
        />

        <div>
          <div className="bg-red-700 w-1/3 h-3 my-8 mx-auto"></div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Contactez-nous
            </h2>
            <form className="w-full max-w-3xl mx-auto p-6 bg-black shadow-lg">
              {/* Prénom et Nom */}
              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full mb-4 sm:mb-0">
                  <label htmlFor="firstName" className="block font-bold mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="lastName" className="block font-bold mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
              </div>

              {/* Email et Numéro de téléphone */}
              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label htmlFor="email" className="block font-bold mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="phone" className="block font-bold mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
              </div>

              {/* Code postal et Ville */}
              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label htmlFor="postalCode" className="block font-bold mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="city" className="block font-bold mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
              </div>

              {/* Commentaire */}
              <div className="mb-4">
                <label htmlFor="comments" className="block font-bold mb-2">
                  Commentaire
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 bg-black focus:outline-none focus:ring focus:ring-red-300"
                ></textarea>
              </div>

              {/* Newsletter checkbox */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="mr-2"
                />
                <label htmlFor="newsletter" className="font-bold">
                  Recevez les dernières actualités
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full   text-black py-2 px-4 font-bold bg-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              >
                Envoyer
              </button>
            </form>
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
