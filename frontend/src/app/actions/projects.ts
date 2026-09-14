"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getStarterContent } from "@/lib/templates";

const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters").max(80),
  description: z.string().max(300).optional(),
  template: z.enum(["portfolio", "landing", "brief", "blank"]).default("portfolio"),
});

export async function createProject(formData: FormData) {
  const user = await requireAuth();

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || "";
  const template = (formData.get("template")?.toString() || "portfolio") as
    | "portfolio"
    | "landing"
    | "brief"
    | "blank";

  const validation = createProjectSchema.safeParse({ name, description, template });
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input." };
  }

  // Generate unique slug
  let baseSlug = slugify(name || "project");
  if (!baseSlug) baseSlug = `project-${Date.now()}`;
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await prisma.project.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const initialContent = getStarterContent(template, name!);

  const project = await prisma.project.create({
    data: {
      name: name!,
      slug: uniqueSlug,
      description,
      status: "draft",
      ownerId: user.id,
      content: JSON.stringify(initialContent),
      settings: JSON.stringify({
        seoTitle: name,
        seoDescription: description || `Digital project created with Studio.`,
        visibility: "public",
        theme: "dark",
      }),
    },
  });

  // Log activity
  await prisma.activity.create({
    data: {
      projectId: project.id,
      userId: user.id,
      type: "PROJECT_CREATED",
      metadata: JSON.stringify({ name: project.name, slug: project.slug, template }),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/projects");

  return { success: true, projectId: project.id, slug: project.slug };
}

export async function updateProjectDetails(formData: FormData) {
  const user = await requireAuth();
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString().trim();
  const rawSlug = formData.get("slug")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || "";
  const seoTitle = formData.get("seoTitle")?.toString().trim() || name;
  const seoDescription = formData.get("seoDescription")?.toString().trim() || description;

  if (!id || !name) {
    return { error: "Missing required fields." };
  }

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return { error: "Project not found." };
  }

  if (project.ownerId !== user.id && user.role !== "admin") {
    return { error: "Unauthorized." };
  }

  // Validate slug
  let targetSlug = slugify(rawSlug || name);
  if (targetSlug !== project.slug) {
    const existing = await prisma.project.findUnique({ where: { slug: targetSlug } });
    if (existing && existing.id !== project.id) {
      return { error: "This slug is already taken. Please pick another." };
    }
  }

  const currentSettings = project.settings ? JSON.parse(project.settings) : {};
  const updatedSettings = {
    ...currentSettings,
    seoTitle,
    seoDescription,
  };

  const updated = await prisma.project.update({
    where: { id },
    data: {
      name,
      slug: targetSlug,
      description,
      settings: JSON.stringify(updatedSettings),
    },
  });

  await prisma.activity.create({
    data: {
      projectId: project.id,
      userId: user.id,
      type: "PROJECT_UPDATED",
      metadata: JSON.stringify({ name: updated.name, slug: updated.slug }),
    },
  });

  revalidatePath(`/projects/${id}`);
  revalidatePath(`/projects/${id}/settings`);
  revalidatePath("/projects");
  revalidatePath("/dashboard");

  return { success: true, project: updated };
}

export async function archiveProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return { error: "Project not found." };
  if (project.ownerId !== user.id && user.role !== "admin") return { error: "Unauthorized." };

  const updated = await prisma.project.update({
    where: { id },
    data: { status: "archived" },
  });

  await prisma.activity.create({
    data: {
      projectId: project.id,
      userId: user.id,
      type: "PROJECT_ARCHIVED",
      metadata: JSON.stringify({ name: project.name }),
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function restoreProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return { error: "Project not found." };
  if (project.ownerId !== user.id && user.role !== "admin") return { error: "Unauthorized." };

  const updated = await prisma.project.update({
    where: { id },
    data: { status: "draft" },
  });

  await prisma.activity.create({
    data: {
      projectId: project.id,
      userId: user.id,
      type: "PROJECT_RESTORED",
      metadata: JSON.stringify({ name: project.name }),
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function duplicateProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return { error: "Project not found." };
  if (project.ownerId !== user.id && user.role !== "admin") return { error: "Unauthorized." };

  const newName = `${project.name} (Copy)`;
  let baseSlug = slugify(newName);
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await prisma.project.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const duplicated = await prisma.project.create({
    data: {
      name: newName,
      slug: uniqueSlug,
      description: project.description,
      status: "draft",
      ownerId: user.id,
      content: project.content,
      settings: project.settings,
    },
  });

  await prisma.activity.create({
    data: {
      projectId: duplicated.id,
      userId: user.id,
      type: "PROJECT_DUPLICATED",
      metadata: JSON.stringify({ originalName: project.name, newName }),
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true, projectId: duplicated.id };
}

export async function deleteProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return { error: "Project not found." };
  if (project.ownerId !== user.id && user.role !== "admin") return { error: "Unauthorized." };

  await prisma.project.delete({ where: { id } });

  await prisma.activity.create({
    data: {
      userId: user.id,
      type: "PROJECT_DELETED",
      metadata: JSON.stringify({ name: project.name }),
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true };
}
