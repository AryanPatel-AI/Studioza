import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth/session';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const services = await prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { packages: true },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, startingRate } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const newService = await prisma.service.create({
      data: {
        name,
        slug,
        summary: description || name,
        startingRate: startingRate || (price ? parseInt(price, 10) : 500000),
        status: 'PUBLISHED',
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
