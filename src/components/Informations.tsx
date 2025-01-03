import Image from "next/image";
import React from "react";

export default function Informations() {
  return (
    <div className="text-white  mx-auto  w-full h-auto py-12">
      <div className="container mx-auto">
        <ul className="space-y-6 flex items-baseline justify-between mx-12 ">
          <li className="flex flex-col items-center text-center">
            <Image
              src="/img/service.svg"
              alt="image service"
              className="rounded-t-lg w-16 mx-auto mb-3 object-contain"
              width={100}
              height={100}
              priority
            />
            <p>
              <strong>Conseils et vente :</strong>
              <br />
              du lundi au vendredi
              <br />
              9h à 12h et 13h30 à 17h30
            </p>
          </li>
          <li className="flex flex-col items-center text-center">
            <Image
              src="/img/payment.svg"
              alt="image service"
              className="rounded-t-lg w-16 mx-auto mb-3 object-contain"
              width={100}
              height={100}
              priority
            />
            <p>
              <strong>Paiement sécurisé</strong>
              <br />
              Règlement échelonné en plusieurs
              <br />
              fois selon votre convenance
            </p>
          </li>
          <li className="flex flex-col items-center text-center">
            <Image
              src="/img/delivery.svg"
              alt="image service"
              className="rounded-t-lg w-16 mx-auto mb-3 object-contain"
              width={100}
              height={100}
              priority
            />
            <p>
              <strong>Livraison à domicile :</strong>
              <br />
              Sur rendez-vous, à l'étage, <br /> {`dans la pièce, au choix`}
            </p>
          </li>
          <li className="flex flex-col items-center text-center">
            <Image
              src="/img/badge.svg"
              alt="image service"
              className="rounded-t-lg w-16 mx-auto mb-3 object-contain"
              width={100}
              height={100}
              priority
            />
            <p>
              <strong>Satisfait ou remboursé :</strong>
              <br />
              14 jours pour changer
              <br /> {`d'avis sur vos achats`}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
