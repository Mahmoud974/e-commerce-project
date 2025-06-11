import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { canapeId },
  } = req;

  if (req.method === "GET") {
    try {
      const canapeWithLikes = await prisma.canape.findUnique({
        where: { id: parseInt(canapeId as string) },
        include: {
          likes: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!canapeWithLikes) {
        return res.status(404).json({ message: "Canapé non trouvé" });
      }

      return res.status(200).json(canapeWithLikes.likes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  } else {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }
}
