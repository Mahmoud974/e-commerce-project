import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

const getUserId = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.email || "user1";
};

export async function GET() {
  const userId = await getUserId();
  const data = await redis.get(`panier:${userId}`);
  return NextResponse.json(JSON.parse(data || "[]"));
}

export async function POST(req: Request) {
  const userId = await getUserId();
  const body = await req.json();
  const { id, title, price, quantity, images } = body;

  const panierKey = `panier:${userId}`;
  const data = JSON.parse((await redis.get(panierKey)) || "[]");

  const index = data.findIndex((item: any) => item.id === id);
  if (index > -1) {
    data[index].quantity = quantity;
  } else {
    data.push({ id, title, price, quantity, images });
  }

  await redis.set(panierKey, JSON.stringify(data));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const userId = await getUserId();
  const { id } = await req.json();

  const panierKey = `panier:${userId}`;
  const data = JSON.parse((await redis.get(panierKey)) || "[]");
  const newData = data.filter((item: any) => item.id !== id);

  await redis.set(panierKey, JSON.stringify(newData));
  return NextResponse.json({ success: true });
}
