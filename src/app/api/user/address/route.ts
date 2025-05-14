import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/lib/authOptions";

export async function PUT(request: NextRequest) {
  try {
    // Récupération du token JWT depuis le cookie
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("Token décodé:", token);
    console.log(
      "Headers de la requête:",
      JSON.stringify(Object.fromEntries(request.headers), null, 2)
    );

    if (!token || !token.email) {
      console.log("Pas de token ou d'email dans le token");
      return NextResponse.json(
        { message: "Veuillez vous connecter pour modifier l'adresse" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Données reçues:", body);

    // Vérification des données requises
    const requiredFields = [
      "name",
      "address",
      "postalCode",
      "city",
      "country",
      "phone",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Champs requis manquants: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const { name, address, postalCode, city, country, phone } = body;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      console.log("Utilisateur non trouvé pour l'email:", token.email);
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { email: token.email },
      data: {
        name,
        address,
        postalCode,
        city,
        country,
        phone,
        updatedAt: new Date(),
      },
    });

    console.log("Utilisateur mis à jour:", updatedUser);

    return NextResponse.json({
      message: "Adresse mise à jour avec succès",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        postalCode: updatedUser.postalCode,
        city: updatedUser.city,
        country: updatedUser.country,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la mise à jour de l'adresse",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("Token décodé (POST):", token);

    if (!token || !token.email) {
      return NextResponse.json(
        { message: "Veuillez vous connecter pour ajouter l'adresse" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Données reçues (POST):", body);

    // Vérification des données requises
    const requiredFields = [
      "name",
      "address",
      "postalCode",
      "city",
      "country",
      "phone",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Champs requis manquants: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Mise à jour ou ajout des coordonnées (update si existe, sinon erreur)
    const updatedUser = await prisma.user.update({
      where: { email: token.email },
      data: {
        name: body.name,
        address: body.address,
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
        phone: body.phone,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Coordonnées ajoutées/mises à jour avec succès",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        postalCode: updatedUser.postalCode,
        city: updatedUser.city,
        country: updatedUser.country,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    console.error("Erreur détaillée (POST):", error);
    return NextResponse.json(
      {
        message: "Erreur lors de l'ajout des coordonnées",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
