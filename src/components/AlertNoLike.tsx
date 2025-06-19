import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, AlertCircle } from "lucide-react";

type AlertType = "like" | "cart" | "error";

interface AlertMessageProps {
  type: AlertType;
  message: string;
}

const iconMap = {
  like: <Heart className="w-6 h-6 text-green-500" />,
  cart: <ShoppingCart className="w-6 h-6 text-green-500" />,
  error: <AlertCircle className="w-6 h-6 text-red-500" />,
};

const borderColorMap = {
  like: "border-green-500 text-green-100",
  cart: "border-green-500 text-green-100",
  error: "border-red-500 text-red-100",
};

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-16 left-1/2 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 -translate-x-1/2 scale-105"
          : "opacity-0 -translate-x-1/2 scale-95 -translate-y-4"
      }`}
      style={{ transformOrigin: "top center" }}
    >
      <div
        className={`px-5 py-3 bg-black/90 rounded-md shadow-lg flex items-center gap-3 min-w-[300px] justify-center border ${borderColorMap[type]}`}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
          {iconMap[type]}
        </div>
        <span className="text-base">{message}</span>
      </div>
    </div>
  );
};

export default AlertMessage;
