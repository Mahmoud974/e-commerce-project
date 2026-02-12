import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { materials } from "@/db/echantillions";

const stringify = (value: unknown) =>
  JSON.stringify(value, (_key, val) =>
    typeof val === "bigint" ? val.toString() : val
  );

export async function getArticles() {
  const cacheKey = "canapes:all";
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  const items = await prisma.canape.findMany();
  const jsonString = stringify(items);
  await redis.set(cacheKey, jsonString, "EX", 60);
  return JSON.parse(jsonString);
}

export async function getProduitsEntretien() {
  const cacheKey = "produits-entretien:all";
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  const items = await prisma.produit.findMany({ where: {} });
  const jsonString = stringify(items);
  await redis.set(cacheKey, jsonString, "EX", 3);
  return JSON.parse(jsonString);
}

export async function getEchantillons() {
  const cacheKey = "echantillons:all";
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  const jsonString = stringify(materials);
  await redis.set(cacheKey, jsonString, "EX", 60);
  return JSON.parse(jsonString);
}
