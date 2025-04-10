import { useState } from "react";
import { useCartStore, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AlertMessage from "../AlertNoLike";

const ProductCard: React.FC<{
  item: any;
  addItems: (item: any) => void;
}> = ({ item, addItems }) => {
  const [isInCart, setIsInCart] = useState(false);
  const { data: session } = useSession();
  const { addItem } = useCartStore();

  const { isLiked, handleLike, alertType, alertMessage, alertId, showAlert } =
    useLikeStore();

  const onLikeClick = () => {
    handleLike(item, session, addItems);
  };

  const handleCart = () => {
    const newInCart = !isInCart;
    setIsInCart(newInCart);
    addItem(item);
  };

  return (
    <div className="w-full max-w-xs mx-auto rounded-lg shadow-md bg-white border border-gray-200">
      <Link
        href={`/item/${item.id}`}
        className="relative pt-5 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-black shadow-md "
      >
        <div className="relative h-44 w-full">
          <Image
            src={item?.image[0]}
            alt={item.nom}
            className="rounded-t-lg object-contain p-4"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </Link>

      <div className="p-4 space-y-1">
        <div className="flex flex-col text-black justify-between">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold truncate">{item.nom}</p>
            {item.nom === "Carmo1" || item.nom === "Carlton" ? (
              <span className="bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded">
                NOUVEAU
              </span>
            ) : null}
          </div>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-gray-200">
        <p className="text-black text-2xl font-bold">{item.prix}€</p>
        <div className="flex gap-3">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full text-amber-400 ${
              isInCart ? "bg-amber-500" : "bg-gray-300"
            }`}
            onClick={handleCart}
          >
            <ShoppingCart
              className={`w-6 h-6 ${isInCart ? "text-white" : "text-gray-800"}`}
            />
          </button>
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isLiked(item.id) ? "bg-red-600 text-red-700" : "bg-gray-300"
            }`}
            onClick={onLikeClick}
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked(item.id) ? "text-white" : "text-gray-800"
              }`}
            />
          </button>
        </div>
      </div>

      {showAlert && alertType && (
        <AlertMessage key={alertId} type={alertType} message={alertMessage} />
      )}
    </div>
  );
};

export default ProductCard;
