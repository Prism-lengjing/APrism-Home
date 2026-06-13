import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { prisma } = await import("@/lib/db");
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(member);
  } catch (error) {
    console.error("Failed to fetch team member:", error);
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
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        nameZh: body.nameZh,
        role: body.role,
        roleZh: body.roleZh,
        bio: body.bio,
        bioZh: body.bioZh,
        image: body.image,
        email: body.email || null,
        github: body.github || null,
        website: body.website || null,
        type: body.type,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error("Failed to update team member:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
