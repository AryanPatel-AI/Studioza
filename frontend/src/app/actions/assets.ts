"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { deleteFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function deleteAsset(assetId: string) {
  try {
    const user = await requireAuth();

    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return { error: "Asset not found." };
    }

    if (asset.ownerId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized." };
    }

    // Delete underlying file
    await deleteFile(asset.storageKey);

    // Delete database record
    await prisma.asset.delete({
      where: { id: assetId },
    });

    // Record activity
    await prisma.activity.create({
      data: {
        projectId: asset.projectId,
        userId: user.id,
        type: "ASSET_DELETED",
        metadata: JSON.stringify({ name: asset.name }),
      },
    });

    revalidatePath("/assets");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("deleteAsset error:", err);
    return { error: "Failed to delete asset." };
  }
}
