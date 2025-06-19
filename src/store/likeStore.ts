import { create } from "zustand";

type LikeAlertType = "like" | "error" | null;

interface LikeStore {
  likedItems: string[];
  isLiked: (id: string) => boolean;
  handleLike: (item: any, session: any, addItems: (item: any) => void) => void;
  alertType: LikeAlertType;
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
        ? `${item.title} retiré des favoris.`
        : `${item.title} ajouté aux favoris.`,
      alertId: state.alertId + 1,
      showAlert: true,
    }));
    addItems(item);
  },
}));
