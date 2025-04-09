"use client";
import Footer from "@/components/SectionDown/Footer";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";
import Navbar from "@/components/Header/Navbar";
import Newsletter from "@/components/SectionDown/Newsletter";
import AddressForm from "@/components/BasketValidation/AdrdressForm";
import DeliveryOptions from "@/components/BasketValidation/DeliveryOptions";
import InformationsPurchase from "@/components/BasketValidation/InformationsPurchase";
import PaymentOptions from "@/components/BasketValidation/PaymentOptions";
import TotalOptions from "@/components/BasketValidation/TotalOptions";
import Image from "next/image";
import React, { useState } from "react";
import Banner from "@/components/BannerImage";

export default function Page() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 2, label: "Adresses", icon: "/icons/address.svg" },
    { id: 3, label: "Livraison", icon: "/icons/delivery.svg" },
    { id: 4, label: "Paiement", icon: "/icons/payment.svg" },
    { id: 1, label: "Informations", icon: "/icons/account.svg" },
  ];

  return (
    <section className="relative">
      <div className="container mt-6 mx-auto">
        <Navbar />

        {/* Image d'en-tête */}
        <Banner
          title="Validez votre commande"
          description="Livraison rapide & retours gratuits – Achetez en toute confiance !"
          imageSrc="/banners/checkOrder.jpg"
        />

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
