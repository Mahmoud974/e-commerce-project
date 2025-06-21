import { create } from "zustand";
import { useLikeData } from "./likeDataStore";

type LikeAlertType = "like" | "error" | null;

interface LikeStore {
  likedItems: number[];
  isLiked: (id: number) => boolean;
  handleLike: (item: any, session: any) => void;
  initLikes: (userId: number) => Promise<void>;
  alertType: LikeAlertType;
  alertMessage: string;
  alertId: number;
  showAlert: boolean;
}

export const useLikeStore = create<LikeStore>((set, get) => ({
  likedItems: [],
  isLiked: (id: number) => get().likedItems.includes(id),
  alertType: null,
  alertMessage: "",
  alertId: 0,
  showAlert: false,

  handleLike: (item, session) => {
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
      
    if (isLiked) {
      useLikeData.getState().removeItems(item.id);
    } else {
      useLikeData.getState().addItems(item);
    }

    set((state) => ({
      likedItems: updatedLikes,
      alertType: "like",
      alertMessage: isLiked
        ? `${item.title} retiré des favoris.`
        : `${item.title} ajouté aux favoris.`,
      alertId: state.alertId + 1,
      showAlert: true,
    }));
  },
  initLikes: async (userId) => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/favorites?userId=${userId}`);
      if (res.ok) {
        const likes = await res.json();
        const likedIds = likes.map((like: any) => like.canapeId);
        set({ likedItems: likedIds });
      }
    } catch (error) {
      console.error("Failed to fetch likes", error);
    }
  },
}));
