'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

const createProjectSchema = z.object({
  title: z.string().min(2, 'Project title must be at least 2 characters').max(120),
  description: z.string().max(300).optional(),
});

export async function createProject(formData: FormData) {
  const user = await requireAuth();

  const title = formData.get('name')?.toString().trim() || formData.get('title')?.toString().trim() || '';
  const description = formData.get('description')?.toString().trim() || '';

  const validation = createProjectSchema.safeParse({ title, description });
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || 'Invalid input.' };
  }

  let baseSlug = slugify(title || 'monograph');
  if (!baseSlug) baseSlug = `monograph-${Date.now()}`;
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await prisma.project.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  // Find or create default Category
  let category = await prisma.category.findFirst();
  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: 'monographs',
        name: 'Monographs',
        description: 'Archival photographic editions',
      },
    });
  }

  const project = await prisma.project.create({
    data: {
      title,
      slug: uniqueSlug,
      intro: description,
      status: 'DRAFT',
      createdById: user.id,
      categoryId: category.id,
      seoTitle: title,
      seoDescription: description || 'Photographic monograph in atelier index.',
    },
  });

  await prisma.activity.create({
    data: {
      actorId: user.id,
      action: 'PROJECT_CREATED',
      targetType: 'project',
      targetId: project.id,
      summary: `Created monograph draft: ${project.title}`,
    },
  });

  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/projects');
  return { success: true, projectId: project.id, slug: project.slug };
}

export async function updateProjectDetails(formData: FormData) {
  const user = await requireAuth();
  const id = formData.get('id')?.toString();
  const title = formData.get('name')?.toString().trim() || formData.get('title')?.toString().trim();
  const rawSlug = formData.get('slug')?.toString().trim();
  const description = formData.get('description')?.toString().trim() || '';
  const seoTitle = formData.get('seoTitle')?.toString().trim() || title;
  const seoDescription = formData.get('seoDescription')?.toString().trim() || description;

  if (!id || !title) return { error: 'Missing required fields.' };

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: 'Project not found.' };
  if (project.createdById !== user.id && user.role !== 'ADMIN') return { error: 'Unauthorized.' };

  let targetSlug = slugify(rawSlug || title);
  if (targetSlug !== project.slug) {
    const existing = await prisma.project.findUnique({ where: { slug: targetSlug } });
    if (existing && existing.id !== project.id) {
      return { error: 'This slug is already taken. Please pick another.' };
    }
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      title,
      slug: targetSlug,
      intro: description,
      seoTitle,
      seoDescription,
    },
  });

  await prisma.activity.create({
    data: {
      actorId: user.id,
      action: 'PROJECT_UPDATED',
      targetType: 'project',
      targetId: project.id,
      summary: `Updated monograph metadata: ${updated.title}`,
    },
  });

  revalidatePath(`/project/${targetSlug}`);
  revalidatePath(`/admin/projects/${id}`);
  return { success: true, project: updated };
}

export async function archiveProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: 'Project not found.' };
  if (project.createdById !== user.id && user.role !== 'ADMIN') return { error: 'Unauthorized.' };

  await prisma.project.update({ where: { id }, data: { status: 'ARCHIVED' } });

  await prisma.activity.create({
    data: {
      actorId: user.id,
      action: 'PROJECT_ARCHIVED',
      targetType: 'project',
      targetId: project.id,
      summary: `Archived monograph: ${project.title}`,
    },
  });

  revalidatePath('/admin/projects');
  return { success: true };
}

export async function restoreProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: 'Project not found.' };
  if (project.createdById !== user.id && user.role !== 'ADMIN') return { error: 'Unauthorized.' };

  await prisma.project.update({ where: { id }, data: { status: 'DRAFT' } });

  await prisma.activity.create({
    data: {
      actorId: user.id,
      action: 'PROJECT_RESTORED',
      targetType: 'project',
      targetId: project.id,
      summary: `Restored monograph to draft: ${project.title}`,
    },
  });

  revalidatePath('/admin/projects');
  return { success: true };
}

export async function deleteProject(id: string) {
  const user = await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: 'Project not found.' };
  if (project.createdById !== user.id && user.role !== 'ADMIN') return { error: 'Unauthorized.' };

  await prisma.project.delete({ where: { id } });

  await prisma.activity.create({
    data: {
      actorId: user.id,
      action: 'PROJECT_DELETED',
      targetType: 'project',
      targetId: id,
      summary: `Deleted monograph: ${project.title}`,
    },
  });

  revalidatePath('/admin/projects');
  return { success: true };
}
