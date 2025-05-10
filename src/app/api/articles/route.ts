import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import redis from "@/lib/redis";

export async function GET() {
  const cacheKey = "canapes:all";

  // 🔍 Vérifie si les données sont dans Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    const safeItems = JSON.parse(cached);
    return NextResponse.json(safeItems, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Sinon, fetch depuis Prisma
  const items = await prisma.canape.findMany();

  const jsonString = JSON.stringify(items, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  // 📦 Stocke dans Redis avec expiration (ex: 60 sec)
  await redis.set(cacheKey, jsonString, "EX", 60);

  const safeItems = JSON.parse(jsonString);

  return NextResponse.json(safeItems, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
