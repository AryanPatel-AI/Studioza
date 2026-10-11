import { NextResponse } from "next/server";
import { getCuratedCollections } from "@/lib/curation/curationRegistry";

export async function GET() {
  const collections = getCuratedCollections();
  const publishedOnly = collections.filter((c) => c.status === "PUBLISHED");
  return NextResponse.json({
    success: true,
    count: publishedOnly.length,
    collections: publishedOnly,
  });
}
