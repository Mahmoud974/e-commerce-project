import { create } from "zustand";
import { LikeDataState, Item } from "../app/types/canape";

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
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  isInCart: (id: number) => boolean;
  handleCart: (item: Item) => void;
  alertType: "cart" | null;
  alertMessage: string;
  alertId: number;
  showAlert: boolean;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  alertType: null,
  alertMessage: "",
  alertId: 0,
  showAlert: false,

  isInCart: (id) => get().items.some((item) => item.id === id),

  addItem: (item: Item) => {
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) return state;
      return { items: [...state.items, item] };
    });
  },

  removeItem: (itemId: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  updateQuantity: (itemId: number, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  handleCart: (item: Item) => {
    const isInCart = get().isInCart(item.id);

    if (isInCart) {
      get().removeItem(item.id);
    } else {
      get().addItem(item);
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
export const useSearchArticles = create<any>((set) => ({
  filteredData: [],
  nbreSeatColor: 0,

  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    set(() => ({
      filteredData: filtered,
    }));
  },

  croissantArticles: () => {
    set((state) => {
      const sortedData = [...state.filteredData].sort(
        (a, b) => a.prix - b.prix
      );
      return { filteredData: sortedData };
    });
  },

  decroissantArticles: () => {
    set((state) => {
      const sortedData = [...state.filteredData].sort(
        (a, b) => b.prix - a.prix
      );
      return { filteredData: sortedData };
    });
  },

  pertinenceArticles: (db) => {
    const sortedByRelevance = [...db];
    set(() => ({ filteredData: sortedByRelevance }));
    console.log("Tri par pertinence appliqué :", sortedByRelevance);
  },

  colorsArticles: (allData, selectedColors) => {
    set(() => {
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
    const newTab = [...allData].filter((item) =>
      selectedSeats.includes(item.seat)
    );

    let nbreSeat = newTab.length;

    set(() => ({
      filteredData: newTab,
      nbreSeatColor: nbreSeat,
    }));
  },
}));
