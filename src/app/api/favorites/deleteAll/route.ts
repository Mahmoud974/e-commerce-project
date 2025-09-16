import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get('userId') || '0', 10);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId requis' }), { status: 400 });
    }

    await prisma.like.deleteMany({ where: { userId } });

    return new Response(JSON.stringify({ message: 'Tous les favoris supprimés' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur serveur DELETE /favorites/deleteAll :', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};


