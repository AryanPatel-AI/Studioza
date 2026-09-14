import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/storage";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId")?.toString() || null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type "${file.type}" is not supported.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { url, storageKey } = await uploadFile(buffer, file.name, file.type);

    const asset = await prisma.asset.create({
      data: {
        name: file.name,
        storageKey,
        mimeType: file.type,
        size: file.size,
        url,
        ownerId: user.id,
        projectId: projectId || null,
      },
    });

    // Record activity
    await prisma.activity.create({
      data: {
        projectId: projectId || null,
        userId: user.id,
        type: "ASSET_UPLOADED",
        metadata: JSON.stringify({ name: asset.name, size: asset.size, url: asset.url }),
      },
    });

    return NextResponse.json({ success: true, asset });
  } catch (err: any) {
    console.error("Asset upload error:", err);
    return NextResponse.json(
      { error: "Internal server error during upload." },
      { status: 500 }
    );
  }
}
