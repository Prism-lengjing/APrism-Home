import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { prisma } = await import("@/lib/db");
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to fetch project:", error);
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
    const project = await prisma.project.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        titleZh: body.titleZh,
        description: body.description,
        descriptionZh: body.descriptionZh,
        content: body.content,
        contentZh: body.contentZh,
        category: body.category,
        categoryZh: body.categoryZh,
        image: body.image,
        technologies: body.technologies,
        teamSize: body.teamSize,
        timeline: body.timeline,
        role: body.role,
        year: body.year,
        githubUrl: body.githubUrl || null,
        liveUrl: body.liveUrl || null,
        status: body.status,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
