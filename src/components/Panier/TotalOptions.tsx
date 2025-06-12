import React, { useState } from "react";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Image from "next/image";

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

  const remise = isCodeValid ? 10 : 0;

  const totalFinal = (total + livraison - remise).toFixed(2);

  const handleApplyCode = () => {
    if (discountCode.trim().toUpperCase() === "PROMO10") {
      setIsCodeValid(true);
      setErrorMessage("");
    } else {
      setIsCodeValid(false);
      setErrorMessage("Code invalide. Veuillez réessayer.");
    }
  };

  const paymentLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
      alt: "mastercard",
    },
    {
      src: "https://www.aderivatives.com/lib/fontawesome-free-5.0.13/advanced-options/raw-svg/brands/apple-pay.svg",
      alt: "apple-pay",
    },
    {
      src: "https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg",
      alt: "visa",
    },
    {
      src: "https://static.cdnlogo.com/logos/p/41/paypal.svg",
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
          <div className="flex">
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
            <p className="text-green-600">Code appliqué : -10€</p>
          )}
        </div>

        {/* Paiement sécurisé */}
        <div className="flex gap-4 items-start p-8 text-black bg-white border shadow-sm">
          <ShieldCheck className="mt-1 w-9 h-9" />
          <div>
            <p className="text-2xl font-bold">Paiement sécurisé :</p>
            <p>Paiement en plusieurs fois</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {paymentLogos.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={65}
                  height={65}
                  className="object-contain"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-start p-8 text-black bg-white border shadow-sm">
          <Truck className="-mt-4 w-16 h-16" />
          <div>
            <p className="text-2xl font-bold">Livraison à domicile :</p>
            <p>
              Sur rendez-vous, à l&#39;étage, dans la pièce de votre choix (FR, BE,
              LU, MCO)
            </p>
          </div>
        </div>

        {/* Garantie */}
        <div className="flex gap-4 items-start p-8 text-black bg-white border shadow-sm">
          <RotateCcw className="w-14 h-14" />
          <div>
            <p className="font-semibold">Satisfait ou remboursé :</p>
            <p>14 jours pour changer ddd&#39;a#39;a#39;avis sur vos achats</p>
          </div>
        </div>
      </div>
    </>
  );
}
