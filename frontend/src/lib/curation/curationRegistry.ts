import { runImageIngestion } from "./ingestionAgent";
import { runLocationGrouping } from "./locationGroupingAgent";
import { runHeroQualitySelection } from "./heroQualityAgent";
import { runEditorialCaptioning } from "./editorialCaptionAgent";
import { runCollectionBuilder } from "./collectionBuilderAgent";
import { runQAAudit } from "./qaAgent";
import { CuratedCollection, QAAuditReport } from "./types";

interface CurationPipelineRun {
  runAt: string;
  totalAssetsIngested: number;
  totalClustersFound: number;
  collections: CuratedCollection[];
  auditReport: QAAuditReport;
}

// In-memory persistent state across the server lifecycle
let activeRun: CurationPipelineRun | null = null;

/**
 * Execute the full multi-agent curation pipeline
 */
export function executeCurationPipeline(): CurationPipelineRun {
  // 1. Agent 1: Image Ingestion
  const assets = runImageIngestion();

  // 2. Agent 2: Location & Photoshoot Grouping
  const clusters = runLocationGrouping(assets);

  // 3. Agent 3: Image Quality & Hero Selection
  const heroEvals = runHeroQualitySelection(assets, clusters);

  // 4. Agent 4: Caption & Editorial Metadata
  const editorialDossiers = runEditorialCaptioning(assets, clusters);

  // 5. Agent 5: Editorial Collection Builder
  const collections = runCollectionBuilder(assets, clusters, heroEvals, editorialDossiers);

  // 6. Agent 7: QA & Consistency Audit
  const auditReport = runQAAudit(collections);

  activeRun = {
    runAt: new Date().toISOString(),
    totalAssetsIngested: assets.length,
    totalClustersFound: clusters.length,
    collections,
    auditReport,
  };

  return activeRun;
}

/**
 * Retrieve the current active collections (auto-initializing if needed)
 */
export function getCuratedCollections(): CuratedCollection[] {
  if (!activeRun) {
    executeCurationPipeline();
  }
  return activeRun!.collections;
}

const SLUG_ALIASES: Record<string, string> = {
  "chittorgarh-citadel": "jageshwar-dham",
  "sheesh-mahal-portraits": "sheesh-mahal",
  "estate-monograph": "bareilly-heritage",
  "lake-pichola": "dal-lake-monograph",
};

/**
 * Retrieve a single collection by slug (supports historical aliases)
 */
export function getCuratedCollectionBySlug(slug: string): CuratedCollection | undefined {
  const collections = getCuratedCollections();
  const normalizedSlug = SLUG_ALIASES[slug] || slug;
  return collections.find((c) => c.slug === normalizedSlug || c.slug === slug);
}

/**
 * Retrieve the latest QA audit report
 */
export function getLatestAuditReport(): QAAuditReport {
  if (!activeRun) {
    executeCurationPipeline();
  }
  return activeRun!.auditReport;
}

/**
 * Admin override: Manually select a different hero cover image for a collection
 */
export function overrideHeroImage(collectionId: string, newPhotoId: string): CuratedCollection | null {
  const collections = getCuratedCollections();
  const collection = collections.find((c) => c.id === collectionId || c.slug === collectionId);
  if (!collection) return null;

  const targetPhoto = collection.photographs.find((p) => p.id === newPhotoId);
  if (!targetPhoto) return null;

  // Demote previous cover
  for (const p of collection.photographs) {
    p.isCover = false;
  }

  // Promote new cover
  targetPhoto.isCover = true;
  collection.coverImage = targetPhoto.url;
  collection.heroPhotoId = targetPhoto.id;

  // Move promoted cover to plate order 1
  collection.photographs = [
    targetPhoto,
    ...collection.photographs.filter((p) => p.id !== targetPhoto.id).map((p, idx) => ({
      ...p,
      order: idx + 2,
    })),
  ];

  collection.updatedAt = new Date().toISOString();

  // Re-run QA audit to confirm integrity
  activeRun!.auditReport = runQAAudit(activeRun!.collections);

  return collection;
}

/**
 * Admin override: Update collection publishing status
 */
export function setCollectionStatus(
  collectionId: string,
  status: "DRAFT" | "PUBLISHED"
): CuratedCollection | null {
  const collections = getCuratedCollections();
  const collection = collections.find((c) => c.id === collectionId || c.slug === collectionId);
  if (!collection) return null;

  collection.status = status;
  collection.updatedAt = new Date().toISOString();
  return collection;
}
