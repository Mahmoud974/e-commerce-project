import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const items = await prisma.canape.findMany();

  // 1. JSON.stringify avec replacer pour convertir tous les BigInt en string
  const jsonString = JSON.stringify(items, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  // 2. JSON.parse pour retrouver votre structure JS sans BigInt
  const safeItems = JSON.parse(jsonString);

  return NextResponse.json(safeItems, {
    status: 200, // GET → 200 OK plutôt que 201 Created
    headers: { "Content-Type": "application/json" },
  });
}
