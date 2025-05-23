"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { useCartStore, useLikeData } from "@/store/store";
import {
  CircleUser,
  Heart,
  LayoutDashboard,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FavoritesList } from "./FavoritesList";
import { CartList } from "./CartList";
import { ProfileSection } from "./ProfileSection";
import { Dashboard } from "./Dashboard";

export default function SheetDisplay() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: session } = useSession();
  const { selectedItems, removeItems } = useLikeData();
  const { items, removeItem, updateQuantity, fetchItems } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const mySession = session?.user;

  const handleSignOut = () => {
    useCartStore.getState().clearCart();
    alert("Vous avez été déconnecté.");
    signOut();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection session={session} isProcessing={isProcessing} />;
      case "favorites":
        return (
          <FavoritesList
            selectedItems={selectedItems}
            removeItems={removeItems}
          />
        );
      case "cart":
        return (
          <CartList
            items={items}
            removeItem={removeItem}
            handleQuantityChange={updateQuantity}
            clearCart={useCartStore.getState().clearCart}
          />
        );
      case "dashboard":
        return (
          <Dashboard selectedItems={selectedItems} removeItems={removeItems} />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (activeTab === "cart") {
      fetchItems();
    }
  }, [activeTab]);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent
        className="bg-black text-white p-4"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
          <ul className="flex items-center">
            <li
              className={`group relative cursor-pointer ${
                activeTab === "profile" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <CircleUser />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                Profil
              </span>
            </li>

            <li
              className={`group relative cursor-pointer mx-3 ${
                activeTab === "favorites" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <div className="relative">
                <Heart />
                {selectedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </div>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                Favoris
              </span>
            </li>

            <li
              className={`group relative cursor-pointer ${
                activeTab === "cart" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("cart")}
            >
              <div className="relative">
                <ShoppingCart />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </div>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                Panier
              </span>
            </li>

            {mySession && (
              <li
                className={`group relative ml-4 cursor-pointer ${
                  activeTab === "dashboard" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                  Dashboard
                </span>
              </li>
            )}
          </ul>

          <div className="overflow-y-auto max-h-screen mt-4 pr-2 scrollbar-black">
            {renderContent()}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
