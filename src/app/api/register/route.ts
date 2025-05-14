import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || password.length < 12) {
      return NextResponse.json(
        { message: "Email ou mot de passe invalide." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email déjà utilisé." },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    });

    return NextResponse.json(
      { message: "Inscription réussie", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
