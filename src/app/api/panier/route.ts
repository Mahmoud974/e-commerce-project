// /app/api/panier/route.ts
import { NextResponse } from "next/server";
import redis from "@/lib/redis"; // ajuster le chemin selon ton projet

// GET: Récupère le panier pour un utilisateur
export async function GET(req: Request) {
  const userId = "user1"; // en vrai, récupère ça depuis un token/session
  const data = await redis.get(`panier:${userId}`);
  return NextResponse.json(JSON.parse(data || "[]"));
}

// POST: Ajoute ou met à jour un article
export async function POST(req: Request) {
  const body = await req.json();
  const userId = "user1";
  const { id, title, price, quantity, images } = body;

  const panierKey = `panier:${userId}`;
  const data = JSON.parse((await redis.get(panierKey)) || "[]");

  const existingIndex = data.findIndex((item: any) => item.id === id);
  if (existingIndex > -1) {
    data[existingIndex].quantity = quantity;
  } else {
    data.push({ id, title, price, quantity, images });
  }

  await redis.set(panierKey, JSON.stringify(data));
  return NextResponse.json({ success: true });
}

// DELETE: Supprime un article
export async function DELETE(req: Request) {
  const body = await req.json();
  const userId = "user1";
  const { id } = body;

  const panierKey = `panier:${userId}`;
  const data = JSON.parse((await redis.get(panierKey)) || "[]");
  const newData = data.filter((item: any) => item.id !== id);

  await redis.set(panierKey, JSON.stringify(newData));
  return NextResponse.json({ success: true });
}
