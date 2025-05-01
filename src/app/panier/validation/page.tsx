"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "@/components/SectionDown/Footer";
import HelpSection from "@/components/SectionDown/HelpSection";
import Informations from "@/components/SectionDown/Informations";
import Navbar from "@/components/Header/Navbar";
import Newsletter from "@/components/SectionDown/Newsletter";
import AddressForm from "@/components/BasketValidation/AdrdressForm";
import DeliveryOptions from "@/components/BasketValidation/DeliveryOptions";
import PaymentOptions from "@/components/BasketValidation/PaymentOptions";
import TotalOptions from "@/components/BasketValidation/TotalOptions";
import Image from "next/image";
import Banner from "@/components/BannerImage";
import Baskets from "@/components/BasketValidation/Baskets";

export default function ValidationContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  const steps = [
    { id: 1, label: "Panier", icon: "/icons/basket.svg" },
    { id: 2, label: "Information", icon: "/icons/account.svg" },
    { id: 3, label: "Livraison", icon: "/icons/delivery.svg" },
    { id: 4, label: "Paiement", icon: "/icons/payment.svg" },
  ];

  const handleNextStep = (currentStep) => {
    // Valider l'étape actuelle et passer à la suivante
    if (currentStep === 1) {
      setActiveStep(2);
    } else if (currentStep === 2) {
      setActiveStep(3);
    } else if (currentStep === 3) {
      setActiveStep(4);
    }
  };

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
                    : activeStep > step.id
                    ? "opacity-100 cursor-pointer"
                    : "opacity-50 pointer-events-none"
                }`}
                onClick={() => activeStep > step.id && setActiveStep(step.id)}
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
            {activeStep === 1 && (
              <Baskets goToNextStep={() => handleNextStep(1)} />
            )}
            {activeStep === 2 && (
              <AddressForm
                goToNextStep={() => handleNextStep(2)}
                goToPreviousStep={() => setActiveStep(1)}
              />
            )}
            {activeStep === 3 && (
              <DeliveryOptions
                goToPreviousStep={() => setActiveStep(2)}
                goToNextStep={() => handleNextStep(3)}
              />
            )}
            {activeStep === 4 && (
              <PaymentOptions goToPreviousStep={() => setActiveStep(3)} />
            )}
          </div>
          <div className="w-full sm:w-1/3 lg:w-1/4 mt-6 sm:mt-0 sm:ml-6">
            <TotalOptions />
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
