import Image from "next/image";
import { Trash } from "lucide-react";

export function Dashboard({
  selectedItems,
  removeItems,
  session,
  signIn,
  signOut,
}) {
  return (
    <div className="p-2   text-white  space-y-6">
      {/* Section Mes commandes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center">
          📦 Mes commandes
        </h2>
        {selectedItems.length === 0 ? (
          <div className="p-4 bg-yellow-700 text-yellow-200 ">
            Il n'y a rien ici pour le moment, mais une fois que vous aurez passé
            des commandes, c'est là que vous pourrez consulter l'historique de
            vos commandes.
          </div>
        ) : (
          <ul className="space-y-4 mt-3">
            {selectedItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border border-gray-700 p-4  bg-gray-800"
              >
                <div className="flex items-center">
                  <Image
                    src={item?.image[0]}
                    alt="product image"
                    className="object-contain p-1 w-16 h-16"
                    width={64}
                    height={64}
                    priority
                  />
                  <div className="ml-3">
                    <div className="text-lg font-bold">{item.nom}</div>
                    <div className="text-gray-400">{item.prix}€</div>
                  </div>
                </div>
                <button
                  onClick={() => removeItems(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section Mes favoris */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center">❤️ Mes favoris</h2>
        <div className="p-4 bg-yellow-700 text-yellow-200 ">
          Oh, mais vous n'avez pas encore eu de coup de cœur ?
        </div>
      </div>

      {/* Section Besoin d'aide */}
      <div className="space-y-2 border-t border-gray-700 pt-4">
        <h2 className="text-xl font-bold flex items-center">
          ❓ Besoin d'aide ?
        </h2>

        <a href="/contact" className="text-blue-400 underline">
          Nous contacter
        </a>
      </div>
    </div>
  );
}
