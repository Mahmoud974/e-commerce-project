import { useEffect, useState } from "react";

export function useLocalCart() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("my-cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: any) => {
    const exists = items.find((i) => i.id === item.id);
    if (!exists) {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return { items, addItem, removeItem, updateQuantity };
}
