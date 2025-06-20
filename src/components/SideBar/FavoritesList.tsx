"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function FavoritesList( ) {
  const [articles, setArticles] = useState([]);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();

  const removeItems = async (canapeId: any) => {
    if (!session?.user?.id) return;
  
    const res = await fetch(`/api/favorites?userId=${session.user.id}&canapeId=${canapeId}`, {
      method: "DELETE",
    });
  
    console.log("Status de la suppression:", res.status);
  
    if (res.ok) {
      setLikes((prev) => prev.filter((like) => like.canapeId !== canapeId));
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
    fetchArticles();
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

  // Filtrer les articles likés
  const likedItems = articles.filter((article) =>
    likes.some((like) => like.canapeId === article.id)
  );

  if (likedItems.length === 0) {
    return <div className="flex justify-center">Aucun Like 💔</div>;
  }

  return (
    <ul className="space-y-4 mt-3">
      {likedItems.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between border-b border-gray-600 pb-5 hover:bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-lg p-2"
        >
          <Link href={`/produit/${item.id}`}>
            <div className="flex items-center">
              <Image
                src={item.images?.[0] ?? "/placeholder-image.jpg"}
                alt="product image"
                className="object-contain p-1 w-16 h-16"
                width={64}
                height={64}
                priority
              />
              <div className="ml-3">
                <div className="text-lg font-bold">{item.title}</div>
                <div className="text-gray-400">{item.price}€</div>
              </div>
            </div>
          </Link>
          <button
            onClick={() => removeItems(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
