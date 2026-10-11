import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/storage';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/tiff',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit (Section 25)

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Master photographic asset must not exceed 50 MB.' },
        { status: 413 }
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

    // Save master negative record into Media table
    const media = await prisma.media.create({
      data: {
        storageKey,
        mimeType: file.type,
        sizeBytes: file.size,
        status: 'READY',
        uploadedById: user.id,
        defaultAlt: file.name.replace(/\.[^/.]+$/, ''),
      },
    });

    await prisma.activity.create({
      data: {
        actorId: user.id,
        action: 'MEDIA_UPLOADED',
        targetType: 'media',
        targetId: media.id,
        summary: `Ingested master negative: ${media.storageKey}`,
      },
    });

    return NextResponse.json({ success: true, media: { ...media, url } });
  } catch (err: any) {
    console.error('Asset upload error:', err);
    return NextResponse.json({ error: 'Internal server error during upload.' }, { status: 500 });
  }
}
