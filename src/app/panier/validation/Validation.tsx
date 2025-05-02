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
import Banner from "@/components/BannerImage";
import React, { useState } from "react";

export default function ValidationContent() {
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
        <Banner
          title="Validez votre commande"
          description="Livraison rapide & retours gratuits – Achetez en toute confiance !"
          imageSrc="/banners/checkOrder.jpg"
        />

        <div className="mt-12">
          <ul className="flex flex-wrap justify-center items-center space-x-8 sm:space-x-12">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`flex flex-col items-center text-center cursor-pointer transition-transform duration-300 ease-in-out ${
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

        <div className="flex flex-col sm:flex-row justify-center my-12">
          <div className="text-center sm:text-left w-full sm:w-2/3 lg:w-2/2">
            {activeStep === 1 && <InformationsPurchase />}
            {activeStep === 2 && <AddressForm />}
            {activeStep === 3 && <DeliveryOptions />}
            {activeStep === 4 && <PaymentOptions />}
          </div>
          <div className="w-full sm:w-1/3 lg:w-1/4 mt-6 sm:mt-0 sm:ml-6">
            <TotalOptions />
          </div>
        </div>
      </div>
      psd
    </section>
  );
}
