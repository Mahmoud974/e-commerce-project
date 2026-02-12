import { NextResponse } from "next/server";
import { getEchantillons } from "@/lib/data";

export async function GET() {
  try {
    const data = await getEchantillons();
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des échantillons:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
