"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function saveProjectContent(projectId: string, contentJson: string) {
  try {
    const user = await requireAuth();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return { error: "Project not found." };
    }

    if (project.ownerId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized to edit this project." };
    }

    // Verify it is valid JSON
    try {
      JSON.parse(contentJson);
    } catch {
      return { error: "Invalid content format." };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        content: contentJson,
      },
    });

    // Log update activity
    await prisma.activity.create({
      data: {
        projectId: project.id,
        userId: user.id,
        type: "PROJECT_UPDATED",
        metadata: JSON.stringify({ name: project.name, timestamp: new Date().toISOString() }),
      },
    });

    revalidatePath(`/projects/${projectId}`);
    revalidatePath(`/p/${project.slug}`);

    return { success: true, updatedAt: updated.updatedAt };
  } catch (err: any) {
    console.error("saveProjectContent error:", err);
    return { error: "Failed to save project content." };
  }
}
