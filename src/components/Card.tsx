"use client";
import { useState } from "react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export type ProductItem = {
  id: string | number;
  title: string;
  brand?: string;
  description?: string;
  price: number;
  images: string[];
  ecoMobilier?: number;
  isNew?: boolean;
};

interface CardProps {
  item: ProductItem;
  onAddToCart?: (item: ProductItem) => void;
  onAddToFavorites?: (item: ProductItem) => void;
  isInCart?: boolean;
  isInFavorites?: boolean;
}

const Card: React.FC<CardProps> = ({
  item,
  onAddToCart,
  onAddToFavorites,
  isInCart = false,
  isInFavorites = false,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = item?.images?.slice?.(0, 3) || [];

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleFavoritesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToFavorites) {
      onAddToFavorites(item);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length > 0) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!item || !item.id || !item.title || !item.price) {
    return null;
  }

  const isNewProduct =
    item.isNew ||
    [
      "Aube Dorée",
      "Atelier Urbain",
      "Matelassé Confort",
      "Graphique Moderne",
      "Lueur Bohème",
    ].includes(item.title);

  return (
    <div className="w-full max-w-xs mx-auto rounded-lg shadow-md bg-white border border-gray-200">
      <Link
        href={`/produit/${item.id}`}
        className="relative block w-full overflow-hidden rounded-t-lg bg-black"
      >
        <div className="relative w-full aspect-[3/3] group">
          <Image
            src={images.length > 0 ? images[currentImage] : "/placeholder.jpg"}
            alt={`Photo du produit ${item.title} - vue ${currentImage + 1}`}
            className="rounded-t-lg object-contain object-center"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-1">
        <div className="flex flex-col text-black justify-between">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold truncate">{item.title}</p>
            {isNewProduct && (
              <span className="bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded">
                NEW
              </span>
            )}
          </div>
          {item.brand && <small>{item.brand}</small>}
          {item.description && <p>{item.description.slice(0, 70)}...</p>}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-gray-200">
        <div>
          <p className="text-black text-2xl font-bold">{item.price}€</p>
          <Link href="/eco-mobilier">
            <small className="text-black underline mt-6">
              Dont {item.ecoMobilier || 1} € d{`'`}éco-part
            </small>
          </Link>
        </div>

        <div className="flex gap-3">
          {onAddToCart && (
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full text-amber-400 ${
                isInCart ? "bg-amber-500" : "bg-gray-300"
              }`}
              onClick={handleCartClick}
              aria-label={isInCart ? "Retirer du panier" : "Ajouter au panier"}
              aria-pressed={isInCart}
            >
              <ShoppingCart
                className={`w-6 h-6 ${
                  isInCart ? "text-white" : "text-gray-800"
                }`}
                aria-hidden="true"
              />
            </button>
          )}
          {onAddToFavorites && (
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                isInFavorites ? "bg-red-600 text-red-700" : "bg-gray-300"
              }`}
              onClick={handleFavoritesClick}
              aria-label={
                isInFavorites ? "Retirer des favoris" : "Ajouter aux favoris"
              }
              aria-pressed={isInFavorites}
            >
              <Heart
                className={`w-6 h-6 ${
                  isInFavorites ? "text-white" : "text-gray-800"
                }`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
