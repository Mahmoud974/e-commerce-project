import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLikeData } from "@/store/store";
import { CircleUser, Heart, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SheetDisplay() {
  const { selectedItems, removeItems, clearItems } = useLikeData();
  const [activeTab, setActiveTab] = useState("favorites");

  const renderContent = () => {
    switch (activeTab) {
      case "favorites":
        return selectedItems.length > 0 ? (
          <ul className="space-y-4 mt-3">
            {selectedItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
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
                    <p className="text-lg font-bold">{item.nom}</p>
                    <p className="text-gray-400">{item.prix}€</p>
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
            <p className="text-white">Aucun Like 💔</p>
          </div>
        );

      case "cart":
        return (
          <p className="text-white">
            Panier (fonctionnalité en cours de développement)
          </p>
        );

      case "profile":
        return (
          <p className="text-white">
            Profil utilisateur (fonctionnalité en cours de développement)
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Heart className="text-white" />
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
                  <span>Favoris</span>
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
            {activeTab === "favorites" && selectedItems.length > 0 && (
              <div className="mt-10 flex justify-end">
                <Button onClick={() => clearItems()}>Reset</Button>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
