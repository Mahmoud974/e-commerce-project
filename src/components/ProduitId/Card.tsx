import { useState } from "react";
import { useCartStore, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AlertMessage from "../AlertNoLike";

const ProductCard: React.FC<{ item: any; addItems: (item: any) => void }> = ({
  item,
  addItems,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { data: session } = useSession();

  const images = item.images.slice(0, 3);

  const {
    isLiked,
    handleLike,
    alertType: likeAlertType,
    alertMessage: likeAlertMessage,
    alertId: likeAlertId,
    showAlert: likeShowAlert,
  } = useLikeStore();

  // Cart
  const {
    handleCart: toggleCart,
    isInCart: isItemInCart,
    alertType: cartAlertType,
    alertMessage: cartAlertMessage,
    alertId: cartAlertId,
    showAlert: cartShowAlert,
  } = useCartStore();

  const onLikeClick = () => {
    handleLike(item, session, addItems);
    console.log(item);
  };

  const handleCart = () => {
    toggleCart(item);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const isInCart = isItemInCart(item.id);

  return (
    <div className="w-full max-w-xs mx-auto rounded-lg shadow-md bg-white border border-gray-200">
      <Link
        href={`/produit/${item.id}`}
        className="relative block w-full overflow-hidden rounded-t-lg bg-black"
      >
        <div className="relative w-full aspect-[3/3] group">
          <Image
            src={images[currentImage]}
            alt={`Photo du produit ${item.nom} - vue ${currentImage + 1}`}
            className="rounded-t-lg object-contain object-center"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevImage();
                }}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
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
            <p className="text-2xl font-semibold truncate">
              {item?.title || "Produit"}
            </p>
            {(item.title === "Aube Dorée" ||
              item.title === "Atelier Urbain" ||
              item.title === "Matelassé Confort" ||
              item.title === "Graphique Moderne" ||
              item.title === "Lueur Bohème") && (
              <span className="bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded">
                NEW
              </span>
            )}
          </div>
          <small>{item.brand}</small>
          <p>{item.description.slice(0, 70)}...</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-gray-200">
        <div>
          <p className="text-black text-2xl font-bold">{item.price}€</p>
          <Link href="/eco-mobilier">
            <small className="text-black underline mt-6">
              Dont {item.ecoMobilier} € d’éco-part
            </small>
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full text-amber-400 ${
              isInCart ? "bg-amber-500" : "bg-gray-300"
            }`}
            onClick={handleCart}
            aria-label={isInCart ? "Retirer du panier" : "Ajouter au panier"}
            aria-pressed={isInCart}
          >
            <ShoppingCart
              className={`w-6 h-6 ${isInCart ? "text-white" : "text-gray-800"}`}
              aria-hidden="true"
            />
          </button>
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isLiked(item.id) ? "bg-red-600 text-red-700" : "bg-gray-300"
            }`}
            onClick={onLikeClick}
            aria-label={
              isLiked(item.id) ? "Retirer des favoris" : "Ajouter aux favoris"
            }
            aria-pressed={isLiked(item.id)}
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked(item.id) ? "text-white" : "text-gray-800"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {likeShowAlert && likeAlertType && (
        <AlertMessage
          key={`like-${likeAlertId}`}
          type={likeAlertType}
          message={likeAlertMessage}
        />
      )}
      {cartShowAlert && cartAlertType && (
        <AlertMessage
          key={`cart-${cartAlertId}`}
          type={cartAlertType}
          message={cartAlertMessage}
        />
      )}
    </div>
  );
};

export default ProductCard;
