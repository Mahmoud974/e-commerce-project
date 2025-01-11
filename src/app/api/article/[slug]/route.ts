import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { useTemplate } from "@/app/hook/useTemplate";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const articleName = slug.replace(/-/g, " ");
  const article = await prisma.canape.findFirst({
    where: {
      nom: articleName,
    },
  });

  return NextResponse.json({ article });
}
