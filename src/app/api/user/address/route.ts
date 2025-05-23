import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("Token récupéré (PUT):", token);

    if (!token || !token.email) {
      return NextResponse.json(
        { message: "Veuillez vous connecter pour modifier l'adresse" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Données reçues:", body);

    const requiredFields = [
      "name",
      "lastname",
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

    const { name, lastname, address, postalCode, city, country, phone } = body;

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: token.email },
      data: {
        name,
        lastname,
        address,
        postalCode,
        city,
        country,
        phone,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Adresse mise à jour avec succès",
      user: {
        name: updatedUser.name,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        address: updatedUser.address,
        postalCode: updatedUser.postalCode,
        city: updatedUser.city,
        country: updatedUser.country,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    console.error("Erreur détaillée (PUT):", error);
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
      "lastname",
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
        lastname: body.lastname,
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
        lastname: updatedUser.lastname,
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

// Ajoutez cette méthode pour gérer les requêtes OPTIONS (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

// Ajoutez cette méthode pour déboguer
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    return NextResponse.json({
      message: "Route API fonctionnelle",
      tokenExists: !!token,
      tokenEmail: token?.email || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors du test de la route",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
