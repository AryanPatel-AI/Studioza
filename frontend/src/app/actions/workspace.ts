'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function saveProjectContent(projectId: string, contentJson: string) {
  try {
    const user = await requireAuth();

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return { error: 'Project not found.' };
    if (project.createdById !== user.id && user.role !== 'ADMIN') {
      return { error: 'Unauthorized to edit this project.' };
    }

    let parsedNarrative: any = null;
    try {
      parsedNarrative = JSON.parse(contentJson);
    } catch {
      return { error: 'Invalid content format.' };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { narrative: parsedNarrative },
    });

    await prisma.activity.create({
      data: {
        actorId: user.id,
        action: 'PROJECT_UPDATED',
        targetType: 'project',
        targetId: project.id,
        summary: `Updated monograph content: ${project.title}`,
      },
    });

    revalidatePath(`/project/${project.slug}`);
    return { success: true, updatedAt: updated.updatedAt };
  } catch (err: any) {
    console.error('saveProjectContent error:', err);
    return { error: 'Failed to save project content.' };
  }
}
