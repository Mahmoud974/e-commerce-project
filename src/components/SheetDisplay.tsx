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
import { CircleUser, Heart, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { FavoritesList } from "./ComponentSheet/FavoritesList";
import { CartList } from "./ComponentSheet/CartList";
import { ProfileSection } from "./ComponentSheet/ProfileSection";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SheetDisplay() {
  const [activeTab, setActiveTab] = useState("favorites");
  const { data: session } = useSession();
  const { selectedItems, removeItems } = useLikeData();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFacebookLogin = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000); // Simulating login process
  };

  const renderContent = () => {
    switch (activeTab) {
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
          />
        );
      case "profile":
        return (
          <ProfileSection
            session={session}
            signIn={signIn}
            signOut={signOut}
            handleFacebookLogin={handleFacebookLogin}
            isProcessing={isProcessing}
          />
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
      <SheetContent
        className="bg-black text-white p-4"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <ul className="flex items-center">
            <li
              className={`cursor-pointer ${
                activeTab === "favorites" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart />
            </li>
            <li
              className={`ml-4 cursor-pointer ${
                activeTab === "cart" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("cart")}
            >
              <ShoppingCart />
            </li>
            <li
              className={`ml-4 cursor-pointer ${
                activeTab === "profile" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <CircleUser />
            </li>
          </ul>

          {renderContent()}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
