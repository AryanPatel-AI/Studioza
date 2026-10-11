import { NextRequest, NextResponse } from "next/server";
import {
  getCuratedCollections,
  executeCurationPipeline,
  getLatestAuditReport,
  overrideHeroImage,
  setCollectionStatus,
} from "@/lib/curation/curationRegistry";

export async function GET() {
  const collections = getCuratedCollections();
  const auditReport = getLatestAuditReport();

  return NextResponse.json({
    success: true,
    collections,
    auditReport,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, collectionId, photoId, status } = body;

    if (action === "REPROCESS") {
      const runResult = executeCurationPipeline();
      return NextResponse.json({
        success: true,
        message: "Multi-agent curation pipeline executed successfully",
        data: runResult,
      });
    }

    if (action === "OVERRIDE_HERO") {
      if (!collectionId || !photoId) {
        return NextResponse.json(
          { success: false, error: "collectionId and photoId are required" },
          { status: 400 }
        );
      }
      const updated = overrideHeroImage(collectionId, photoId);
      return NextResponse.json({
        success: true,
        message: "Hero cover image overridden successfully",
        collection: updated,
      });
    }

    if (action === "SET_STATUS") {
      if (!collectionId || !status) {
        return NextResponse.json(
          { success: false, error: "collectionId and status are required" },
          { status: 400 }
        );
      }
      const updated = setCollectionStatus(collectionId, status);
      return NextResponse.json({
        success: true,
        message: "Status updated successfully",
        collection: updated,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
