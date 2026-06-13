import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    return NextResponse.json(await prisma.friendLink.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  try {
    const { prisma } = await import("@/lib/db");
    const friend = await prisma.friendLink.create({
      data: {
        name: body.name,
        nameZh: body.nameZh || body.name,
        description: body.description || "",
        descriptionZh: body.descriptionZh || body.description || "",
        url: body.url,
        logo: body.logo || "",
        sortOrder: parseInt(body.sortOrder) || 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json(friend);
  } catch (error) {
    console.error("Failed to create friend link:", error);
    return NextResponse.json({ error: "Failed to create friend link" }, { status: 500 });
  }
}
