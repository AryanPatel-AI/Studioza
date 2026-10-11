'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function deleteAsset(assetId: string) {
  try {
    const user = await requireAuth();

    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
      include: { media: true },
    });
    if (!asset) return { error: 'Asset not found.' };

    if (user.role !== 'ADMIN') return { error: 'Unauthorized.' };

    await prisma.asset.delete({ where: { id: assetId } });

    await prisma.activity.create({
      data: {
        actorId: user.id,
        action: 'ASSET_DELETED',
        targetType: 'asset',
        targetId: assetId,
        summary: `Deleted rendition variant ${asset.variant}`,
      },
    });

    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    console.error('deleteAsset error:', err);
    return { error: 'Failed to delete asset rendition.' };
  }
}
