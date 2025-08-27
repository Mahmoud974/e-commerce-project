import { create } from "zustand";
import axios from "axios";
import type { Item } from "../app/types/canape";

type CartAlertType = "cart" | null;

interface CartState {
  items: Item[];
  alertType: CartAlertType;
  alertMessage: string;
  alertId: number;
  showAlert: boolean;
  fetchItems: () => Promise<void>;
  addItem: (item: Item) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  isInCart: (id: number) => boolean;
  handleCart: (item: Item, quantity?: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  alertType: null,
  alertMessage: "",
  alertId: 0,
  showAlert: false,

  fetchItems: async () => {
    const res = await axios.get("/api/panier");
    set({ items: res.data });
  },

  addItem: async (item) => {
    await axios.post("/api/panier", item);
    await get().fetchItems();
  },

  removeItem: async (itemId) => {
    await axios.delete("/api/panier", { data: { id: itemId } });
    await get().fetchItems();
  },

  clearCart: async () => {
    const currentItems = get().items;
    for (const item of currentItems) {
      await axios.delete("/api/panier", { data: { id: item.id } });
    }
    await get().fetchItems();
  },

  updateQuantity: async (itemId, quantity) => {
    const item = get().items.find((i) => i.id === itemId);
    if (!item) return;
    await axios.post("/api/panier", { ...item, quantity });
    await get().fetchItems();
  },

  isInCart: (id) => {
    return get().items.some((item) => item.id === id);
  },

  handleCart: async (item, quantity = 1) => {
    const isInCart = get().isInCart(item.id);
    if (isInCart) {
      await get().removeItem(item.id);
    } else {
      await get().addItem({ ...item, quantity });
    }
    set((state) => ({
      alertType: "cart",
      alertMessage: isInCart
        ? `${item.title} retiré du panier.`
        : `${item.title} ajouté au panier.`,
      alertId: state.alertId + 1,
      showAlert: true,
    }));
  },
}));
