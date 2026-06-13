import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    return NextResponse.json(await prisma.project.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  try {
    const { prisma } = await import("@/lib/db");
    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        title: body.title,
        titleZh: body.titleZh || body.title,
        description: body.description || "",
        descriptionZh: body.descriptionZh || body.description || "",
        content: body.content || "",
        contentZh: body.contentZh || "",
        category: body.category || "general",
        categoryZh: body.categoryZh || body.category || "通用",
        image: body.image || "",
        technologies: body.technologies || "",
        teamSize: body.teamSize || "",
        timeline: body.timeline || "",
        role: body.role || "",
        year: body.year || "",
        githubUrl: body.githubUrl || null,
        liveUrl: body.liveUrl || null,
        status: body.status || "active",
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
