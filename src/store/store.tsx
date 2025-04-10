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
        ? `${item.nom} retiré des favoris.`
        : `${item.nom} ajouté aux favoris.`,
      alertId: state.alertId + 1,
      showAlert: true,
    }));

    addItems(item);
  },
}));

type CartState = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
};

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

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item: Item) => {
    set((state) => {
      const itemExists = state.items.find(
        (existingItem) => existingItem.id === item.id
      );
      if (itemExists) {
        console.log(`L'article avec l'id ${item.id} est déjà dans le panier.`);
        return state;
      }

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
}));

/**
 * Afficher les résultats de recherche via la barre de recherche
 */
export const useSearchArticles = create<any>((set) => ({
  filteredData: [],
  nbreSeatColor: 0,

  setFilteredData: (db, searchTerm) => {
    const filtered = db?.filter((item) =>
      item.nom.toLowerCase().includes(searchTerm?.toLowerCase())
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

  // colorsArticles: (db, selectedColors) => {
  //   const newTab = [...db]?.filter(
  //     (item) =>
  //       item.color && item.color.toLowerCase() === selectedColors.toLowerCase()
  //   );
  //   console.log("Articles filtrés par couleur :", newTab);

  //   set(() => ({ filteredData: newTab }));
  // },
  colorsArticles: (selectedColors) => {
    set((state) => {
      // Filtrage des articles par couleur
      const newTab = [...state.filteredData]?.filter(
        (item) =>
          item.color &&
          item.color.toLowerCase() === selectedColors.toLowerCase()
      );

      // Mise à jour de l'état avec les articles filtrés
      console.log("Articles filtrés par couleur :", newTab);
      return { filteredData: newTab };
    });
  },

  numberSeatArticles: (db, selectedSeat) => {
    const newTab = db?.filter((item) => item.seat === selectedSeat);
    let nbreSeat = newTab.map((ok) => ok.seat);
    console.log("Articles filtrés par nombre de sièges :", nbreSeat.length);

    set(() => ({ filteredData: newTab }));
    set(() => ({ nbreSeatColor: nbreSeat.length }));
  },
}));
