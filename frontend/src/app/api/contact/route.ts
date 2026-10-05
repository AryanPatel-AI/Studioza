import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, budget, timeline, reference, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (message.length > 5000 || name.length > 200 || email.length > 200) {
      return NextResponse.json(
        { error: "Input exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        company: company || null,
        budget: budget || null,
        timeline: timeline || null,
        reference: reference || null,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
