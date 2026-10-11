import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth/session';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const project = await prisma.project.findUnique({
      where: { id: resolvedParams.id },
      include: { images: true, category: true },
    });

    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const body = await req.json();
    const { title, name, slug, intro, location, year, status, seoDescription } = body;

    const project = await prisma.project.update({
      where: { id: resolvedParams.id },
      data: {
        ...((title || name) && { title: title || name }),
        ...(slug && { slug }),
        ...(intro !== undefined && { intro }),
        ...(location !== undefined && { location }),
        ...(status && { status }),
        ...(seoDescription !== undefined && { seoDescription }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    await prisma.project.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
