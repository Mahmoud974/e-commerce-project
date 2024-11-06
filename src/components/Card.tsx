"use client"; // Assure-toi que tu es dans un composant client
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/store";

const ProductCard: React.FC<{ item: any; addItems: (item: any) => void }> = ({
  item,
  addItems,
}) => {
  const { addItemCart } = useCartStore();

  return (
    <div className="relative pt-12 flex w-full   flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-80   ">
      <span className="absolute top-2 left-2   z-10 m-2 rounded-full bg-amber-500 px-2 text-center text-sm font-medium text-white">
        NOUVEAU
      </span>
      <Link href="#" className="relative flex h-60 overflow-hidden rounded-xl">
        <Image
          src="/img/ok.webp"
          alt="product image"
          className="object-contain px-3"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </Link>
      <div className="mt-4 px-5 pb-5 flex flex-col justify-between h-full">
        <Link href="#">
          <h5 className="text-lg tracking-tight text-slate-900 font-bold">
            {item.nom}
          </h5>
        </Link>
        <div className="mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-normal  text-red-600">
              {item.prix}€
            </span>
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Link
            href="#"
            className="flex items-center justify-center rounded-md bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <ShoppingCart
              className="h-6 w-6"
              onClick={() => addItemCart(item)}
            />
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center rounded-md bg-slate-900 p-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <Heart className="h-6 w-6" onClick={() => addItems(item)} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
