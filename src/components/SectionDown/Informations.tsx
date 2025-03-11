import Image from "next/image";
import React from "react";

const infos = [
  {
    img: "/img/service.svg",
    title: "Conseils et vente",
    desc: "Lun-Ven : 9h-12h / 13h30-17h30",
  },
  {
    img: "/img/payment.svg",
    title: "Paiement sécurisé",
    desc: "Paiement échelonné disponible",
  },
  {
    img: "/img/delivery.svg",
    title: "Livraison à domicile",
    desc: "Sur rendez-vous, à l'étage",
  },
  {
    img: "/img/badge.svg",
    title: "Satisfait ou remboursé",
    desc: "14 jours pour changer d'avis",
  },
];

export default function Informations() {
  return (
    <div className="text-white mx-auto w-full h-auto pb-12">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {infos.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center text-center space-y-2"
            >
              <Image src={item.img} alt={item.title} width={60} height={60} />
              <p>
                <strong>{item.title} :</strong> <br /> {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
