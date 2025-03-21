import { useState } from "react";
import { useCartStore } from "@/store/store"; // Import correct du panier
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AlertNoLike from "../AlertNoLike";

const ProductCard: React.FC<{
  item: any;
  addItems: (item: any) => void;
}> = ({ item, addItems }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { addItem } = useCartStore();
  const { data: session } = useSession(); // Récupère la session de l'utilisateur
  const [showAlert, setShowAlert] = useState(false); // État pour contrôler l'affichage de l'alerte

  const handleLike = () => {
    // Réinitialiser l'alerte si elle est déjà visible et l'utilisateur reclique sur le cœur
    if (showAlert) {
      setShowAlert(false); // Masquer l'alerte immédiatement si elle est visible
    }

    if (session?.user) {
      setIsLiked(!isLiked);
      addItems(item);
    } else {
      setShowAlert(true); // Afficher l'alerte si l'utilisateur n'est pas connecté
    }
  };

  const handleCart = () => {
    setIsInCart(!isInCart);
    addItem(item); // Ajoute l'article au panier
  };

  return (
    <div className="w-full max-w-xs mx-auto rounded-lg shadow-md bg-black border border-gray-200">
      <Link
        href={`/item/${item.id}`}
        className="relative pt-5 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-black shadow-md h-80"
      >
        <div className="relative h-44 w-full">
          <Image
            src={item?.image[0]}
            alt={item.nom}
            className="rounded-t-lg object-contain"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="p-4 space-y-1">
          <span className=" bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded">
            NOUVEAU
          </span>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-normal text-gray-800 truncate">
              {item.nom}
            </p>
            <p className=" text-white text-3xl">{item.prix}€</p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isInCart ? "bg-green-500" : "bg-gray-200"
          }`}
          onClick={handleCart}
        >
          <ShoppingCart
            className={`w-6 h-6 ${isInCart ? "text-white" : "text-gray-800"}`}
          />
        </button>
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isLiked ? "bg-red-500" : "bg-gray-200"
          }`}
          onClick={handleLike}
        >
          <Heart
            className={`w-6 h-6 ${isLiked ? "text-white" : "text-gray-800"}`}
          />
        </button>
      </div>

      {/* Affichage de l'alerte si showAlert est vrai */}
      {showAlert && <AlertNoLike />}
    </div>
  );
};

export default ProductCard;
