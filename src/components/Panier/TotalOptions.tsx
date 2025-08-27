import React, { useState } from "react";
import {   Truck, RotateCcw } from "lucide-react";
import { FaCcApplePay, FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
export default function TotalOptions({
  total,
  totalQuantity,
  deliveryOption,
}: {
  total: number;
  totalQuantity: number;
  deliveryOption?: {
    id: number;
    title: string;
    description: string;
    price: string;
  };
  setDeliveryOption?: (option: {
    id: number;
    title: string;
    description: string;
    price: string;
  }) => void;
}) {
  const [discountCode, setDiscountCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const livraison =
    deliveryOption && typeof deliveryOption.price === "string"
      ? deliveryOption.price.toLowerCase().includes("gratuit")
        ? 0
        : parseFloat(
            deliveryOption.price.replace("€", "").replace(",", ".").trim()
          )
      : 0;

  const remise = isCodeValid ? total * 0.20 : 0; // 20% discount

  const totalFinal = (total + livraison - remise).toFixed(2);

  const handleApplyCode = () => {
    if (discountCode.trim().toUpperCase() === "SAVE20") {
      setIsCodeValid(true);
      setErrorMessage("");
    } else {
      setIsCodeValid(false);
      setErrorMessage("Code invalide. Veuillez réessayer.");
    }
  };

  const paymentLogos = [
    {
      src: "https://www.svgrepo.com/show/349326/mastercard.svg",
      alt: "mastercard",
    },
    {
      src: "https://www.svgrepo.com/show/349272/apple-pay.svg",
      alt: "apple-pay",
    },
    {
      src: "https://www.svgrepo.com/show/349343/visa.svg",
      alt: "visa",
    },
    {
      src: "https://www.svgrepo.com/show/349339/paypal.svg",
      alt: "paypal",
    },
  ];

  return (
    <>
      <div className="p-8 text-black bg-white border shadow-sm">
        <p className="mb-4 text-2xl font-bold">Votre commande</p>

        <ul>
          <li className="flex justify-between mt-4">
            <p>
              Produit{totalQuantity > 1 ? "s" : ""}{" "}
              <span className="font-bold">({totalQuantity})</span>
            </p>
            <p className="font-bold">{total.toFixed(2)}€</p>
          </li>
          <li className="flex justify-between mt-4">
            <p>Livraison</p>
            <p>{deliveryOption ? deliveryOption.price : "-"}</p>
          </li>
          <li className="flex justify-between mt-4">
            <p>Remise</p>
            <p>-{remise.toFixed(2)}€</p>
          </li>
        </ul>

        <div className="bg-gray-300 h-[1px] w-full my-4"></div>

        <ul>
          <li className="flex justify-between mt-4">
            <div>
              <p>Prix total</p>
              <small className="text-gray-600">(Taxes 396,53€)</small>
            </div>
            <p className="font-bold">{totalFinal}€</p>
          </li>
        </ul>
      </div>

      {/* Infos supplémentaires */}
      <div className="mt-8 space-y-6 text-sm">
        <div className="flex flex-col gap-4 p-8 text-black bg-white border shadow-sm">
          <label htmlFor="discountCode" className="mb-4 text-2xl font-bold">
            Code de réduction
          </label>
          <div className="flex  ">
            <input
              type="text"
              id="discountCode"
              className="placeholder-gray-500 text-black bg-transparent border-b-2 border-black focus:outline-none"
              placeholder="Entrez votre code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              onClick={handleApplyCode}
              className="p-2 ml-4 text-white bg-red-700 rounded-md hover:bg-gray-700"
            >
              Appliquer
            </button>
          </div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {isCodeValid && (
            <p className="text-green-600">Code appliqué : -20%</p>
          )}
        </div>

        {/* Paiement sécurisé */}
        <div className="flex  justify-between items-start p-8 text-black bg-white border shadow-sm">
        
          <div>
            <p className="text-2xl font-bold w-auto">Paiement sécurisé:</p>
            <p>Paiement en plusieurs fois</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <ul className="flex gap-3">
                <li>
                <FaCcMastercard className="text-5xl"/>
                </li>
                <li>
                <FaCcPaypal className="text-5xl"/>
                </li>
                <li>
                <FaCcVisa className="text-5xl"/>
                </li>
                <li>
                <FaCcApplePay className="text-5xl"/>
                </li>
                

              </ul>
              
            </div>
          </div>
        </div>

        <div className="flex  items-start p-8 text-black bg-white border shadow-sm">
           
          <div>
            <p className="text-2xl font-bold">Livraison à domicile:</p>
            <p>
             {` Sur rendez-vous, à l'étage, dans la pièce de votre choix (FR, BE,
              LU, MCO)`}
            </p>
          </div>
        </div>

        {/* Garantie */}
        <div className="flex  items-start p-8 text-black bg-white border shadow-sm">
          
          <div>
            <p className="text-2xl font-bold">Garantie:</p>
            <p>{`14 jours pour changer d' avis sur vos achats`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
