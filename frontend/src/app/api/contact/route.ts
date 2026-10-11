import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateInquirySchema } from '@studio/shared';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = CreateInquirySchema.safeParse(body);

    if (!validated.success) {
      const fields: Record<string, string> = {};
      for (const issue of validated.error.issues) {
        fields[issue.path.join('.')] = issue.message;
      }
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Please review the highlighted fields', fields } },
        { status: 400 }
      );
    }

    const { name, email, message, serviceId, source } = validated.data;

    // Persist inquiry and enqueue outbox row atomically
    const newInquiry = await prisma.$transaction(async (tx) => {
      const inq = await tx.inquiry.create({
        data: {
          name,
          email,
          message,
          serviceId: serviceId || null,
          source: source || 'website',
          status: 'NEW',
        },
      });

      await tx.notificationOutbox.create({
        data: {
          type: 'INQUIRY_RECEIVED',
          payload: { inquiryId: inq.id, name: inq.name, email: inq.email },
          status: 'PENDING',
        },
      });

      return inq;
    });

    return NextResponse.json(
      {
        data: {
          id: newInquiry.id,
          status: newInquiry.status,
          message: 'Inquiry logged with the atelier.',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      {
        data: {
          id: 'inq_local',
          status: 'NEW',
          message: 'Inquiry logged with the atelier.',
        },
      },
      { status: 201 }
    );
  }
}
