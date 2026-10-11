import {
  PhotoAsset,
  LocationCluster,
  CuratedCollection,
  CollectionPhotograph,
} from "./types";
import { HeroEvaluationResult } from "./heroQualityAgent";
import { EditorialDossier } from "./types";

/**
 * AGENT 5 — Editorial Collection Builder Agent
 * Responsibilities:
 * - Synthesizes the outputs of Ingestion, Grouping, Quality, and Caption agents
 * - Constructs complete publishable collection documents
 * - Ranks the gallery plates in an intentional visual narrative
 * - Preserves aspect ratios and technical exposure metadata
 */
export function runCollectionBuilder(
  assets: PhotoAsset[],
  clusters: LocationCluster[],
  heroEvaluations: Map<string, HeroEvaluationResult>,
  editorialDossiers: Map<string, EditorialDossier>
): CuratedCollection[] {
  const assetMap = new Map(assets.map((a) => [a.id, a]));
  const collections: CuratedCollection[] = [];

  for (const cluster of clusters) {
    const heroEval = heroEvaluations.get(cluster.id);
    const editorial = editorialDossiers.get(cluster.id);

    if (!heroEval || !editorial) continue;

    const heroAsset = assetMap.get(heroEval.selectedHeroId);
    if (!heroAsset) continue;

    // Gather all photos for this cluster
    const clusterPhotos: CollectionPhotograph[] = [];

    // The hero image always serves as Plate 01 / Cover
    const heroEditorial = editorial.items[heroAsset.id];
    clusterPhotos.push({
      id: heroAsset.id,
      url: heroAsset.url,
      caption: heroEditorial?.caption || `${cluster.locationName}: Master Cover Plate.`,
      altText: heroEditorial?.altText || `${cluster.locationName} master photograph`,
      aspectRatio: heroAsset.aspectRatio,
      isLandscape: heroAsset.isLandscape,
      hasHuman: heroAsset.hasHuman ?? false,
      width: heroAsset.width,
      height: heroAsset.height,
      camera: heroAsset.camera,
      exposure: heroAsset.exposure,
      order: 1,
      isCover: true,
    });

    // Sequence the remaining photographs in rhythmic order
    let orderIndex = 2;
    for (const photoId of cluster.photoIds) {
      if (photoId === heroAsset.id) continue;
      const asset = assetMap.get(photoId);
      if (!asset) continue;

      const itemMeta = editorial.items[photoId];
      clusterPhotos.push({
        id: asset.id,
        url: asset.url,
        caption: itemMeta?.caption || `${cluster.locationName}: Archival plate study.`,
        altText: itemMeta?.altText || `${cluster.locationName} photographic plate`,
        aspectRatio: asset.aspectRatio,
        isLandscape: asset.isLandscape,
        hasHuman: asset.hasHuman ?? false,
        width: asset.width,
        height: asset.height,
        camera: asset.camera,
        exposure: asset.exposure,
        order: orderIndex++,
        isCover: false,
      });
    }

    collections.push({
      id: cluster.id,
      slug: cluster.slug,
      title: editorial.title,
      subtitle: editorial.subtitle,
      location: cluster.locationName,
      region: cluster.region,
      category: cluster.category,
      year: "2026",
      coverImage: heroAsset.url,
      heroPhotoId: heroAsset.id,
      intro: editorial.intro,
      curatorialStory: editorial.curatorialStory,
      coordinates: cluster.coordinates,
      elevation: cluster.elevation,
      photographer: "Aryan Patel",
      client: "Archival Heritage Monograph",
      photographs: clusterPhotos,
      heroCandidates: heroEval.candidates,
      totalPhotos: clusterPhotos.length,
      status: "PUBLISHED",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return collections;
}
