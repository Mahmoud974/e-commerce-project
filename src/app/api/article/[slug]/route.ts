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
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached), { status: 200 });
  }

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

  await redis.set(cacheKey, JSON.stringify(responseData), "EX", 300);

  return NextResponse.json(responseData, { status: 200 });
}
