import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Définir le type des données pour un Like avec l'utilisateur associé
type LikeWithUser = {
  id: number;
  userId: number;
  canapeId: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { canapeId },
  } = req;

  if (req.method === "GET") {
    try {
      // Récupérer les "j'aime" du canapé par son ID
      const canapeWithLikes = await prisma.canape.findUnique({
        where: { id: parseInt(canapeId as string) }, // Conversion de canapeId en nombre
        include: {
          likes: {
            include: {
              user: true, // Inclure les informations sur l'utilisateur qui a aimé
            },
          },
        },
      });

      // Vérifier si le canapé existe
      if (!canapeWithLikes) {
        return res.status(404).json({ message: "Canapé non trouvé" });
      }

      // Répondre avec les "j'aime" et les informations sur les utilisateurs
      return res.status(200).json(canapeWithLikes.likes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  } else {
    // Si la méthode n'est pas GET
    return res.status(405).json({ message: "Méthode non autorisée" });
  }
}
