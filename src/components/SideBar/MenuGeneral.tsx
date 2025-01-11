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
import { useState } from "react";
import { FavoritesList } from "./FavoritesList";
import { CartList } from "./CartList";
import { ProfileSection } from "./ProfileSection";
import { Dashboard } from "./Dashboard";
import { Command } from "./Command";
import Address from "./Adress";

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
        return <Address />;
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

            {mySession && (
              <li
                className={`group relative ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
              >
                <DoorOpen className="text-red-600" onClick={handleSignOut} />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                  Se déconnecter
                </span>
              </li>
            )}

            <li
              className={`group relative cursor-pointer mx-3 ${
                activeTab === "favorites" ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart />
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
              <ShoppingCart />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                Panier
              </span>
            </li>

            {mySession && (
              <li
                className={`group relative ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("adress")}
              >
                <MapPinHouse />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                  Adresses
                </span>
              </li>
            )}

            {mySession && (
              <li
                className={`group relative ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("command")}
              >
                <CalendarArrowUp />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
                  Commandes
                </span>
              </li>
            )}

            {mySession && (
              <li
                className={`group relative ml-4 cursor-pointer ${
                  activeTab === "profile" ? "text-white" : "text-gray-500"
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

          {renderContent()}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
