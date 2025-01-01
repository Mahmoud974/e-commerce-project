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
            src="/banners/service-img.png"
            alt="banner about"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-lg z-20">
            <p className="text-white text-3xl font-black uppercase">
              Contactez-nous
            </p>
            <p className="drop-shadow-lg">
              Nous nous réjouissons de vous rencontrer bientôt.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-red-700 w-1/3 h-3 my-8"></div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Contactez-nous
            </h2>
            <form className="w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
              {/* Prénom et Nom */}
              <div className="mb-4">
                <div className="w-full mb-4">
                  <label htmlFor="firstName" className="block font-bold mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
              </div>

              {/* Email et Numéro de téléphone */}
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="email" className="block font-bold mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="phone" className="block font-bold mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
              </div>

              {/* Code postal et Ville */}
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="postalCode" className="block font-bold mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="city" className="block font-bold mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
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
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
        <HelpSection />
        <Footer />
      </div>
    </section>
  );
}
