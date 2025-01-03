"use client";
import Footer from "@/components/Footer";
import HelpSection from "@/components/HelpSection";
import Informations from "@/components/Informations";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import AddressForm from "@/components/ValidatePurchase/AdrdressForm";
import DeliveryOptions from "@/components/ValidatePurchase/DeliveryOptions";
import InformationsPurchase from "@/components/ValidatePurchase/InformationsPurchase";
import PaymentOptions from "@/components/ValidatePurchase/PaymentOptions";
import TotalOptions from "@/components/ValidatePurchase/TotalOptions";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [activeStep, setActiveStep] = useState(1); // État pour suivre l'étape active

  const steps = [
    { id: 1, label: "Informations", icon: "/icons/account.svg" },
    { id: 2, label: "Adresses", icon: "/icons/address.svg" },
    { id: 3, label: "Livraison", icon: "/icons/delivery.svg" },
    { id: 4, label: "Paiement", icon: "/icons/payment.svg" },
  ];

  return (
    <section className="relative">
      <div className="container mt-6 mx-auto">
        <Navbar />

        {/* Image d'en-tête */}
        <div className="relative w-full h-[400px] mt-12">
          <Image
            src="/banners/checkOrder.jpg"
            alt="banner about"
            fill
            objectFit="cover"
            className="object-cover brightness-50 backdrop-invert-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-lg z-20">
            <p className="text-white text-3xl font-black uppercase">
              Validez votre commande
            </p>
            <p className="text-white drop-shadow-lg">
              Livraison rapide & retours gratuits – Achetez en toute confiance !
            </p>
          </div>
        </div>

        {/* Étapes interactives */}
        <div className="mt-12">
          <ul className="flex justify-center items-center space-x-12">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`flex flex-col  items-center text-center cursor-pointer transition-transform duration-300 ease-in-out ${
                  activeStep === step.id
                    ? "scale-110 text-[#DD0534] font-bold"
                    : "opacity-50 hover:opacity-100"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <Image
                  src={step.icon}
                  alt={step.label}
                  width={60}
                  height={60}
                  className="object-cover w-16"
                />
                <p className="mt-2">{step.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Contenu dynamique selon l'étape sélectionnée */}
        <div className="flex justify-center my-12">
          <div className="  text-center">
            {activeStep === 1 && <InformationsPurchase />}
            {activeStep === 2 && <AddressForm />}
            {activeStep === 3 && <DeliveryOptions />}
            {activeStep === 4 && <PaymentOptions />}
          </div>
          <TotalOptions />
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
