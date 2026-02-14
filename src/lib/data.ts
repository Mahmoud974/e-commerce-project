import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { materials } from "@/db/echantillions";

const stringify = (value: unknown) =>
  JSON.stringify(value, (_key, val) =>
    typeof val === "bigint" ? val.toString() : val
  );

const parse = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

/* ============================
   CANAPES
============================ */

export async function getArticles() {
  if (!process.env.DATABASE_URL) return [];

  const cacheKey = "canapes:all";

  try {
    const cached = await redis.get<string>(cacheKey);
    const parsed = parse(cached);
    if (parsed) return parsed;
  } catch {
    console.warn("Redis GET failed (canapes)");
  }

  const items = await prisma.canape.findMany();
  const jsonString = stringify(items);

  try {
    await redis.set(cacheKey, jsonString, {
      ex: 60, // expire dans 60 secondes
    });
  } catch {
    console.warn("Redis SET failed (canapes)");
  }

  return JSON.parse(jsonString);
}

/* ============================
   PRODUITS ENTRETIEN
============================ */

export async function getProduitsEntretien() {
  if (!process.env.DATABASE_URL) return [];

  const cacheKey = "produits-entretien:all";

  try {
    const cached = await redis.get<string>(cacheKey);
    const parsed = parse(cached);
    if (parsed) return parsed;
  } catch {
    console.warn("Redis GET failed (produits)");
  }

  const items = await prisma.produit.findMany();
  const jsonString = stringify(items);

  try {
    await redis.set(cacheKey, jsonString, {
      ex: 30, // 30 secondes
    });
  } catch {
    console.warn("Redis SET failed (produits)");
  }

  return JSON.parse(jsonString);
}

/* ============================
   ECHANTILLONS
============================ */

export async function getEchantillons() {
  if (!process.env.DATABASE_URL) return [...materials];

  const cacheKey = "echantillons:all";

  try {
    const cached = await redis.get<string>(cacheKey);
    const parsed = parse(cached);
    if (parsed) return parsed;
  } catch {
    console.warn("Redis GET failed (echantillons)");
  }

  const jsonString = stringify(materials);

  try {
    await redis.set(cacheKey, jsonString, {
      ex: 60,
    });
  } catch {
    console.warn("Redis SET failed (echantillons)");
  }

  return JSON.parse(jsonString);
}
