import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Méthode non autorisée" });

  const { email, password } = req.body;

  if (!email || !password || password.length < 12) {
    return res.status(400).json({ message: "Email ou mot de passe invalide." });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email déjà utilisé." });
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({ message: "Inscription réussie" });
}
