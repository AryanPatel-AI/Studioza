import { PhotoAsset, LocationCluster, EditorialDossier } from "./types";

/**
 * AGENT 4 — Caption & Editorial Metadata Agent
 * Responsibilities:
 * - Generate professional captions for individual photographs based on confirmed location & visual content
 * - Formulate collection titles, subtitles, and curatorial introductions
 * - Author accessible alt text and search tags
 * - Maintain editorial voice consistency adhering to the Studioza style guide
 */
export function runEditorialCaptioning(
  assets: PhotoAsset[],
  clusters: LocationCluster[]
): Map<string, EditorialDossier> {
  const assetMap = new Map(assets.map((a) => [a.id, a]));
  const dossiers = new Map<string, EditorialDossier>();

  const clusterEditorialContent: Record<
    string,
    {
      title: string;
      subtitle: string;
      intro: string;
      curatorialStory: string;
      specificCaptions: Record<string, { caption: string; altText: string; tags: string[] }>;
    }
  > = {
    "loc-jageshwar": {
      title: "Jageshwar Dham Monoliths",
      subtitle: "Architectural monograph documenting ancient monolithic temple spires and deodar groves.",
      intro: "Centuries-old stone Nagara shikharas, sacred deodar cedar forests, and ancient Kumaon temple architecture nestled at 1,870 meters elevation.",
      curatorialStory:
        "Nestled in the narrow Jataganga valley at an elevation of 1,870 meters, Jageshwar Dham comprises over a hundred ancient stone temples sheltered by towering Himalayan deodars. Our monograph isolates the chiselled Nagara spires, stone tiers, and weathered cedar shrines, capturing the mystical interplay between ancient sacred stonework and high-altitude mountain light.",
      specificCaptions: {
        "temple-shikhara-oleander.jpg": {
          caption: "Sacred stone temple shikhara with traditional timber canopy against ancient deodar groves.",
          altText: "Jageshwar Dham ancient stone shikhara temple with blue protective timber canopy and deodar cedar forest",
          tags: ["Jageshwar Dham", "Almora", "Uttarakhand", "Nagara Architecture", "Himalayas"],
        },
        "aryan-patel-temple-monochrome.jpg": {
          caption: "Monolithic stone temple study observed by Aryan Patel.",
          altText: "Photographer observing monolithic temple shikhara at Jageshwar Dham",
          tags: ["Monochrome", "Architectural Study", "Jageshwar", "Medium Format"],
        },
        "CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg": {
          caption: "Vertical tier progression and carved deity reliefs of the ancient shikhara.",
          altText: "Carved stone tiers and relief sculptures of ancient temple spire",
          tags: ["Stone Relief", "Nagara Tier", "Jageshwar"],
        },
      },
    },
    "loc-jaigarh": {
      title: "Jaigarh Mountain Citadel",
      subtitle: "Cheel ka Teela elevation study examining military architecture crowned by monsoon cloud cover.",
      intro: "A rigorous topographic monograph commissioned to document the rugged masonry bastion crowning Cheel ka Teela at 648 meters elevation.",
      curatorialStory:
        "Perched high above Amber, Jaigarh Fort was built not for palace leisure, but for defensive vigilance. Documenting this fortress required waiting for rare overcast monsoon skies to diffuse the harsh desert contrast. The resulting medium-format plates isolate the Diwa Burj watchtower against brooding slate skies, rendering centuries of weathered dry-stone architecture with clinical clarity.",
      specificCaptions: {
        "hilltop-fortress-crest.jpg": {
          caption: "Diwa Burj watchtower rising into the monsoon storm front at 648 meters elevation.",
          altText: "Jaigarh Fort hilltop crest and stone watchtower overlooking the Aravalli range",
          tags: ["Jaigarh Fort", "Amber", "Aravalli", "Military Architecture", "Monsoon"],
        },
        "fort-ramparts-overlook.jpg": {
          caption: "Stepped ramparts contouring the natural geological ridgeline.",
          altText: "Stepped stone fort ramparts winding along the desert mountain ridge",
          tags: ["Ramparts", "Topography", "Jaigarh"],
        },
        "21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg": {
          caption: "Parapet vista overlooking the southern defensive perimeter bastions at dusk.",
          altText: "Wide stone parapet overlooking the valley basin and fortified bastions",
          tags: ["Parapet", "Fortress", "Desert Dusk"],
        },
      },
    },
    "loc-heritage": {
      title: "Royal Heritage Celebration",
      subtitle: "A multi-day union held within 300-year-old carved marble courtyards and lantern corridors.",
      intro: "Two families united over three days of quiet reverence and uninhibited celebration under the Rajasthan winter sky.",
      curatorialStory:
        "Every wedding has two rhythms: the ceremonial grandeur that commands the crowd, and the quiet glances exchanged in shadowy archways between rituals. Our commission was to bypass staged poses in favor of medium-format atmospheric truth. Using available morning light and soft evening tungsten lanterns, we documented the tactile weight of hand-woven gold Zardozi textiles, the sacred fire's rising smoke, and the deep emotional resonance of ancestral blessings.",
      specificCaptions: {
        "palace-arch-courtyard.jpg": {
          caption: "Deep chiaroscuro through monumental Rajasthani masonry into the central courtyard.",
          altText: "Historic palace archway framing the sunlight in a carved stone courtyard",
          tags: ["Jaipur", "Palace", "Chiaroscuro", "Heritage Architecture"],
        },
        "aryan-patel-pillared-court.jpg": {
          caption: "Pillared corridor observation during morning rituals.",
          altText: "Photographer documenting quiet rituals along an ornate stone pillared court",
          tags: ["Pillared Court", "Ceremony", "Available Light"],
        },
        "ochre-palace-courtyard-scale.jpg": {
          caption: "Courtyard gathering under early winter sun.",
          altText: "Warm terracotta palace courtyard illuminated by golden winter sunlight",
          tags: ["Courtyard", "Terracotta", "Golden Hour"],
        },
      },
    },
    "loc-sheesh-mahal": {
      title: "Echoes in Convex Glass",
      subtitle: "A study in distorted illumination using thousands of imported Venetian mirror facets.",
      intro: "An intimate portrait exploration examining how fractured convex mirrors decompose single portraits into infinite shimmering facets.",
      curatorialStory:
        "In the Hall of Private Audience, glass artisans laid thousands of silvered convex glass pieces into ceiling and wall plasters so a single candle would look like a starfield. Here we positioned our subject against natural indirect light, using an 80mm lens stopped down to preserve both the human contour and the crystalline complexity of the surroundings.",
      specificCaptions: {
        "aryan-patel-sheesh-mahal.jpg": {
          caption: "Reflected subject surrounded by thousands of miniature convex mirror facets.",
          altText: "Portrait subject reflected in complex convex glass ceiling mosaic at Sheesh Mahal",
          tags: ["Sheesh Mahal", "Convex Mirrors", "Amer Fort", "Portraiture"],
        },
        "192036BF-B1BB-483F-AFD7-B9F96EBB69BA.jpg": {
          caption: "Amber sunlight piercing antique lattice work and silvered mirror plaster.",
          altText: "Intricate geometric jali screen casting geometric light across mirror glass",
          tags: ["Lattice Work", "Shadowplay", "Glass Mosaic"],
        },
      },
    },
    "loc-bareilly": {
      title: "Bareilly Haveli & Northern Plains Heritage",
      subtitle: "Architectural and heirloom study documenting Bareilly havelis, jali courtyards, and terraces.",
      intro: "Traditional brickwork cornices, golden jali shadowplay, and ancestral domestic courtyards in Uttar Pradesh.",
      curatorialStory:
        "An intimate architectural monograph centered in Bareilly, Uttar Pradesh. Documenting historic haveli compounds, sun-drenched terrace parapets, and traditional water courts, this series captures the quiet, enduring grace of Northern Indian domestic architecture.",
      specificCaptions: {
        "A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg": {
          caption: "Historic architectural compound in morning golden light.",
          altText: "Sunlit overview of historic Bareilly haveli compound and brick cornices",
          tags: ["Bareilly", "Uttar Pradesh", "Domestic Architecture", "Golden Hour"],
        },
      },
    },
    "loc-dal-lake": {
      title: "Dal Lake & Kashmir Waters",
      subtitle: "A study in high mountain reflections, dawn boat crossings, and Himalayan stillness.",
      intro: "Dawn mist lifting over mirror-like waters, wooden shikaras, and distant Pir Panjal peaks.",
      curatorialStory:
        "Slow observation at sunrise on Dal Lake. Rather than capturing tourist postcards, our view camera remained fixed on the quiet dialogue between water, rising vapor, and traditional timber houseboats as day broke over the Kashmir valley.",
      specificCaptions: {
        "Dal_Lake.jpeg": {
          caption: "Tranquil mist lifting over water during sunrise sitting.",
          altText: "Early morning mountain mist rising over the tranquil waters of Dal Lake",
          tags: ["Dal Lake", "Srinagar", "Kashmir", "Dawn", "Waterscape"],
        },
      },
    },
  };

  for (const cluster of clusters) {
    const clusterDef = clusterEditorialContent[cluster.id] || {
      title: cluster.locationName,
      subtitle: `${cluster.region} photographic survey.`,
      intro: `Photographic monograph documenting ${cluster.locationName}.`,
      curatorialStory: `Archival photographic fieldwork conducted in ${cluster.region}.`,
      specificCaptions: {},
    };

    const items: Record<string, { photoId: string; caption: string; altText: string; tags: string[] }> = {};

    for (const photoId of cluster.photoIds) {
      const asset = assetMap.get(photoId);
      if (!asset) continue;

      const override = clusterDef.specificCaptions[asset.filename];

      items[photoId] = {
        photoId,
        caption: override?.caption || `${cluster.locationName}: Archival plate study (${asset.aspectRatio}).`,
        altText: override?.altText || `${cluster.locationName} photographic plate, ${cluster.region}`,
        tags: override?.tags || [cluster.locationName, cluster.region, cluster.category],
      };
    }

    dossiers.set(cluster.id, {
      clusterId: cluster.id,
      title: clusterDef.title,
      subtitle: clusterDef.subtitle,
      intro: clusterDef.intro,
      curatorialStory: clusterDef.curatorialStory,
      items,
    });
  }

  return dossiers;
}
