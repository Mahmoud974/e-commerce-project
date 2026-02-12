import { NextResponse } from "next/server";
import { getProduitsEntretien } from "@/lib/data";

export async function GET() {
  const data = await getProduitsEntretien();
  return NextResponse.json(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
