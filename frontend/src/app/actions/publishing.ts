'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function publishProject(projectId: string) {
  try {
    const user = await requireAuth();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });
    if (!project) return { error: 'Project not found.' };
    if (project.createdById !== user.id && user.role !== 'ADMIN') {
      return { error: 'Unauthorized.' };
    }
    if (!project.title || !project.slug) {
      return { error: 'Project requires a title and slug before publishing.' };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });

    await prisma.activity.create({
      data: {
        actorId: user.id,
        action: 'PROJECT_PUBLISHED',
        targetType: 'project',
        targetId: project.id,
        summary: `Published monograph: ${project.title}`,
      },
    });

    revalidatePath(`/project/${updated.slug}`);
    revalidatePath('/portfolio');

    return { success: true, slug: updated.slug, publishedAt: updated.publishedAt };
  } catch (err: any) {
    console.error('publishProject error:', err);
    return { error: 'An unexpected error occurred during publishing.' };
  }
}

export async function unpublishProject(projectId: string) {
  try {
    const user = await requireAuth();

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return { error: 'Project not found.' };
    if (project.createdById !== user.id && user.role !== 'ADMIN') {
      return { error: 'Unauthorized.' };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { status: 'DRAFT' },
    });

    await prisma.activity.create({
      data: {
        actorId: user.id,
        action: 'PROJECT_UNPUBLISHED',
        targetType: 'project',
        targetId: project.id,
        summary: `Reverted monograph to draft: ${project.title}`,
      },
    });

    revalidatePath(`/project/${updated.slug}`);
    revalidatePath('/portfolio');

    return { success: true, slug: updated.slug };
  } catch (err: any) {
    console.error('unpublishProject error:', err);
    return { error: 'An unexpected error occurred while unpublishing.' };
  }
}
