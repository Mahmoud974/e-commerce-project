import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

const getUserId = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.email || "user1";
};

type PanierItem = { id: string; title?: string; price?: number; quantity?: number; images?: string[] };

/** Redis peut renvoyer une string JSON ou un objet déjà désérialisé */
function parsePanier(raw: unknown): PanierItem[] {
  if (Array.isArray(raw)) return raw as PanierItem[];
  if (typeof raw === "string") return raw ? (JSON.parse(raw) as PanierItem[]) : [];
  return [];
}

export async function GET() {
  try {
    const userId = await getUserId();
    const data = await redis.get(`panier:${userId}`);
    return NextResponse.json(parsePanier(data));
  } catch (err) {
    console.error("[GET /api/panier]", err);
    return NextResponse.json(
      { error: "Panier indisponible. Vérifiez UPSTASH_REDIS_* sur Vercel." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    const body = await req.json();
    const { id, title, price, quantity, images } = body;

    const panierKey = `panier:${userId}`;
    const data = parsePanier(await redis.get(panierKey));

    const index = data.findIndex((item: any) => item.id === id);
    if (index > -1) {
      data[index].quantity = quantity;
    } else {
      data.push({ id, title, price, quantity, images });
    }

    await redis.set(panierKey, JSON.stringify(data));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/panier]", err);
    return NextResponse.json(
      { error: "Impossible d'ajouter au panier. Vérifiez UPSTASH_REDIS_* sur Vercel." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await getUserId();
    const { id } = await req.json();

    const panierKey = `panier:${userId}`;
    const data = parsePanier(await redis.get(panierKey));
    const newData = data.filter((item: any) => item.id !== id);

    await redis.set(panierKey, JSON.stringify(newData));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/panier]", err);
    return NextResponse.json(
      { error: "Impossible de supprimer du panier." },
      { status: 500 }
    );
  }
}
