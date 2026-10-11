import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth/session';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, name, slug, intro, categoryId } = body;

    let targetCategoryId = categoryId;
    if (!targetCategoryId) {
      const defaultCategory = await prisma.category.findFirst();
      targetCategoryId = defaultCategory?.id;
    }

    if (!targetCategoryId) {
      const createdCategory = await prisma.category.create({
        data: { slug: 'monographs', name: 'Monographs' },
      });
      targetCategoryId = createdCategory.id;
    }

    const project = await prisma.project.create({
      data: {
        title: title || name,
        slug,
        intro: intro || '',
        categoryId: targetCategoryId,
        createdById: user.id,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
