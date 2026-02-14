import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const id = Number(params.slug);

  // 🔎 Vérification de sécurité
  if (isNaN(id)) {
    return NextResponse.json(
      { message: "ID invalide" },
      { status: 400 }
    );
  }

  const cacheKey = `canape:${id}`;

  // 1️⃣ Si Redis désactivé
  if (!redis) {
    const article = await prisma.canape.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ article }, { status: 200 });
  }

  // 2️⃣ Vérifie le cache
  try {
    const cached = await redis.get<string>(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }
  } catch {
    console.warn("Redis GET failed");
  }

  // 3️⃣ Recherche en base
  const article = await prisma.canape.findUnique({
    where: { id },
  });

  if (!article) {
    return NextResponse.json(
      { message: "Article introuvable" },
      { status: 404 }
    );
  }

  const responseData = { article };

  // 4️⃣ Stocke en cache
  try {
    await redis.set(cacheKey, JSON.stringify(responseData), {
      ex: 300,
    });
  } catch {
    console.warn("Redis SET failed");
  }

  return NextResponse.json(responseData, { status: 200 });
}
