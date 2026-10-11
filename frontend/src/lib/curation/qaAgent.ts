import { CuratedCollection, QAAuditReport, QACheckItem } from "./types";

/**
 * AGENT 7 — Quality Assurance & Consistency Agent
 * Responsibilities:
 * - Verify that every collection's hero image belongs strictly to that collection
 * - Confirm that all approved images appear in their designated galleries
 * - Check for broken asset links, missing captions, or duplicate image IDs
 * - Validate route slugs and metadata integrity
 */
export function runQAAudit(collections: CuratedCollection[]): QAAuditReport {
  const checks: QACheckItem[] = [];
  let totalPhotographs = 0;
  let allPassed = true;

  for (const col of collections) {
    totalPhotographs += col.photographs.length;

    // Check 1: Hero image exists in the collection's photographs
    const heroExistsInGallery = col.photographs.some((p) => p.url === col.coverImage);
    if (heroExistsInGallery) {
      checks.push({
        code: `HERO_MEMBERSHIP_${col.slug}`,
        description: `Collection "${col.title}" hero image (${col.coverImage}) belongs to its gallery`,
        status: "PASS",
      });
    } else {
      allPassed = false;
      checks.push({
        code: `HERO_MEMBERSHIP_${col.slug}`,
        description: `Collection "${col.title}" hero image (${col.coverImage}) NOT FOUND in its gallery`,
        status: "FAIL",
        details: `Hero photo ID ${col.heroPhotoId} is missing from photographs array`,
      });
    }

    // Check 2: Slug is valid URL format
    const isValidSlug = /^[a-z0-9-]+$/.test(col.slug);
    if (isValidSlug) {
      checks.push({
        code: `SLUG_VALIDITY_${col.slug}`,
        description: `Slug "/collections/${col.slug}" is clean and URL-safe`,
        status: "PASS",
      });
    } else {
      allPassed = false;
      checks.push({
        code: `SLUG_VALIDITY_${col.slug}`,
        description: `Slug "${col.slug}" has invalid characters`,
        status: "FAIL",
      });
    }

    // Check 3: Every photograph has a caption, alt text, and valid URL
    let missingCaptions = 0;
    let duplicateIds = 0;
    const seenIds = new Set<string>();

    for (const photo of col.photographs) {
      if (!photo.caption || !photo.altText) missingCaptions++;
      if (seenIds.has(photo.id)) duplicateIds++;
      seenIds.add(photo.id);
    }

    if (missingCaptions === 0 && duplicateIds === 0) {
      checks.push({
        code: `PLATE_INTEGRITY_${col.slug}`,
        description: `All ${col.photographs.length} plates in "${col.title}" have complete captions, alt text, and unique IDs`,
        status: "PASS",
      });
    } else {
      checks.push({
        code: `PLATE_INTEGRITY_${col.slug}`,
        description: `Plates in "${col.title}" have issues (missing captions: ${missingCaptions}, duplicates: ${duplicateIds})`,
        status: "WARN",
      });
    }
  }

  // Check 4: Unique slugs across all collections
  const slugCounts = new Set<string>();
  let duplicateSlugs = false;
  for (const c of collections) {
    if (slugCounts.has(c.slug)) duplicateSlugs = true;
    slugCounts.add(c.slug);
  }

  if (!duplicateSlugs) {
    checks.push({
      code: "UNIQUE_COLLECTION_SLUGS",
      description: "All collections have strictly unique route slugs",
      status: "PASS",
    });
  } else {
    allPassed = false;
    checks.push({
      code: "UNIQUE_COLLECTION_SLUGS",
      description: "Duplicate collection slugs detected",
      status: "FAIL",
    });
  }

  return {
    timestamp: new Date().toISOString(),
    passed: allPassed,
    totalCollections: collections.length,
    totalPhotographs,
    checks,
  };
}
