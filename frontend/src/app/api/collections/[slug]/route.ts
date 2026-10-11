import { NextRequest, NextResponse } from "next/server";
import { getCuratedCollectionBySlug } from "@/lib/curation/curationRegistry";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const collection = getCuratedCollectionBySlug(slug);

  if (!collection) {
    return NextResponse.json(
      { success: false, error: "Collection not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    collection,
  });
}
