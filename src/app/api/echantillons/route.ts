import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { materials } from "@/db/echantillions";

export async function GET() {
  const cacheKey = "echantillons:all";

  try {
    console.log("Tentative de récupération du cache Redis...");
    const cached = await redis.get(cacheKey);
    if (cached) {
      const safeItems = JSON.parse(cached);
      console.log("Données récupérées du cache:", safeItems);
      return NextResponse.json(safeItems, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Cache non trouvé, récupération des matériaux...");
    const items = materials;
    console.log("Matériaux récupérés:", items);

    const jsonString = JSON.stringify(items, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );

    await redis.set(cacheKey, jsonString, "EX", 60);

    const safeItems = JSON.parse(jsonString);
    console.log("Données à retourner:", safeItems);
    return NextResponse.json(safeItems, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des échantillons:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
