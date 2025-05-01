import React from "react";
import { ShieldCheck, Phone, CreditCard, Truck, RotateCcw } from "lucide-react";

export default function TotalOptions({ total, totalQuantity }) {
  return (
    <>
      <div className="bg-[#0e0e0e] p-8 text-white">
        <p className="font-bold text-2xl mb-4">Votre commande</p>

        <ul>
          <li className="flex justify-between mt-4">
            <p>
              Produit{totalQuantity > 1 ? "s" : ""} ({totalQuantity}){" "}
            </p>
            <p>{total?.toFixed(2)}€</p>
          </li>
          <li className="flex justify-between mt-4">
            <p>Livraison</p>
            <p>-</p>
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
              <p>Prix total</p>
              <small>(Taxes 396,53€)</small>
            </div>
            <p className="font-bold">{total?.toFixed(2)}€</p>
          </li>
        </ul>
      </div>

      {/* Infos supplémentaires */}
      <div className="mt-8 text-sm space-y-6">
        <div className="bg-[#0e0e0e] p-8 text-white flex gap-4 items-start">
          <Phone className="mt-1" />
          <div>
            <p className="font-semibold">Conseils et vente :</p>
            <p>03 27 73 94 18</p>
            <p>Du lundi au vendredi, 9h à 12h et 13h30 à 17h30</p>
          </div>
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
