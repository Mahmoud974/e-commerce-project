"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddressForm from "@/components/Panier/AdressForm";
import DeliveryOptions from "@/components/Panier/DeliveryOptions";
import PaymentOptions from "@/components/Panier/PaymentOptions";
import TotalOptions from "@/components/Panier/TotalOptions";
import Image from "next/image";
import Baskets from "@/components/Panier/Baskets";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageLayoutBanner from "@/components/Layouts/PageLayoutBanner";
import { useRouter } from "next/navigation";

export default function ValidationContent() {
  const { data: session, status } = useSession();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState<
    | {
        id: number;
        title: string;
        description: string;
        price: string;
      }
    | undefined
  >(undefined);

  const [total, setTotal] = useState(0);
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
  console.log(total);
  console.log(totalQuantity);
  console.log(deliveryOption?.price);

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }
  const steps = [
    {
      id: 1,
      label: "Panier",
      icon: `${process.env.NEXT_PUBLIC_BANNER_IMAGE}icons/basket.svg`,
    },
    {
      id: 2,
      label: "Information",
      icon: `${process.env.NEXT_PUBLIC_BANNER_IMAGE}icons/account.svg`,
    },
    {
      id: 3,
      label: "Livraison",
      icon: `${process.env.NEXT_PUBLIC_BANNER_IMAGE}icons/delivery.svg`,
    },
    {
      id: 4,
      label: "Paiement",
      icon: `${process.env.NEXT_PUBLIC_BANNER_IMAGE}icons/payment.svg`,
    },
  ];

  const handleNextStep = (currentStep) => {
    if (currentStep === 1) {
      setActiveStep(2);
    } else if (currentStep === 2) {
      setActiveStep(3);
    } else if (currentStep === 3) {
      setActiveStep(4);
    }
  };

  return (
    <PageLayoutBanner
      title="Validez votre commande"
      description="Livraison rapide & retours gratuits – Achetez en toute confiance !"
      bannerImage="checkOrder.jpg"
    >
      <section className="relative">
        <div className="container mt-6 mx-auto">
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
          <div className="text-sm text-white flex items-center gap-2 mb-4">
            <Link href="/home">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Accueil
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Canapés
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-500 font-medium">Mon panier</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center my-12">
            <div className="text-center sm:text-left w-full sm:w-2/3 lg:w-2/2">
              {activeStep === 1 && (
                <Baskets
                  goToNextStep={() => handleNextStep(1)}
                  setTotal={setTotal}
                  totalQuantity={totalQuantity}
                  setTotalQuantity={setTotalQuantity}
                />
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
                  setDeliveryOption={setDeliveryOption} // ✅ Ceci manquait
                />
              )}

              {activeStep === 4 && (
                <PaymentOptions goToPreviousStep={() => setActiveStep(3)} />
              )}
            </div>
            <div className="w-full sm:w-1/3 lg:w-1/4 mt-6 sm:mt-0 sm:ml-6">
              <TotalOptions
                total={total}
                totalQuantity={totalQuantity}
                deliveryOption={deliveryOption}
                setDeliveryOption={setDeliveryOption}
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayoutBanner>
  );
}
