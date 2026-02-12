import { NextResponse } from "next/server";
import { getArticles } from "@/lib/data";

export async function GET() {
  const data = await getArticles();
  return NextResponse.json(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
