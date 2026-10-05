import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth/session";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getSessionUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedInquiry);
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
