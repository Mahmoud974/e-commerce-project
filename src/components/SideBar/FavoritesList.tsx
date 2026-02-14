"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCurrency } from "@/components/Header/Navbar";
import { useCurrencyStore } from "@/store/currencyStore";

type Like = { canapeId?: number; produitId?: number };
type Item = { id: number; title: string; images?: string[]; price?: number };
type FavoritesListProps = {
  isFavorite: any;  
  selectedItems: any[];
  removeItems: (id: string | number) => void;
};
export function FavoritesList({
  isFavorite,
  selectedItems,

}: FavoritesListProps ) {
  const [articles, setArticles] = useState<Item[]>([]);
  const [produits, setProduits] = useState<Item[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const { data: session } = useSession();
  const { currency } = useCurrency();
  const { convertPrice } = useCurrencyStore();

  const removeItems = async (targetId: number) => {
    if (!session?.user?.id) return;
  
    const res = await fetch(`/api/favorites?userId=${session.user.id}&id=${targetId}`, {
      method: "DELETE",
    });
  
    console.log("Status de la suppression:", res.status);
  
    if (res.ok) {
      setLikes((prev) =>
        prev.filter((like) => (like.canapeId ?? like.produitId) !== targetId ? true : false)
      );
    } else {
      const error = await res.json();
      console.error("Erreur lors de la suppression du like", error);
    }
  };
  
  
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
      const data = await res.json();
      setArticles(data);
    };
    const fetchProduits = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produits-entretien`);
      const data = await res.json();
      setProduits(data);
    };
    fetchArticles();
    fetchProduits();
  }, []);

 
  useEffect(() => {
    const fetchLikes = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/favorites?userId=${session.user.id}`);
      const data = await res.json();
      setLikes(data);
    };
    fetchLikes();
  }, [session]);

  
  const likedItems = likes
    .map((like: Like) => {
      const id = like.canapeId ?? like.produitId;
      if (id == null) return null;
      return (
        articles.find((a) => a.id === id) ||
        produits.find((p) => p.id === id) ||
        null
      );
    })
    .filter(Boolean);
  console.log(likedItems);
  const removeAllLikes = async () => {
    if (!session?.user?.id) return;
  
    const res = await fetch(`/api/favorites/deleteAll?userId=${session.user.id}`, {
      method: "DELETE",
    });
  
    if (res.ok) {
      setLikes([]);  
    } else {
      const error = await res.json();
      console.error("Erreur lors de la suppression totale :", error);
    }
  };
  

  if (likedItems.length === 0) {
    return <div className="flex justify-center">Aucun Like 💔</div>;
  }

  return (
    <>
   

      <div className="max-h-[80vh] overflow-y-auto px-2">
    <ul className="space-y-4 mt-3">
      {likedItems.map((item) => {
        const safeItem = item as Item;
        return (
        <li
          key={safeItem.id}
          className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
        >
          <Link href={`/produit/${safeItem.id}`}>
            <div className="flex items-center">
              <Image
                src={safeItem.images?.[0] ?? "/placeholder-image.jpg"}
                alt="product image"
                className="object-contain p-1 w-16 h-16"
                width={64}
                height={64}
                priority
              />
              <div className="ml-3">
                <div className="text-lg font-bold">{safeItem.title}</div>
                <div className="text-gray-400">
                  {typeof safeItem.price === "number" && safeItem.price > 0 ? (
                    <>
                      {convertPrice(safeItem.price, currency || "EUR")}
                      {(currency || "EUR") === "EUR" ? "€" : "£"}
                    </>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
          </Link>
          <button
            onClick={() => removeItems(safeItem.id)}
            className="text-red-500 hover:text-red-700 "
          >
            <Trash className="w-5 h-5 cursor-pointer" />
          </button>
        </li>
        );
      })}
    </ul>
    </div>
    <div className="flex justify-end mb-4">
  <button
    onClick={removeAllLikes}
    className="px-4 py-2 mx-auto mt-9 bg-red-600 text-white rounded hover:bg-red-700 transition"
  >
    Supprimer mes favoris
  </button>
</div>
    </>
  );
}