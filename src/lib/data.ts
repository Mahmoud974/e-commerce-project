import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { materials } from "@/db/echantillions";

const stringify = (value: unknown) =>
  JSON.stringify(value, (_key, val) =>
    typeof val === "bigint" ? val.toString() : val
  );

export async function getArticles() {
  if (!process.env.DATABASE_URL) return [];
  
  // Si Redis n'est pas disponible (pendant le build), utiliser directement la DB
  if (!redis) {
    const items = await prisma.canape.findMany();
    return JSON.parse(stringify(items));
  }

  const cacheKey = "canapes:all";
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.warn('Redis get failed, using DB directly');
  }

  const items = await prisma.canape.findMany();
  const jsonString = stringify(items);
  
  try {
    await redis.set(cacheKey, jsonString, "EX", 60);
  } catch (error) {
    console.warn('Redis set failed');
  }
  
  return JSON.parse(jsonString);
}

export async function getProduitsEntretien() {
  if (!process.env.DATABASE_URL) return [];
  
  if (!redis) {
    const items = await prisma.produit.findMany({ where: {} });
    return JSON.parse(stringify(items));
  }

  const cacheKey = "produits-entretien:all";
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.warn('Redis get failed, using DB directly');
  }

  const items = await prisma.produit.findMany({ where: {} });
  const jsonString = stringify(items);
  
  try {
    await redis.set(cacheKey, jsonString, "EX", 3);
  } catch (error) {
    console.warn('Redis set failed');
  }
  
  return JSON.parse(jsonString);
}

export async function getEchantillons() {
  if (!process.env.DATABASE_URL) return [...materials];
  
  if (!redis) {
    return [...materials];
  }

  const cacheKey = "echantillons:all";
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.warn('Redis get failed, using materials directly');
  }

  const jsonString = stringify(materials);
  
  try {
    await redis.set(cacheKey, jsonString, "EX", 60);
  } catch (error) {
    console.warn('Redis set failed');
  }
  
  return JSON.parse(jsonString);
}