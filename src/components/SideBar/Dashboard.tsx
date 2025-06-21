import Image from "next/image";
import { Trash } from "lucide-react";

export function Dashboard() {
  return (
    <div className="p-2   text-white  space-y-6">
      {/* Section Mes commandes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center">
          📦 Mes commandes
        </h2>
        <div className="p-4 bg-yellow-700 text-yellow-200 ">
         {` Il n' y a rien ici pour le moment, mais une fois que vous aurez passé
          des commandes, c'est là que vous pourrez consulter l' historique de vos
          commandes.`}
        </div>
      </div>

      {/* Section Mes favoris */}

       
      <div className="space-y-2 border-t border-gray-700 pt-4">
        <h2 className="text-xl font-bold flex items-center">
          ❓ Un coup de main ?
        </h2>

        <a href="/contactez-nous" className="text-blue-400 underline">
          Nous contacter
        </a>
      </div>
    </div>
  );
}
