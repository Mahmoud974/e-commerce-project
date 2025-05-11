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

    return NextResponse.json(canapes);
  } catch (error) {
    console.error("Erreur de recherche:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
