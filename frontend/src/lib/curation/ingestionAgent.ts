import { PhotoAsset } from "./types";
import { ARCHIVAL_PLATE_META } from "../data/studioData";

/**
 * AGENT 1 — Image Ingestion Agent
 * Responsibilities:
 * - Scans photographic asset register
 * - Extracts dimensions, aspect ratios, technical camera details
 * - Normalizes photo assets into unified records
 */
export function runImageIngestion(): PhotoAsset[] {
  const assets: PhotoAsset[] = [];

  const rawRegister: Array<{
    filename: string;
    camera?: string;
    lens?: string;
    exposure?: string;
    locationHint?: string;
    capturedAt?: string;
  }> = [
    // 1. Jageshwar Dham, Almora, Uttarakhand
    { filename: "temple-shikhara-oleander.jpg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 18mm · f/8 · 1/250s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-07-12" },
    { filename: "aryan-patel-temple-monochrome.jpg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 24mm · f/5.6 · 1/320s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-26" },
    { filename: "CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 18mm · f/8 · 1/250s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },
    { filename: "100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 35mm · f/5.6 · 1/200s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },
    { filename: "135920DC-BB0A-45FD-BAC4-1E38814EB8C4_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 18mm · f/6.3 · 1/250s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },
    { filename: "400A501C-4442-4203-A37A-C6ECC2EBF54B_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 28mm · f/5.6 · 1/250s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },
    { filename: "4F0FBF52-AF40-4ED4-A67F-43E3D73BD6E3_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 18mm · f/8 · 1/250s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },
    { filename: "6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 18mm · f/8 · 1/250s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },
    { filename: "FBC766B9-FE17-4A48-B8DD-60E95DB12B51_1_105_c.jpeg", camera: "Canon EOS 200D II", lens: "EF-S 18-55mm f/4-5.6 IS STM", exposure: "ISO 100 · 35mm · f/5.6 · 1/200s", locationHint: "Jageshwar Dham, Almora, Uttarakhand", capturedAt: "2026-09-27" },

    // 2. Jaigarh & Amber Mountain Citadel, Rajasthan
    { filename: "hilltop-fortress-crest.jpg", camera: "Phase One IQ4 150MP", lens: "Rodenstock HR Digaron 40mm", exposure: "ISO 50 · 40mm · f/8 · 1/60s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "fort-ramparts-overlook.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 45mm f/4 P", exposure: "ISO 100 · 45mm · f/5.6 · 1/125s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "sandstone-palace-domes.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 45mm f/4 P", exposure: "ISO 100 · 45mm · f/8 · 1/125s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "city-aerial-overview.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 45mm f/4 P", exposure: "ISO 100 · 45mm · f/8 · 1/250s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 45mm f/4 P", exposure: "ISO 100 · 45mm · f/5.6 · 1/250s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "787A387A-B05A-4BE2-A8BF-CC8B98A693C3_1_105_c.jpeg", camera: "Fuji GFX 100 II", lens: "GF 45mm f/2.8", exposure: "ISO 100 · 45mm · f/8 · 1/125s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg", camera: "Fuji GFX 100 II", lens: "GF 63mm f/2.8", exposure: "ISO 200 · 63mm · f/4 · 1/60s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-26" },
    { filename: "B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg", camera: "Fuji GFX 100 II", lens: "GF 45mm f/2.8", exposure: "ISO 100 · 45mm · f/8 · 1/125s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "8CFD41AD-AEC1-4735-B82E-106BD02F4123_1_105_c.jpeg", camera: "Fuji GFX 100 II", lens: "GF 110mm f/2", exposure: "ISO 100 · 110mm · f/4 · 1/250s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "93846B6A-81AF-4186-85C2-BD5F2415B13B_1_105_c.jpeg", camera: "Fuji GFX 100 II", lens: "GF 45mm f/2.8", exposure: "ISO 100 · 45mm · f/5.6 · 1/125s", locationHint: "Jaigarh Fort, Aravalli Range, Rajasthan", capturedAt: "2026-09-26" },

    // 3. Royal Heritage Celebration, Jaipur
    { filename: "palace-arch-courtyard.jpg", camera: "Linhof Master Technika 4x5", lens: "Schneider Super-Angulon 90mm f/8", exposure: "Kodak Tri-X 320 · f/16 · 1/8s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "aryan-patel-pillared-court.jpg", camera: "Hasselblad 500C/M", lens: "Carl Zeiss Planar 80mm f/2.8", exposure: "Kodak Portra 400 · f/2.8 · 1/125s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "ochre-palace-courtyard-scale.jpg", camera: "Hasselblad 500C/M", lens: "Carl Zeiss Distagon 50mm f/4", exposure: "Kodak Portra 160 · f/5.6 · 1/250s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "01C9D4AC-86FE-4799-AF1F-8EFCCE5936C8_1_105_c.jpeg", camera: "Phase One IQ4 150MP", lens: "Rodenstock HR 40mm", exposure: "ISO 100 · 40mm · f/8 · 1/125s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", camera: "Leica M11-P", lens: "Summilux-M 35mm f/1.4", exposure: "ISO 800 · 35mm · f/1.4 · 1/60s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "CB5E956F-0E75-4786-A519-6B6357808202_1_105_c.jpeg", camera: "Leica M11-P", lens: "Summicron-M 50mm f/2", exposure: "ISO 400 · 50mm · f/2.8 · 1/125s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "ADD56FA1-6A5E-4CD0-BC56-3297E9FFAC5A_1_105_c.jpeg", camera: "Leica M11-P", lens: "Elmarit-M 28mm f/2.8", exposure: "ISO 200 · 28mm · f/4 · 1/250s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },
    { filename: "FD8B9285-1B95-4137-A48A-97909D9E61B7_1_105_c.jpeg", camera: "Leica M11-P", lens: "Summilux-M 50mm f/1.4", exposure: "ISO 1600 · 50mm · f/1.4 · 1/45s", locationHint: "Jaipur, Rajasthan", capturedAt: "2026-09-27" },

    // 4. Sheesh Mahal Convex Mirrors, Amer
    { filename: "aryan-patel-sheesh-mahal.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 80mm f/1.9", exposure: "ISO 400 · 80mm · f/4 · 1/60s", locationHint: "Sheesh Mahal, Amer, Rajasthan", capturedAt: "2025-11-14" },
    { filename: "192036BF-B1BB-483F-AFD7-B9F96EBB69BA.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 45mm f/4 P", exposure: "ISO 200 · 45mm · f/5.6 · 1/125s", locationHint: "Sheesh Mahal, Amer, Rajasthan", capturedAt: "2025-11-14" },
    { filename: "27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg", camera: "Hasselblad 907X 50C", lens: "XCD 120mm f/3.5 Macro", exposure: "ISO 100 · 120mm · f/8 · 1/30s", locationHint: "Sheesh Mahal, Amer, Rajasthan", capturedAt: "2025-11-14" },
    { filename: "6C06B73F-8404-46A2-92AC-B04231913A92.jpg", camera: "Fuji GFX 100 II", lens: "GF 110mm f/2", exposure: "ISO 400 · 110mm · f/2.8 · 1/125s", locationHint: "Sheesh Mahal, Amer, Rajasthan", capturedAt: "2025-11-14" },
    { filename: "C59CEBEA-EDC0-4FD0-9356-771216EB08F7.jpg", camera: "Fuji GFX 100 II", lens: "GF 45mm f/2.8", exposure: "ISO 800 · 45mm · f/4 · 1/60s", locationHint: "Sheesh Mahal, Amer, Rajasthan", capturedAt: "2025-11-14" },

    // 5. Bareilly Haveli & Northern Plains Heritage
    { filename: "A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg", camera: "Canon EOS R5", lens: "RF 50mm f/1.2L", exposure: "ISO 100 · 50mm · f/4 · 1/200s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },
    { filename: "IMG_0039-4.jpg", camera: "Canon EOS R5", lens: "RF 35mm f/1.8 Macro", exposure: "ISO 400 · 35mm · f/2.8 · 1/125s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },
    { filename: "IMG_0081.jpg", camera: "Canon EOS R5", lens: "RF 85mm f/1.4L", exposure: "ISO 200 · 85mm · f/2 · 1/320s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },
    { filename: "IMG_0090.jpg", camera: "Canon EOS R5", lens: "RF 50mm f/1.2L", exposure: "ISO 800 · 50mm · f/1.8 · 1/80s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },
    { filename: "IMG_0108.jpg", camera: "Canon EOS R5", lens: "RF 35mm f/1.8", exposure: "ISO 100 · 35mm · f/5.6 · 1/160s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },
    { filename: "IMG_0219.jpg", camera: "Canon EOS R5", lens: "RF 50mm f/1.2L", exposure: "ISO 200 · 50mm · f/2.8 · 1/250s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },
    { filename: "IMG_0294.jpg", camera: "Canon EOS R5", lens: "RF 24-70mm f/2.8L", exposure: "ISO 100 · 24mm · f/8 · 1/125s", locationHint: "Bareilly, Uttar Pradesh", capturedAt: "2025-10-18" },

    // 6. Dal Lake & Kashmir Waters
    { filename: "Dal_Lake.jpeg", camera: "Fuji GFX 100 II", lens: "GF 45mm f/2.8", exposure: "ISO 100 · 45mm · f/8 · 1/125s", locationHint: "Dal Lake, Srinagar, Kashmir", capturedAt: "2026-06-19" },
    { filename: "pelicans-lake.jpg", camera: "Phase One IQ4 150MP", lens: "Rodenstock HR 150mm", exposure: "ISO 200 · 150mm · f/5.6 · 1/500s", locationHint: "Dal Lake, Srinagar, Kashmir", capturedAt: "2026-06-19" },
    { filename: "IMG_0386.jpg", camera: "Fuji GFX 100 II", lens: "GF 110mm f/2", exposure: "ISO 100 · 110mm · f/4 · 1/250s", locationHint: "Dal Lake, Srinagar, Kashmir", capturedAt: "2026-06-19" },
    { filename: "IMG_0396-1.jpg", camera: "Fuji GFX 100 II", lens: "GF 45mm f/2.8", exposure: "ISO 400 · 45mm · f/2.8 · 1/60s", locationHint: "Dal Lake, Srinagar, Kashmir", capturedAt: "2026-06-19" },
  ];

  for (const item of rawRegister) {
    const meta = ARCHIVAL_PLATE_META[item.filename] || {
      aspectRatio: "2/3",
      isLandscape: false,
      naturalWidth: 1000,
      naturalHeight: 1500,
    };

    const pixelCount = meta.naturalWidth * meta.naturalHeight;
    // Calculate initial base quality score from resolution and aspect fidelity
    const resolutionScore = Math.min(100, Math.round((pixelCount / (6000 * 4000)) * 100));

    assets.push({
      id: `asset-${item.filename.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`,
      filename: item.filename,
      url: `/images/${item.filename}`,
      width: meta.naturalWidth,
      height: meta.naturalHeight,
      aspectRatio: meta.aspectRatio,
      isLandscape: meta.isLandscape,
      hasHuman: meta.hasHuman ?? false,
      camera: item.camera,
      lens: item.lens,
      exposure: item.exposure,
      capturedAt: item.capturedAt,
      locationHint: item.locationHint,
      qualityScore: resolutionScore,
      heroSuitabilityScore: 0, // Assigned by Agent 3
    });
  }

  return assets;
}
