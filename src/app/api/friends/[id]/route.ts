import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { prisma } = await import("@/lib/db");
    const friend = await prisma.friendLink.findUnique({ where: { id } });
    if (!friend) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(friend);
  } catch (error) {
    console.error("Failed to fetch friend link:", error);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  try {
    const { prisma } = await import("@/lib/db");
    const friend = await prisma.friendLink.update({
      where: { id },
      data: {
        name: body.name,
        nameZh: body.nameZh,
        description: body.description,
        descriptionZh: body.descriptionZh,
        url: body.url,
        logo: body.logo,
        sortOrder: parseInt(body.sortOrder) || 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json(friend);
  } catch (error) {
    console.error("Failed to update friend link:", error);
    return NextResponse.json({ error: "Failed to update friend link" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.friendLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete friend link:", error);
    return NextResponse.json({ error: "Failed to delete friend link" }, { status: 500 });
  }
}
