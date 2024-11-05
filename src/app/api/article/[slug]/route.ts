import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const articleName = slug.replace(/-/g, " ");

  try {
    const article = await prisma.canape.findFirst({
      where: { nom: articleName },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: article.id,
      nom: article.nom,
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
