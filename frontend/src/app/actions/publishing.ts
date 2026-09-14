"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function publishProject(projectId: string) {
  try {
    const user = await requireAuth();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return { error: "Project not found." };
    }

    if (project.ownerId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized." };
    }

    if (!project.name || !project.slug) {
      return { error: "Project requires a name and slug before publishing." };
    }

    let parsedContent = [];
    try {
      parsedContent = JSON.parse(project.content || "[]");
    } catch {
      return { error: "Project contains invalid content." };
    }

    if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
      return { error: "Project must contain at least one content section before publishing." };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "published",
        publishedAt: new Date(),
      },
    });

    await prisma.activity.create({
      data: {
        projectId: project.id,
        userId: user.id,
        type: "PROJECT_PUBLISHED",
        metadata: JSON.stringify({ slug: updated.slug, name: updated.name }),
      },
    });

    revalidatePath(`/projects/${projectId}`);
    revalidatePath(`/p/${updated.slug}`);
    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return {
      success: true,
      slug: updated.slug,
      publishedAt: updated.publishedAt,
    };
  } catch (err: any) {
    console.error("publishProject error:", err);
    return { error: "An unexpected error occurred during publishing." };
  }
}

export async function unpublishProject(projectId: string) {
  try {
    const user = await requireAuth();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return { error: "Project not found." };
    }

    if (project.ownerId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized." };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "draft",
      },
    });

    await prisma.activity.create({
      data: {
        projectId: project.id,
        userId: user.id,
        type: "PROJECT_UNPUBLISHED",
        metadata: JSON.stringify({ name: updated.name }),
      },
    });

    revalidatePath(`/projects/${projectId}`);
    revalidatePath(`/p/${updated.slug}`);
    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return { success: true };
  } catch (err: any) {
    console.error("unpublishProject error:", err);
    return { error: "Failed to unpublish project." };
  }
}
