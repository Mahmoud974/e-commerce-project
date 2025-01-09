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
  CalendarArrowUp,
  CircleUser,
  DoorClosed,
  DoorOpen,
  Heart,
  LayoutDashboard,
  MapPinHouse,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FavoritesList } from "./ComponentSheet/FavoritesList";
import { CartList } from "./ComponentSheet/CartList";
import { ProfileSection } from "./ComponentSheet/ProfileSection";
import { Dashboard } from "./ComponentSheet/Dashboard";
import { Command } from "./ComponentSheet/Command";
import Address from "./ComponentSheet/Adress";

export default function SheetDisplay() {
  const [activeTab, setActiveTab] = useState("favorites");
  const { data: session } = useSession();
  const { selectedItems, removeItems } = useLikeData();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  let mySession = useSession().data?.user;

  const handleFacebookLogin = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleSignOut = () => {
    alert("Vous avez été déconnecté.");
    signOut();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSection
            session={session}
            signIn={signIn}
            signOut={handleSignOut}
            handleFacebookLogin={handleFacebookLogin}
            isProcessing={isProcessing}
          />
        );
      case "favorites":
        return (
          <FavoritesList
            session={session}
            signIn={signIn}
            signOut={handleSignOut}
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
      case "dashboard":
        return (
          <Dashboard
            session={session}
            signIn={signIn}
            signOut={handleSignOut}
            selectedItems={selectedItems}
            removeItems={removeItems}
          />
        );
      case "command":
        return (
          <Command
            session={session}
            signIn={signIn}
            signOut={handleSignOut}
            selectedItems={selectedItems}
            removeItems={removeItems}
          />
        );
      case "adress":
        return (
          <Address
            signIn={signIn}
            signOut={handleSignOut}
            selectedItems={selectedItems}
            removeItems={removeItems}
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
          <ul className="flex items-center  ">
            <li
              className={` cursor-pointer ${
                activeTab === "profile" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <CircleUser />
            </li>
            {mySession && (
              <li
                className={`ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
              >
                <DoorOpen className="text-red-600" onClick={handleSignOut} />
              </li>
            )}
            <li
              className={`cursor-pointer mx-3 ${
                activeTab === "favorites" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart />
            </li>
            <li
              className={`  cursor-pointer ${
                activeTab === "cart" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("cart")}
            >
              <ShoppingCart />
            </li>

            {mySession && (
              <li
                className={`ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("adress")}
              >
                <MapPinHouse />
              </li>
            )}
            {mySession && (
              <li
                className={`ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("command")}
              >
                <CalendarArrowUp />
              </li>
            )}

            {mySession && (
              <li
                className={`ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard />
              </li>
            )}
          </ul>

          {renderContent()}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
