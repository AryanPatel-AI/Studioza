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
      subtitle: "Architectural monograph documenting ancient monolithic temple spires and sacred deodar cedar groves.",
      intro: "Centuries-old stone Nagara shikharas, sacred deodar cedar forests, and ancient Kumaon temple architecture nestled at 1,870 meters elevation in Almora, Uttarakhand.",
      curatorialStory:
        "Nestled in the narrow Jataganga valley at an elevation of 1,870 meters, Jageshwar Dham comprises over a hundred ancient stone temples sheltered by towering Himalayan deodars. Our monograph isolates the chiselled Nagara spires, stone tiers, and weathered cedar shrines, capturing the mystical interplay between ancient sacred stonework and high-altitude mountain light.",
      specificCaptions: {
        "21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg": {
          caption: "Jata Ganga riverbed flowing beneath ancient stone temple sanctums and towering deodar canopy at Jageshwar Dham.",
          altText: "Jata Ganga riverbed and ancient stone temple compound at Jageshwar Dham, Almora, Uttarakhand",
          tags: ["Jageshwar Dham", "Almora", "Uttarakhand", "Jata Ganga", "Nagara Architecture"],
        },
        "temple-shikhara-oleander.jpg": {
          caption: "Sacred stone temple shikhara crowned with protective cedar timber canopy amid ancient deodar groves at Jageshwar Dham.",
          altText: "Jageshwar Dham ancient stone shikhara temple with protective timber canopy and deodar cedar forest",
          tags: ["Jageshwar Dham", "Almora", "Uttarakhand", "Nagara Architecture", "Himalayas"],
        },
        "27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg": {
          caption: "Colossal Parmarth Niketan Shiva murti seated in serene meditation above the holy Ganga waters in Rishikesh.",
          altText: "Parmarth Niketan Shiva murti rising above the Ganga river in Rishikesh, Uttarakhand",
          tags: ["Rishikesh", "Uttarakhand", "Ganga", "Parmarth Niketan", "Shiva"],
        },
        "IMG_0017.jpg": {
          caption: "Quiet contemplation along the boulder-strewn banks of the holy Ganga river.",
          altText: "Riverbank portrait along the Himalayan river in Uttarakhand",
          tags: ["Rishikesh", "Uttarakhand", "Riverbank", "Himalayas", "Ganga"],
        },
        "IMG_0294.jpg": {
          caption: "Pine-covered mountain valley ridges and alpine twilight en route to Jageshwar Dham in Almora.",
          altText: "Almora pine ridge valleys during blue hour twilight, Uttarakhand",
          tags: ["Almora", "Pine Valleys", "Uttarakhand", "Blue Hour"],
        },
        "IMG_0090.jpg": {
          caption: "Nocturnal alpine sky and celestial canopy over the forested Himalayan foothills.",
          altText: "Night sky over forested Himalayan hills in Uttarakhand",
          tags: ["Uttarakhand", "Night Sky", "Himalayas"],
        },
      },
    },
    "loc-chittor": {
      title: "Chittorgarh Fort Monoliths",
      subtitle: "Medium-format architectural plates examining the 7th-century bastion walls, Samaddhisvara temple, and Vijay Stambha.",
      intro: "Monolithic stone shikharas, towering victory monuments, and ancient bastion ramparts spanning the 700-acre UNESCO fortress plateau in Mewar.",
      curatorialStory:
        "Rising 180 meters above the southern plains of Mewar, Chittorgarh Fort preserves some of India's most monumental sacred stone carvings. Our monograph focuses on the chiselled friezes of the Samaddhisvara temple and the vertical geometry of Vijay Stambha, documenting stone masonry weathered across a millennium of battles and monsoons.",
      specificCaptions: {
        "aryan-patel-temple-monochrome.jpg": {
          caption: "Samaddhisvara temple monochrome architectural study observed by Aryan Patel at Chittor Fort.",
          altText: "Monochrome architectural study of carved stone Samaddhisvara temple at Chittorgarh Fort",
          tags: ["Chittor Fort", "Samaddhisvara", "Monochrome", "Rajasthan", "Medium Format"],
        },
        "20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg": {
          caption: "Samaddhisvara temple shikhara vertical elevation showcasing deeply carved stone tiers.",
          altText: "Carved stone shikhara at Chittorgarh Fort",
          tags: ["Chittor Fort", "Shikhara", "Mewar", "Stone Carving"],
        },
        "29BF8584-B26F-4208-8B45-C9DB235E8477_1_105_c.jpeg": {
          caption: "Vijay Stambha (Tower of Victory) rising nine tiers above the Chittorgarh bastion plateau.",
          altText: "Vijay Stambha nine-story victory tower at Chittorgarh Fort",
          tags: ["Chittor Fort", "Vijay Stambha", "Mewar", "Victory Tower"],
        },
      },
    },
    "loc-jaigarh": {
      title: "Jaigarh & Nahargarh Citadels",
      subtitle: "Topographic elevation study examining military architecture crowned by monsoon cloud cover over the Aravalli range.",
      intro: "A rigorous topographic monograph commissioned to document the rugged masonry bastions crowning Cheel ka Teela and the Nahargarh ridgeline at 648 meters elevation.",
      curatorialStory:
        "Perched high above Amber, Jaigarh and Nahargarh were built for defensive vigilance and strategic command. Documenting these fortresses required waiting for rare overcast monsoon skies to diffuse the harsh desert contrast. The resulting medium-format plates isolate the Diwa Burj watchtower against brooding slate skies, rendering centuries of weathered dry-stone architecture with clinical clarity.",
      specificCaptions: {
        "hilltop-fortress-crest.jpg": {
          caption: "Jaigarh Fort and Diwa Burj watchtower rising across the mountain ridge, captured from Amber Fort.",
          altText: "Jaigarh Fort hilltop crest and stone watchtower overlooking the Aravalli range",
          tags: ["Jaigarh Fort", "Amber Fort", "Aravalli", "Military Architecture"],
        },
        "fort-ramparts-overlook.jpg": {
          caption: "Stepped ramparts contouring the natural geological ridgeline at Nahargarh Fort.",
          altText: "Stepped stone fort ramparts winding along the desert mountain ridge at Nahargarh",
          tags: ["Nahargarh Fort", "Ramparts", "Topography", "Jaipur"],
        },
        "palace-arch-courtyard.jpg": {
          caption: "Deep chiaroscuro through monumental Rajasthani masonry into the inner courtyard at Nahargarh Fort.",
          altText: "Historic palace archway framing the sunlight in a carved stone courtyard at Nahargarh",
          tags: ["Nahargarh Fort", "Palace", "Chiaroscuro", "Jaipur"],
        },
      },
    },
    "loc-sheesh-mahal": {
      title: "Amber Fort & Sheesh Mahal",
      subtitle: "A royal study in frescoed gateways, cusped marble portals, and Venetian convex mirror ceilings.",
      intro: "Ganesh Pol frescoed gateways, Diwan-e-Aam stone pavilions, and thousands of convex glass mirrors reflecting indirect desert light.",
      curatorialStory:
        "In the royal palace of Amber, artisans combined carved Rajput cusped portals with intricate Mughal garden geometries. In the Hall of Private Audience (Sheesh Mahal), thousands of silvered convex glass pieces were inlaid into plaster to turn single flames into celestial constellations. Our monograph documents both the grand public plinths and the private mirror chambers with medium-format precision.",
      specificCaptions: {
        "CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg": {
          caption: "Ganesh Pol grand ceremonial entrance adorned with frescoed arches, deity murals, and brass-studded gates.",
          altText: "Ganesh Pol arched entrance with intricate frescoes at Amber Fort",
          tags: ["Amber Fort", "Ganesh Pol", "Jaipur", "Frescoes", "Rajput Architecture"],
        },
        "135920DC-BB0A-45FD-BAC4-1E38814EB8C4_1_105_c.jpeg": {
          caption: "Intricate cusped marble portals and floral stucco jali screens leading into Sheesh Mahal (Hall of Mirrors).",
          altText: "Cusped arches and intricate marble jali screens at Amber Fort Sheesh Mahal",
          tags: ["Amber Fort", "Sheesh Mahal", "Jaipur", "Marble Portal"],
        },
        "6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg": {
          caption: "Elevated perspective overlooking Sheesh Mahal courtyard and the geometric garden channels of Aram Bagh.",
          altText: "Amber Fort Sheesh Mahal pavilion and Aram Bagh garden courtyard in Jaipur",
          tags: ["Amber Fort", "Sheesh Mahal", "Aram Bagh", "Jaipur"],
        },
        "100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg": {
          caption: "Quiet sitting on the elevated plinth of Diwan-e-Aam courtyard pavilion at Amber Fort.",
          altText: "Aryan Patel seated on the stone plinth of Diwan-e-Aam pavilion at Amber Fort",
          tags: ["Amber Fort", "Diwan-e-Aam", "Jaipur", "Aryan Patel", "Sitting"],
        },
        "4F0FBF52-AF40-4ED4-A67F-43E3D73BD6E3_1_105_c.jpeg": {
          caption: "Sukh Niwas arched corridor framed by receding cusped cusps and cool marble columns.",
          altText: "Aryan Patel walking beneath cusped marble arches at Amber Fort",
          tags: ["Amber Fort", "Sukh Niwas", "Jaipur", "Arches"],
        },
        "FBC766B9-FE17-4A48-B8DD-60E95DB12B51_1_105_c.jpeg": {
          caption: "Relaxed sitting along the carved marble balustrade overlooking Kesar Kyari garden and Maota Lake.",
          altText: "Aryan Patel seated relaxed on the marble balustrade overlooking Amber Fort gardens",
          tags: ["Amber Fort", "Kesar Kyari", "Jaipur", "Balustrade", "Sitting"],
        },
        "400A501C-4442-4203-A37A-C6ECC2EBF54B_1_105_c.jpeg": {
          caption: "Reflected portrait standing before the intricate mirror mosaic and glass stucco walls of Sheesh Mahal.",
          altText: "Portrait standing in front of mirror mosaic walls at Sheesh Mahal, Amber Fort",
          tags: ["Amber Fort", "Sheesh Mahal", "Mirror Mosaic", "Jaipur"],
        },
      },
    },
    "loc-bareilly": {
      title: "Bareilly Haveli & Northern Plains Heritage",
      subtitle: "Architectural and heirloom study documenting Bareilly havelis, jali courtyards, terraces, and Diwali nocturnes.",
      intro: "Traditional brickwork cornices, golden jali shadowplay, and ancestral domestic courtyards in Uttar Pradesh.",
      curatorialStory:
        "An intimate architectural monograph centered in Bareilly, Uttar Pradesh. Documenting historic haveli compounds, sun-drenched terrace parapets, and traditional water courts, this series captures the quiet, enduring grace of Northern Indian domestic architecture.",
      specificCaptions: {
        "A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg": {
          caption: "Sunlit overview of historic Bareilly architectural compound and brick cornices in morning golden hour.",
          altText: "Sunlit overview of historic Bareilly haveli compound and brick cornices",
          tags: ["Bareilly", "Uttar Pradesh", "Domestic Architecture", "Golden Hour"],
        },
        "5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg": {
          caption: "Diwali evening celebration illuminated by pyrotechnics and festival courtyard lights in Bareilly.",
          altText: "Diwali festival celebration and fireworks in Bareilly, Uttar Pradesh",
          tags: ["Bareilly", "Diwali", "Festival", "Nocturne"],
        },
      },
    },
    "loc-dal-lake": {
      title: "Dal Lake & Kashmir Waters",
      subtitle: "A study in high mountain reflections, dawn boat crossings, and Himalayan stillness.",
      intro: "Dawn mist lifting over mirror-like waters, wooden shikaras, and distant Pir Panjal peaks in Srinagar and Sonamarg.",
      curatorialStory:
        "Slow observation at sunrise on Dal Lake. Rather than capturing tourist postcards, our view camera remained fixed on the quiet dialogue between water, rising vapor, and traditional timber houseboats as day broke over the Kashmir valley.",
      specificCaptions: {
        "Dal_Lake.jpeg": {
          caption: "Tranquil mist lifting over water during sunrise expedition on Dal Lake.",
          altText: "Early morning mountain mist rising over the tranquil waters of Dal Lake in Srinagar",
          tags: ["Dal Lake", "Srinagar", "Kashmir", "Dawn", "Waterscape"],
        },
        "IMG_0386.jpg": {
          caption: "Glacial valley sitting amid the pine slopes and mountain meadows of Sonamarg.",
          altText: "Valley portrait sitting in Sonamarg, Jammu & Kashmir",
          tags: ["Sonamarg", "Kashmir", "Himalayas", "Glacial Valley"],
        },
        "IMG_0219.jpg": {
          caption: "Rural passage through the foothills and orchards near Pulwama.",
          altText: "Scenic rural passage near Pulwama, Jammu & Kashmir",
          tags: ["Pulwama", "Kashmir", "Foothills"],
        },
        "IMG20250714135723.jpg": {
          caption: "Chinar tree canopy and Dal Lake shoreline in Srinagar.",
          altText: "Srinagar shoreline and chinar tree canopy in Kashmir",
          tags: ["Srinagar", "Kashmir", "Chinar Canopy"],
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
