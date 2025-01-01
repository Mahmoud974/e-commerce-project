import React from "react";

export default function Informations() {
  return (
    <div className="text-white  mx-auto  w-full h-auto py-12">
      <ul className="space-y-6 flex justify-center  ">
        <li className="flex items-center text-center">
          <span className="mr-4">
            <i className="ico2"></i>{" "}
            {/* Remplacez `ico2` par une icône réelle */}
          </span>
          <p>
            <strong>Conseils et vente :</strong>
            <br />
            03 27 73 94 18
            <br />
            du lundi au vendredi
            <br />
            9h à 12h et 13h30 à 17h30
          </p>
        </li>
        <li className="flex items-center text-center">
          <span className="mr-4">
            <i className="ico3"></i>{" "}
            {/* Remplacez `ico3` par une icône réelle */}
          </span>
          <p>
            <strong>Paiement sécurisé</strong>
            <br />
            Paiement en plusieurs fois
          </p>
        </li>
        <li className="flex items-center text-center">
          <span className="mr-4">
            <i className="ico4"></i>{" "}
            {/* Remplacez `ico4` par une icône réelle */}
          </span>
          <p>
            <strong>Livraison à domicile :</strong>
            <br />
            {`Sur rendez-vous, à l'étage, dans la pièce, au choix`}
            <br />
            (FR, BE, LU, MCO)
          </p>
        </li>
        <li className="flex items-center text-center">
          <span className="mr-4">
            <i className="ico5"></i>{" "}
            {/* Remplacez `ico5` par une icône réelle */}
          </span>
          <p>
            <strong>Satisfait ou remboursé :</strong>
            <br />
            {`  14 jours pour changer d'avis sur vos achats`}
          </p>
        </li>
      </ul>
    </div>
  );
}
