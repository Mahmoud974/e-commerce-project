import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

const headersElement = {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
};

 
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId") || "0", 10);

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId requis" }), { status: 400 });
  }

  const canap = await prisma.like.findMany({
    where: { userId },
  });

  return new Response(JSON.stringify(canap), headersElement);
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const userId = Number(body.userId);
  
    const genericId = Number(body.canapeId ?? body.produitId ?? body.id);

    if (!userId || !genericId) {
      return new Response(
        JSON.stringify({ error: "userId et identifiant produit/canapé requis" }),
        { status: 400 }
      );
    }

  
    const canape = await prisma.canape.findUnique({ where: { id: genericId } });
    const produit = canape ? null : await prisma.produit.findUnique({ where: { id: genericId } });

    if (!canape && !produit) {
      return new Response(JSON.stringify({ error: "Élément introuvable" }), { status: 404 });
    }
 
    const existing = await prisma.like.findFirst({
      where: canape
        ? { userId, canapeId: genericId }
        : { userId, produitId: genericId },
    });

    if (existing) {
      return new Response(JSON.stringify({ message: "Déjà liké" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data: any = {
      user: { connect: { id: userId } },
    };
    if (canape) {
      data.canape = { connect: { id: genericId } };
    } else {
      data.produit = { connect: { id: genericId } };
    }
    const like = await prisma.like.create({ data });

    return new Response(JSON.stringify(like), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Erreur serveur POST /favorites :", error?.message || error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur", details: error?.message ?? null }),
      { status: 500 }
    );
  }
};



export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId") || "0", 10);

  const genericId = parseInt(
    searchParams.get("canapeId") ||
      searchParams.get("produitId") ||
      searchParams.get("id") ||
      "0",
    10
  );

  if (!userId || !genericId) {
    return new Response(
      JSON.stringify({ error: "userId et identifiant produit/canapé requis" }),
      { status: 400 }
    );
  }

  try {
    await prisma.like.deleteMany({
      where: {
        userId,
        OR: [{ canapeId: genericId }, { produitId: genericId }],
      },
    });

    return new Response(JSON.stringify({ message: "Like supprimé" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};

