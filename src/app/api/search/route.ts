import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const canapes = await prisma.canape.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { color: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        color: true,
        images: true,
      },
      take: 5,
    });

    const produits = await prisma.produit.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
          { reference: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        images: true,
      },
      take: 5,
    });

    const echantillons = await prisma.echantillon.findMany({
      where: {
        OR: [
          { nom: { contains: query, mode: "insensitive" } },
          { type: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        nom: true,
        images: true,
      },
      take: 5,
    });

    const normalized = [
      ...canapes.map((c) => ({ id: c.id, title: c.title, color: c.color, images: c.images })),
      ...produits.map((p) => ({ id: p.id, title: p.title, color: null as any, images: p.images })),
      ...echantillons.map((e) => ({ id: e.id, title: e.nom, color: null as any, images: e.images ? [e.images] : [] })),
    ];

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Erreur de recherche:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
