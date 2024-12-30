import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const itemDb = await prisma.canape.findMany();

  return NextResponse.json(itemDb, { status: 201 });
}
