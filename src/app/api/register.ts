import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Méthode non autorisée
  }

  const { email, password } = req.body;

  // Validation des champs
  if (!email || !password || password.length < 12) {
    return res.status(400).json({ message: "Champs invalides" });
  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }

  // Hashage du mot de passe
  const hashedPassword = await hash(password, 12);

  // Créer l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({ message: "Utilisateur créé", userId: user.id });
}
