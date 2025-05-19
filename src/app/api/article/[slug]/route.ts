import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const articleName = slug.replace(/-/g, " ");

  const cacheKey = `canape:${slug}`;

  // 🔍 Vérifie si c’est dans le cache Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("✅ Données servies depuis Redis (slug)");
    return NextResponse.json(JSON.parse(cached), { status: 200 });
  }

  // 📡 Sinon, on va chercher dans Prisma
  const article = await prisma.canape.findFirst({
    where: {
      nom: articleName,
    },
  });

  if (!article) {
    return NextResponse.json(
      { message: "Article introuvable" },
      { status: 404 }
    );
  }

  const responseData = { article };

  // 💾 Stocke dans Redis pour 5 minutes (300 secondes)
  await redis.set(cacheKey, JSON.stringify(responseData), "EX", 300);

  return NextResponse.json(responseData, { status: 200 });
}
