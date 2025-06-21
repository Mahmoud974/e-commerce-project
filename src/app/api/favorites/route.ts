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
  const body = await req.json();
  const userId = Number(body.userId);
  const canapeId = Number(body.canapeId);

  if (!userId || !canapeId) {
    return new Response(JSON.stringify({ error: "userId et canapeId requis" }), { status: 400 });
  }

  try {
    const existing = await prisma.like.findFirst({
      where: { userId, canapeId },
    });

    if (existing) {
      return new Response(JSON.stringify({ message: "Déjà liké" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const like = await prisma.like.create({
      data: { userId, canapeId },
    });

    return new Response(JSON.stringify(like), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId") || "0", 10);
  const canapeId = parseInt(searchParams.get("canapeId") || "0", 10);

  if (!userId || !canapeId) {
    return new Response(JSON.stringify({ error: "userId et canapeId requis" }), { status: 400 });
  }

  try {
    await prisma.like.deleteMany({
      where: {
        userId,
        canapeId,
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

