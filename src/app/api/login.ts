import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma"; // si tu utilises Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

  const isValid = await compare(password, user.password);

  if (!isValid)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
