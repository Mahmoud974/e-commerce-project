import Image from "next/image";
import React from "react";

const infos = [
  {
    img: `${`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/service.svg`}`,
    title: "Conseils et vente",
    desc: "Lun-Ven : 9h-12h / 13h30-17h30",
  },
  {
    img: `${`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/payment.svg`}`,
    title: "Paiement sécurisé",
    desc: "Paiement échelonné disponible",
  },
  {
    img: `${`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/delivery.svg`}`,
    title: "Livraison à domicile",
    desc: "Sur rendez-vous, à l&#39;étage",
  },
  {
    img: `${`${process.env.NEXT_PUBLIC_BANNER_IMAGE}/badge.svg`}`,
    title: "Satisfait ou remboursé",
    desc: "14 jours pour changer ddd&#39;a#39;a#39;avis",
  },
];

export default function Confirmation() {
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
