import { useState } from "react";
import { useCartStore, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AlertMessage from "../AlertNoLike";

const ProductCard: React.FC<{
  item: any;
  addItems: (item: any) => void;
}> = ({ item, addItems }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { data: session } = useSession();

  // Likes
  const {
    isLiked,
    handleLike,
    alertType: likeAlertType,
    alertMessage: likeAlertMessage,
    alertId: likeAlertId,
    showAlert: likeShowAlert,
  } = useLikeStore();

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
    setCurrentImage((prev) => (prev + 1) % item.image.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + item.image.length) % item.image.length
    );
  };

  const isInCart = isItemInCart(item.id);

  return (
    <div className="w-full max-w-xs mx-auto rounded-lg shadow-md bg-white border border-gray-200">
      <Link
        href={`/produit/${item.id}`}
        className="relative pt-5 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-black shadow-md"
      >
        <div className="relative h-44 w-full group">
          <Image
            src={item?.image[currentImage]}
            alt={`Photo du produit ${item.nom} - vue ${currentImage + 1}`}
            className="rounded-t-lg object-contain p-4"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {item.image.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  prevImage();
                }}
                aria-label="Image précédente"
              >
                <ChevronLeft
                  className="w-5 h-5 text-black"
                  aria-hidden="true"
                />
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
                aria-label="Image suivante"
              >
                <ChevronRight
                  className="w-5 h-5 text-black"
                  aria-hidden="true"
                />
              </button>
            </>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-1">
        <div className="flex flex-col text-black justify-between">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold truncate">{item.title}</p>
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
          <small>{item?.brand}</small>
          <p>{item?.description.slice(0, 70)}...</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-gray-200">
        <div>
          {" "}
          <p className="text-black text-2xl  font-bold">{item.price}€</p>
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

      {/* Alertes Like + Cart */}
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
