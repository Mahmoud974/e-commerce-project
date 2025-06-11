import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import redis from "@/lib/redis";

export async function GET() {
  const cacheKey = "produits-entretien:all";

  const cached = await redis.get(cacheKey);
  if (cached) {
    const safeItems = JSON.parse(cached);
    return NextResponse.json(safeItems, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const items = await prisma.produit.findMany({
    where: {},
  });

  const jsonString = JSON.stringify(items, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  await redis.set(cacheKey, jsonString, "EX", 3);

  const safeItems = JSON.parse(jsonString);

  return NextResponse.json(safeItems, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
