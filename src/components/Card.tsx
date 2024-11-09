"use client"; // Assure-toi que tu es dans un composant client
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/store";
import { useState } from "react";

const ProductCard: React.FC<{ item: any; addItems: (item: any) => void }> = ({
  item,
  addItems,
}) => {
  const { addItemCart } = useCartStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    addItems(item);
  };

  const handleCart = () => {
    setIsInCart(!isInCart);
    addItemCart(item);
  };

  return (
    <div className="  border-gray-100 bg-white shadow-md h-80 md:mx-0 mx-12 md:round">
      <Link
        href={`/item/${item.id}`}
        className="relative pt-12 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-80"
      >
        <span className="absolute top-2 left-2 z-10 m-2 rounded-full bg-amber-500 px-2 text-center text-sm font-medium text-white">
          NOUVEAU
        </span>
        <div className="relative flex h-60 overflow-hidden rounded-xl">
          <Image
            src="/img/ok.webp"
            alt="product image"
            className="object-contain px-3"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className=" px-5   pb-5 flex flex-col justify-between h-full">
          <h5 className="text-lg tracking-tight text-slate-900 font-bold">
            {item.nom}
          </h5>

          <div className="mb-5 flex items-center justify-between">
            <p>
              <span className="text-2xl font-normal text-red-600">
                {item.prix}€
              </span>
            </p>
          </div>
        </div>
        <div className="flex mb-6 mr-6 justify-end space-x-3">
          <div
            className="flex items-center justify-center rounded-md bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleCart}
          >
            <ShoppingCart
              className={`h-6 w-6 ${
                isInCart ? "text-green-500" : "text-white"
              }`}
            />
          </div>
          <div
            className="flex items-center justify-center rounded-md bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleLike}
          >
            <Heart
              className={`h-6 w-6 ${isLiked ? "text-red-500" : "text-white"}`}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
