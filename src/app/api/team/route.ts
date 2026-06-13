import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    return NextResponse.json(await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch (error) {
    console.error("Failed to fetch team:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  try {
    const { prisma } = await import("@/lib/db");
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        nameZh: body.nameZh || body.name,
        role: body.role,
        roleZh: body.roleZh || body.role,
        bio: body.bio || "",
        bioZh: body.bioZh || body.bio || "",
        image: body.image || "",
        email: body.email || null,
        github: body.github || null,
        website: body.website || null,
        type: body.type || "member",
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error("Failed to create team member:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
