import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const articleName = slug.replace(/-/g, " ");
  const cacheKey = `canape:${slug}`;

 
  if (!redis) {
    const article = await prisma.canape.findFirst({
      where: { nom: articleName },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ article }, { status: 200 });
  }

 
  try {
    const cached = await redis.get<string>(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }
  } catch {
    console.warn("Redis GET failed");
  }

 
  const article = await prisma.canape.findFirst({
    where: { nom: articleName },
  });

  if (!article) {
    return NextResponse.json(
      { message: "Article introuvable" },
      { status: 404 }
    );
  }

  const responseData = { article };

  // 💾 3️⃣ Stocke en cache (Upstash syntaxe correcte)
  try {
    await redis.set(cacheKey, JSON.stringify(responseData), {
      ex: 300, // expire en 5 minutes
    });
  } catch {
    console.warn("Redis SET failed");
  }

  return NextResponse.json(responseData, { status: 200 });
}
