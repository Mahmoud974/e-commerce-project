import React from "react";
import { SeveralPayment } from "./SeveralPayment";
import Image from "next/image";

export default function PaymentSeveral() {
  return (
    <div className="border rounded-md flex justify-between items-center w-80  h-16 p-3">
      <Image
        src="/img/alma-couleur.png"
        width={100}
        height={100}
        alt="logo Alma"
        className="w-24"
      />
      <div>
        <ul className="flex gap-3">
          <li className="text-md font-bold">3x</li>
          <li className="text-md font-bold">4x</li>
          <li className="text-md font-bold">10x</li>
          <li className="text-md font-bold">12x</li>
        </ul>
        <SeveralPayment />
      </div>
    </div>
  );
}
