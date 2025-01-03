import React from "react";

export default function TotalOptions() {
  return (
    <div className="bg-[#0e0e0e] h-full p-8">
      <p className="font-bold text-2xl">Votre commande</p>
      <div className=""></div>
      <ul>
        <li className="flex justify-between mt-4">
          <p>Produit(1)</p>
          <p>2999,00€</p>
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
      <div className="bg-white h-[0.01rem] w-full my-3"></div>
      <ul>
        <li className="flex justify-between mt-4">
          <div>
            <p>Prix total</p>
            <small className="">(Taxes 396, 53€)</small>
          </div>
          <p className="font-bold">29999.00€</p>
        </li>
      </ul>
    </div>
  );
}
