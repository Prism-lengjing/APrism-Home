import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    return NextResponse.json(await prisma.project.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch { return NextResponse.json([]); }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  try {
    const { prisma } = await import("@/lib/db");
    return NextResponse.json(await prisma.project.create({ data: body }));
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
