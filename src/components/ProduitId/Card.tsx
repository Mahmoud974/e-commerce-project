import { useState } from "react";
import { useCartStore, useLikeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AlertMessage from "../AlertNoLike";
import { useCurrency } from "@/components/Header/Navbar";
import { useCurrencyStore } from "@/store/currencyStore";

const ProductCard: React.FC<{ item: any; addItems: (item: any) => void }> = ({
  item,
  addItems,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { data: session } = useSession();
  const [showId, setShowId] = useState(false);
  const { currency } = useCurrency();
  const { convertPrice } = useCurrencyStore();

  const images = item.images.slice(0, 3);

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

  const onLikeClick = async () => {
    if (!session?.user?.id) return;

    const userId = Number(session.user.id);
    const canapeId = item.id;
    const liked = isLiked(canapeId);

    try {
      if (liked) {
        const res = await fetch(`/api/favorites?userId=${userId}&canapeId=${canapeId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Erreur suppression favoris :", data);
          return;
        }
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, canapeId }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Erreur ajout favoris :", data);
          return;
        }
      }

      handleLike(item, session, addItems);
    } catch (error) {
      console.error("Erreur lors du traitement du like :", error);
    }
  };

  const handleCart = () => toggleCart(item);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const isInCart = isItemInCart(item.id);

  const handleProductClick = () => {
    setShowId(true);
    setTimeout(() => setShowId(false), 3000);
  };

  const convertedPrice = convertPrice(item.price, currency || "EUR");
  const currencySymbol = currency === "EUR" ? "€" : "£";

  return (
    <div className="mx-auto w-full max-w-xs bg-white rounded-lg border border-gray-200 shadow-md">
      <Link
        href={`/produit/${item.id}`}
        className="block overflow-hidden relative w-full bg-black rounded-t-lg"
        onClick={handleProductClick}
      >
        <div className="relative w-full aspect-[3/3] group">
          <Image
            src={images[currentImage]}
            alt={`Photo du produit ${item.nom} - vue ${currentImage + 1}`}
            className="object-contain object-center rounded-t-lg"
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
                className="absolute left-2 top-1/2 p-1 rounded-full opacity-0 transition-opacity duration-200 -translate-y-1/2 bg-white/70 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 p-1 rounded-full opacity-0 transition-opacity duration-200 -translate-y-1/2 bg-white/70 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-1">
        <div className="flex flex-col justify-between text-black">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold truncate">
              {item?.title || "Produit"}
            </p>
            {["Aube Dorée", "Atelier Urbain", "Matelassé Confort", "Graphique Moderne", "Lueur Bohème"].includes(item.title) && (
              <span className="px-2 py-1 text-xs font-semibold text-white bg-amber-500 rounded">
                NEW
              </span>
            )}
          </div>
          <small>{item.brand}</small>
          <p>{item.description.slice(0, 70)}...</p>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center px-4 py-3 border-t border-gray-200">
        <div>
          <p className="text-2xl font-bold text-black">
            {convertedPrice}
            {currencySymbol}
          </p>
          <Link href="/eco-mobilier">
            <small className="mt-6 text-black underline">
              Dont{" "}
              {currency === "EUR"
                ? item.ecoMobilier
                : convertPrice(item.ecoMobilier, currency)}{" "}
              {currencySymbol} d&#39;éco-part
            </small>
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
              isInCart ? "bg-amber-500" : "bg-gray-300 hover:bg-gray-400"
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
  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
    isLiked(item.id)
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-gray-300 hover:bg-gray-400 text-gray-700"
  }`}
  onClick={onLikeClick}
  aria-label={isLiked(item.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
  aria-pressed={isLiked(item.id)}
>
  <Heart className="w-6 h-6" aria-hidden="true" />
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
