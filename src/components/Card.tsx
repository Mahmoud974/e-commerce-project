"use client"; // Assure-toi que tu es dans un composant client
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

import { useState } from "react";

const ProductCard: React.FC<{ item: any; addItems: (item: any) => void }> = ({
  item,
  addItems,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    addItems(item);
  };

  const handleCart = () => {
    setIsInCart(!isInCart);
  };

  return (
    <div className="w-full max-w-xs mx-auto rounded-lg shadow-md bg-white border border-gray-200">
      <Link
        href={`/item/${item.id}`}
        className="relative pt-5 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-80"
      >
        <div className="relative h-44 w-full">
          <Image
            src={item?.image[0]}
            alt={item.nom}
            className="rounded-t-lg object-contain"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-1">
          <span className=" bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded">
            NOUVEAU
          </span>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-normal text-gray-800 truncate">
              {item.nom}
            </p>
            <p className=" text-black   text-3xl  ">{item.prix}€</p>
          </div>
          <small className="text-black  ">Tissu • Chêne </small>
        </div>
      </Link>

      {/* Action Buttons */}
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
    </div>
  );
};

export default ProductCard;
