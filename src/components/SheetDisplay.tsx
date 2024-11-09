import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore, useLikeData } from "@/store/store";
import { CircleUser, Heart, Menu, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SheetDisplay() {
  const { selectedItems, removeItems, clearItems } = useLikeData();
  const [activeTab, setActiveTab] = useState("favorites");
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, removeItem, clearCart, updateQuantity } = useCartStore();

  const handleGoogleLogin = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleFacebookLogin = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => {
        const prix = item.prix || 0;
        const quantity = 1; // Remarque : Il est possible d'ajouter une logique pour les quantités réelles
        return total + prix * quantity;
      }, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) return;
    updateQuantity(itemId, newQuantity);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "favorites":
        return selectedItems.length > 0 ? (
          <ul className="space-y-4 mt-3">
            {selectedItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
              >
                <div className="flex items-center">
                  <div className="border rounded-xl overflow-hidden">
                    <Image
                      src="/img/ok.webp"
                      alt="product image"
                      className="object-contain p-1 w-16 h-16"
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-lg font-bold">{item.nom}</div>
                    <div className="text-gray-400">{item.prix}€</div>
                  </div>
                </div>
                <button
                  onClick={() => removeItems(item.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Supprimer"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center">
            <div className="text-white">Aucun Like 💔</div>
          </div>
        );

      case "cart":
        return items.length > 0 ? (
          <ul className="space-y-4 mt-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
              >
                <div className="flex items-center">
                  <div className="border rounded-xl overflow-hidden">
                    <Image
                      src="/img/ok.webp"
                      alt="product image"
                      className="object-contain p-1 w-16 h-16"
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-lg font-bold">{item.nom}</div>
                    <div className="text-gray-400">{item.prix}€</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={1} // Remarque : La gestion de la quantité peut être ajustée ici
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 text-center border rounded text-white bg-black"
                    min="1"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Supprimer"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center">
            <div className="text-white">Votre panier est vide 🛒</div>
          </div>
        );

      case "profile":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div>
              <div className="text-white">
                Profil utilisateur (fonctionnalité en cours de développement)
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white py-2 px-4 rounded-full w-64"
                disabled={isProcessing}
              >
                {isProcessing ? "Chargement..." : "Se connecter avec Google"}
              </button>

              <button
                onClick={handleFacebookLogin}
                className="bg-blue-600 text-white py-2 px-4 rounded-full w-64"
                disabled={isProcessing}
              >
                {isProcessing ? "Chargement..." : "Se connecter avec Facebook"}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="bg-black text-white p-4">
        <SheetHeader>
          <SheetTitle className="text-white text-3xl">
            <div>
              <ul className="flex items-center">
                <li
                  className={`flex items-center cursor-pointer ${
                    activeTab === "favorites" ? "text-white" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  <Heart className="mr-2" />
                </li>
                <li
                  className={`flex items-center cursor-pointer ml-4 ${
                    activeTab === "cart" ? "text-white" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("cart")}
                >
                  <ShoppingCart className="mr-2" />
                </li>
                <li
                  className={`flex items-center cursor-pointer ml-4 ${
                    activeTab === "profile" ? "text-white" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <CircleUser className="mr-2" />
                </li>
              </ul>
            </div>
          </SheetTitle>
          <SheetDescription className="text-white mt-2">
            {renderContent()}
            {activeTab === "cart" && items.length > 0 && (
              <div className="mt-5">
                <div className="font-semibold">Total:</div>
                <div className="text-white text-lg">{calculateTotal()}€</div>
                <div className="mt-5 flex justify-between">
                  <Button onClick={() => clearCart()}>Vider le panier</Button>
                  <Button
                    onClick={() => console.log("Passer à l'étape suivante")}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
