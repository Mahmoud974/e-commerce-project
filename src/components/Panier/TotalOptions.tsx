import React from "react";
import {
  ShieldCheck,
  Phone,
  CreditCard,
  Truck,
  RotateCcw,
  PhoneCall,
} from "lucide-react";

export default function TotalOptions({
  total,
  totalQuantity,
  deliveryOption,
  setDeliveryOption,
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
  const livraison =
    deliveryOption && typeof deliveryOption.price === "string"
      ? deliveryOption.price.toLowerCase().includes("gratuit")
        ? 0
        : parseFloat(
            deliveryOption.price.replace("€", "").replace(",", ".").trim()
          )
      : 0;

  const totalFinal = (total + livraison).toFixed(2);

  return (
    <>
      <div className="bg-[#0e0e0e] p-8 text-white">
        <p className="font-bold text-2xl mb-4">Votre commande</p>

        <ul>
          <li className="flex justify-between mt-4">
            <p>
              Produit{totalQuantity > 1 ? "s" : ""} ({totalQuantity})
            </p>
            <p>{total?.toFixed(2)}€</p>
          </li>
          <li className="flex justify-between mt-4">
            <p>Livraison</p>
            <p>{deliveryOption ? deliveryOption.price : "-"}</p>
          </li>
          <li className="flex justify-between mt-4">
            <p>Remise</p>
            <p>-</p>
          </li>
        </ul>

        <div className="bg-white h-[1px] w-full my-4"></div>

        <ul>
          <li className="flex justify-between mt-4">
            <div>
              <p>price total</p>
              <small>(Taxes 396,53€)</small>
            </div>
            <p className="font-bold">{totalFinal}€</p>
          </li>
        </ul>
      </div>

      {/* Infos supplémentaires */}
      <div className="mt-8 text-sm space-y-6">
        <div className="bg-[#0e0e0e] p-8 text-white flex flex-col gap-4 items-center">
          <div className="flex">
            <input
              type="text"
              id="discountCode"
              className="bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none"
              placeholder="Entrez votre code"
            />
            <button className="text-white bg-[#101010] p-2 rounded-md hover:bg-gray-700">
              Appliquer
            </button>
          </div>
          <label htmlFor="discountCode" className="font-semibold">
            Code de réduction
          </label>
        </div>

        <div className="bg-[#0e0e0e] p-8 text-white flex gap-4 items-start">
          <ShieldCheck className="mt-1" />
          <div>
            <p className="font-semibold">Paiement sécurisé :</p>
            <p>Paiement en plusieurs fois</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <CreditCard /> Visa
              <CreditCard /> Mastercard
              <CreditCard /> Bancontact
              <CreditCard /> Apple Pay
              <CreditCard /> Younited
            </div>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-8 text-white flex gap-4 items-start">
          <Truck className="mt-1" />
          <div>
            <p className="font-semibold">Livraison à domicile :</p>
            <p>
              Sur rendez-vous, à l'étage, dans la pièce de votre choix (FR, BE,
              LU, MCO)
            </p>
          </div>
        </div>

        <div className="bg-[#0e0e0e] p-8 text-white flex gap-4 items-start">
          <RotateCcw className="mt-1" />
          <div>
            <p className="font-semibold">Satisfait ou remboursé :</p>
            <p>14 jours pour changer d'avis sur vos achats</p>
          </div>
        </div>
      </div>
    </>
  );
}
