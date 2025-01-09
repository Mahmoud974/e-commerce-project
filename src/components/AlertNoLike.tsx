import React, { useEffect, useState } from "react";

export default function AlertNoLike() {
  const [isVisible, setIsVisible] = useState(true); // Contrôle la visibilité de l'alerte

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div
        className={`alert-enter fixed top-0 left-0 right-0 mx-auto p-4 bg-red-500 text-white shadow-md z-50 transition-all duration-500 ${
          !isVisible ? "opacity-0 translate-y-[-100%]" : ""
        }`}
        style={{ width: "100%" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <strong>Heads up!</strong>
          </div>
          <div>You need to be logged in to like this product.</div>
        </div>
      </div>
    )
  );
}
