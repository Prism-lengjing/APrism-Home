import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  try {
    const { prisma } = await import("@/lib/db");
    const post = await prisma.post.create({
      data: {
        slug: body.slug,
        title: body.title,
        titleZh: body.titleZh || body.title,
        excerpt: body.excerpt || "",
        excerptZh: body.excerptZh || body.excerpt || "",
        content: body.content || "",
        contentZh: body.contentZh || body.content || "",
        category: body.category || "general",
        categoryZh: body.categoryZh || body.category || "通用",
        image: body.image || "",
        authorId: "admin",
        readTime: parseInt(body.readTime) || 5,
        featured: body.featured || false,
        published: body.published || false,
        publishedAt: body.published ? new Date() : null,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
