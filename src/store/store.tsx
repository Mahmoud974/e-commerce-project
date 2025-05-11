import { create } from "zustand";
import { LikeDataState, Item } from "../app/types/canape";
import axios from "axios";

interface LikeStore {
  likedItems: string[];
  isLiked: (id: string) => boolean;
  handleLike: (item: any, session: any, addItems: (item: any) => void) => void;
  alertType: "like" | "error" | null;
  alertMessage: string;
  alertId: number;
  showAlert: boolean;
}

type CartState = {
  items: Item[];
  alertType: "cart" | null;
  alertMessage: string;
  alertId: number;
  showAlert: boolean;

  fetchItems: () => Promise<void>;
  addItem: (item: Item) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  isInCart: (id: number) => boolean;
  handleCart: (item: Item) => Promise<void>;
};

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

  handleCart: async (item) => {
    const isInCart = get().isInCart(item.id);

    if (isInCart) {
      await get().removeItem(item.id);
    } else {
      await get().addItem({ ...item, quantity: 1 });
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

export const useLikeStore = create<LikeStore>((set, get) => ({
  likedItems: [],
  isLiked: (id: string) => get().likedItems.includes(id),
  alertType: null,
  alertMessage: "",
  alertId: 0,
  showAlert: false,

  handleLike: (item, session, addItems) => {
    if (!session?.user) {
      set((state) => ({
        alertType: "error",
        alertMessage: "Vous devez être connecté pour aimer un produit !",
        alertId: state.alertId + 1,
        showAlert: true,
      }));
      return;
    }

    const likedItems = get().likedItems;
    const isLiked = likedItems.includes(item.id);

    const updatedLikes = isLiked
      ? likedItems.filter((id) => id !== item.id)
      : [...likedItems, item.id];

    set((state) => ({
      likedItems: updatedLikes,
      alertType: "like",
      alertMessage: isLiked
        ? `${item.title} retiré des favoris.`
        : `${item.title} ajouté aux favoris.`,
      alertId: state.alertId + 1,
      showAlert: true,
    }));

    addItems(item);
  },
}));

export const useLikeData = create<LikeDataState>((set) => ({
  selectedItems: [],
  addItems: (item: Item) => {
    set((state) => {
      if (
        state.selectedItems.some((existingItem) => existingItem.id === item.id)
      ) {
        console.log(`L'item avec l'id ${item.id} est déjà dans la liste.`);
        return state;
      }
      const newItems = [...state.selectedItems, item];
      console.log(newItems);
      return { selectedItems: newItems };
    });
  },
  removeItems: (itemId: any) => {
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== itemId),
    }));
  },
  clearItems: () => {
    set({ selectedItems: [] });
  },
}));

/**
 * Afficher les résultats de recherche via la barre de recherche
 */
export const useSearchArticles = create<any>((set, get) => ({
  filteredData: [],
  selectedColors: [],
  selectedSeats: [],
  nbreSeatColor: 0,

  setSelectedColors: (colors) => set({ selectedColors: colors }),
  setSelectedSeats: (seats) => set({ selectedSeats: seats }),

  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    set(() => ({ filteredData: filtered }));
  },

  croissantArticles: () => {
    set((state) => ({
      filteredData: [...state.filteredData].sort((a, b) => a.price - b.price),
    }));
  },

  decroissantArticles: () => {
    set((state) => ({
      filteredData: [...state.filteredData].sort((a, b) => b.price - a.price),
    }));
  },

  pertinenceArticles: (db) => {
    set(() => ({ filteredData: [...db] }));
  },

  colorsArticles: (allData, selectedColors) => {
    set(() => {
      if (!Array.isArray(allData)) return { filteredData: [] };

      const newTab = [...allData].filter(
        (item) =>
          item.color &&
          selectedColors
            .map((color) => color.toLowerCase())
            .includes(item.color.toLowerCase())
      );

      return { filteredData: newTab };
    });
  },

  numberSeatArticles: (allData, selectedSeats) => {
    set(() => {
      if (!Array.isArray(allData)) return { filteredData: [] };

      const newTab = [...allData].filter((item) =>
        selectedSeats.includes(item.seat)
      );

      return { filteredData: newTab };
    });
  },
}));
