export interface PhotoAsset {
  id: string;
  filename: string;
  url: string;
  width: number;
  height: number;
  aspectRatio: string;
  isLandscape: boolean;
  hasHuman?: boolean;
  camera?: string;
  lens?: string;
  exposure?: string;
  capturedAt?: string;
  locationHint?: string;
  qualityScore: number;
  heroSuitabilityScore: number;
  selectionRationale?: string;
}

export interface LocationCluster {
  id: string;
  slug: string;
  locationName: string;
  region: string;
  country: string;
  category: "architecture" | "landscape" | "portraits" | "weddings" | "commercial";
  coordinates?: string;
  elevation?: string;
  confidence: number;
  photoIds: string[];
}

export interface HeroCandidate {
  photoId: string;
  url: string;
  score: number;
  sharpnessScore: number;
  resolutionScore: number;
  compositionScore: number;
  isRecommendedHero: boolean;
  rationale: string;
}

export interface EditorialItemMetadata {
  photoId: string;
  caption: string;
  altText: string;
  tags: string[];
}

export interface EditorialDossier {
  clusterId: string;
  title: string;
  subtitle: string;
  intro: string;
  curatorialStory: string;
  items: Record<string, EditorialItemMetadata>;
}

export interface CollectionPhotograph {
  id: string;
  url: string;
  caption: string;
  altText: string;
  aspectRatio: string;
  isLandscape: boolean;
  hasHuman?: boolean;
  width: number;
  height: number;
  camera?: string;
  exposure?: string;
  order: number;
  isCover: boolean;
}

export interface CuratedCollection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  region: string;
  category: "architecture" | "landscape" | "portraits" | "weddings" | "commercial";
  year: string;
  coverImage: string;
  heroPhotoId: string;
  intro: string;
  curatorialStory: string;
  coordinates?: string;
  elevation?: string;
  client?: string;
  photographer: string;
  photographs: CollectionPhotograph[];
  heroCandidates: HeroCandidate[];
  totalPhotos: number;
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: string;
  updatedAt: string;
}

export interface QACheckItem {
  code: string;
  description: string;
  status: "PASS" | "WARN" | "FAIL";
  details?: string;
}

export interface QAAuditReport {
  timestamp: string;
  passed: boolean;
  totalCollections: number;
  totalPhotographs: number;
  checks: QACheckItem[];
}
