// Studio data collections for projects, stories, services, and vault galleries

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectImageItem {
  id: string;
  url: string;
  caption?: string;
  alt: string;
  span?: 4 | 6 | 8 | 10 | 12;
  aspect?: "portrait" | "landscape" | "panoramic" | "square";
}

export interface ProjectData {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "architecture" | "weddings" | "portraits" | "fashion" | "commercial";
  year: string;
  location: string;
  client?: string;
  coverImage: string;
  intro: string;
  story: string;
  gallery: ProjectImageItem[];
  credits: ProjectCredit[];
  featured?: boolean;
}

export interface StoryData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  editorialText1: string;
  plate1: string;
  plate1Caption: string;
  editorialText2: string;
  plate2: string;
  plate2Caption: string;
  quote: string;
  plate3: string;
  plate3Caption: string;
  editorialConclusion: string;
  relatedProjectSlugs: string[];
}

export interface ServiceData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  coverImage: string;
  philosophy: string;
  startingPrice: string;
  included: string[];
  process: Array<{ step: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  portfolioSlugs: string[];
}

export interface TestimonialData {
  id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  eventOrProject: string;
  location: string;
  year: string;
}

// Canonical metadata and framing specs for all 61 archival studio assets
export const ARCHIVAL_PLATE_META: Record<string, {
  aspectRatio: string;
  aspectClass: string;
  isLandscape: boolean;
  hasHuman: boolean;
  naturalWidth: number;
  naturalHeight: number;
  containerClass: string;
}> = {
  "01C9D4AC-86FE-4799-AF1F-8EFCCE5936C8_1_105_c.jpeg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: true, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "0A0D9BAF-B62A-44B0-8277-A8CA18D75211_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "135920DC-BB0A-45FD-BAC4-1E38814EB8C4_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "192036BF-B1BB-483F-AFD7-B9F96EBB69BA.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 1536, naturalHeight: 2304, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 2304, naturalHeight: 1536, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 1536, naturalHeight: 2304, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "29BF8584-B26F-4208-8B45-C9DB235E8477_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "400A501C-4442-4203-A37A-C6ECC2EBF54B_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "4F0FBF52-AF40-4ED4-A67F-43E3D73BD6E3_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "53310D26-A505-4554-B220-C1E51F5A52A9_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "542AE6BC-0D96-47EC-8A28-2C32E5CCB977_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 1536, naturalHeight: 2304, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "6589B8A1-5E8F-4EDF-8B9B-21C217B637E8_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "6C06B73F-8404-46A2-92AC-B04231913A92.jpg": { aspectRatio: "4/5", aspectClass: "aspect-[4/5]", isLandscape: false, hasHuman: false, naturalWidth: 1638, naturalHeight: 2048, containerClass: "aspect-[4/5] max-w-2xl mx-auto" },
  "735BACB1-E54D-4358-B3C2-21DB91A3491C_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "787A387A-B05A-4BE2-A8BF-CC8B98A693C3_1_105_c.jpeg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "8CFD41AD-AEC1-4735-B82E-106BD02F4123_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "93846B6A-81AF-4186-85C2-BD5F2415B13B_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "985F1A4F-D8D8-498A-BA88-72348841513D_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "9871E176-CA16-4AC1-8D5D-8D5F86A0BDA7_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 2304, naturalHeight: 1536, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "ADD56FA1-6A5E-4CD0-BC56-3297E9FFAC5A_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "C59CEBEA-EDC0-4FD0-9356-771216EB08F7.jpg": { aspectRatio: "4/5", aspectClass: "aspect-[4/5]", isLandscape: false, hasHuman: true, naturalWidth: 1638, naturalHeight: 2048, containerClass: "aspect-[4/5] max-w-2xl mx-auto" },
  "CB5E956F-0E75-4786-A519-6B6357808202_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "D89A57A9-7ABD-41F5-8F6A-F9B1F3BB9F31_1_105_c.jpeg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "Dal_Lake.jpeg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "F2485F99-4E34-4249-ABBD-856E41F2F65B_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "FBC766B9-FE17-4A48-B8DD-60E95DB12B51_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "FD8B9285-1B95-4137-A48A-97909D9E61B7_1_105_c.jpeg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG-20240414-WA0261.jpg": { aspectRatio: "3/4", aspectClass: "aspect-[3/4]", isLandscape: false, hasHuman: false, naturalWidth: 1200, naturalHeight: 1600, containerClass: "aspect-[3/4] max-w-3xl mx-auto" },
  "IMG20250324140438.jpg": { aspectRatio: "3/4", aspectClass: "aspect-[3/4]", isLandscape: false, hasHuman: false, naturalWidth: 1536, naturalHeight: 2048, containerClass: "aspect-[3/4] max-w-3xl mx-auto" },
  "IMG20250710071454.jpg": { aspectRatio: "3/4", aspectClass: "aspect-[3/4]", isLandscape: false, hasHuman: false, naturalWidth: 1536, naturalHeight: 2046, containerClass: "aspect-[3/4] max-w-3xl mx-auto" },
  "IMG20250714134245.jpg": { aspectRatio: "3/4", aspectClass: "aspect-[3/4]", isLandscape: false, hasHuman: false, naturalWidth: 1536, naturalHeight: 2048, containerClass: "aspect-[3/4] max-w-3xl mx-auto" },
  "IMG20250714135723.jpg": { aspectRatio: "4/3", aspectClass: "aspect-[4/3]", isLandscape: true, hasHuman: false, naturalWidth: 2048, naturalHeight: 1536, containerClass: "aspect-[4/3] w-full max-w-5xl mx-auto" },
  "IMG20260906183457.jpg": { aspectRatio: "3/4", aspectClass: "aspect-[3/4]", isLandscape: false, hasHuman: false, naturalWidth: 1536, naturalHeight: 2046, containerClass: "aspect-[3/4] max-w-3xl mx-auto" },
  "IMG_0017.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 1448, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG_0039-2.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 1448, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG_0039-4.jpg": { aspectRatio: "4/5", aspectClass: "aspect-[4/5]", isLandscape: false, hasHuman: false, naturalWidth: 1586, naturalHeight: 1982, containerClass: "aspect-[4/5] max-w-2xl mx-auto" },
  "IMG_0081.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 1448, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG_0090.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 1446, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG_0108.jpg": { aspectRatio: "4/5", aspectClass: "aspect-[4/5]", isLandscape: false, hasHuman: false, naturalWidth: 1586, naturalHeight: 1982, containerClass: "aspect-[4/5] max-w-2xl mx-auto" },
  "IMG_0219.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 1448, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG_0294.jpg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 2172, naturalHeight: 1448, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "IMG_0386.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 1448, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "IMG_0396-1.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 1448, naturalHeight: 2172, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "aryan-patel-pillared-court.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 2046, naturalHeight: 3072, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "aryan-patel-sheesh-mahal.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 1024, naturalHeight: 1536, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "aryan-patel-temple-monochrome.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: true, naturalWidth: 3921, naturalHeight: 5881, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "city-aerial-overview.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "fort-ramparts-overlook.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "hilltop-fortress-crest.jpg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 6000, naturalHeight: 4000, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "ochre-palace-courtyard-scale.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "palace-arch-courtyard.jpg": { aspectRatio: "3/4", aspectClass: "aspect-[3/4]", isLandscape: false, hasHuman: false, naturalWidth: 3469, naturalHeight: 4625, containerClass: "aspect-[3/4] max-w-3xl mx-auto" },
  "pelicans-lake.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 724, naturalHeight: 1086, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
  "sandstone-palace-domes.jpg": { aspectRatio: "3/2", aspectClass: "aspect-[3/2]", isLandscape: true, hasHuman: false, naturalWidth: 1086, naturalHeight: 724, containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto" },
  "temple-shikhara-oleander.jpg": { aspectRatio: "2/3", aspectClass: "aspect-[2/3]", isLandscape: false, hasHuman: false, naturalWidth: 4000, naturalHeight: 6000, containerClass: "aspect-[2/3] max-w-2xl mx-auto" },
};

export function getImagePlateInfo(src?: string): {
  aspectRatio: string;
  aspectClass: string;
  isLandscape: boolean;
  hasHuman: boolean;
  naturalWidth: number;
  naturalHeight: number;
  containerClass: string;
} {
  if (!src) {
    return {
      aspectRatio: "2/3",
      aspectClass: "aspect-[2/3]",
      isLandscape: false,
      hasHuman: false,
      naturalWidth: 682,
      naturalHeight: 1024,
      containerClass: "aspect-[2/3] max-w-2xl mx-auto",
    };
  }

  const filename = src.split("/").pop()?.split("?")[0] || "";
  if (filename && ARCHIVAL_PLATE_META[filename]) {
    return ARCHIVAL_PLATE_META[filename];
  }

  const isHuman =
    src.includes("sheesh-mahal") ||
    src.includes("pillared-court") ||
    src.includes("temple-monochrome") ||
    src.includes("C59CEBEA") ||
    src.includes("IMG_0081") ||
    src.includes("IMG_0386") ||
    src.includes("5A9200AE") ||
    src.includes("01C9D4AC") ||
    src.includes("100A270B") ||
    src.includes("400A501C") ||
    src.includes("53310D26") ||
    src.includes("542AE6BC") ||
    src.includes("735BACB1") ||
    src.includes("93846B6A") ||
    src.includes("985F1A4F") ||
    src.includes("FBC766B9") ||
    src.includes("FD8B9285") ||
    src.includes("IMG_0017");

  if (
    src.includes("hilltop-fortress-crest") ||
    src.includes("sandstone-palace-domes") ||
    src.includes("Dal_Lake")
  ) {
    return {
      aspectRatio: "3/2",
      aspectClass: "aspect-[3/2]",
      isLandscape: true,
      hasHuman: isHuman,
      naturalWidth: 1086,
      naturalHeight: 724,
      containerClass: "aspect-[3/2] w-full max-w-6xl mx-auto",
    };
  }

  return {
    aspectRatio: "2/3",
    aspectClass: "aspect-[2/3]",
    isLandscape: false,
    hasHuman: isHuman,
    naturalWidth: 724,
    naturalHeight: 1086,
    containerClass: "aspect-[2/3] max-w-2xl mx-auto",
  };
}

/* ========================================================================= */
/* PROJECTS ARCHIVE (6 MONOGRAPHS HOUSING ALL 61 ARCHIVAL ASSETS)           */
/* ========================================================================= */

export const PROJECTS: ProjectData[] = [
  {
    id: "proj-1",
    slug: "jaipur-royal-citadels",
    name: "Royal Citadels of Jaipur",
    subtitle: "Architectural survey across Amber Fort, Nahargarh Fort, Jal Mahal & Jaigarh Fort.",
    category: "architecture",
    year: "2026",
    location: "Jaipur, Rajasthan",
    client: "Jaipur Heritage Trust & Private Patrons",
    coverImage: "/images/hilltop-fortress-crest.jpg",
    intro: "Monumental ramparts, sunlit marble corridors, and mirror-mosaic chambers crowning the Aravalli hills above the pink city.",
    story: "From the high defensive ramparts of Nahargarh Fort to the jewel-like convex mirrors of Amber Fort's Sheesh Mahal, Jaipur's architectural heritage pairs military geometry with royal intimacy. Our medium-format monograph captures the sweeping mountain escarpments, morning reflection studies over Jal Mahal, and ceremonial gatherings framed within three-hundred-year-old carved archways.",
    gallery: [
      { id: "img-1-1", url: "/images/01C9D4AC-86FE-4799-AF1F-8EFCCE5936C8_1_105_c.jpeg", caption: "Jal Mahal Promenade, Man Sagar Lake, Jaipur: Carved red sandstone balustrade along the Man Sagar promenade; mid-afternoon desert light softens across the distant water palace facade.", alt: "Man Sagar Lake Promenade Balustrade at Jal Mahal Promenade, Man Sagar Lake, Jaipur", span: 12, aspect: "landscape" },
      { id: "img-1-2", url: "/images/0A0D9BAF-B62A-44B0-8277-A8CA18D75211_1_105_c.jpeg", caption: "Jal Mahal, Man Sagar Lake, Jaipur: Yellow sandstone water palace rising from the calm surface of Man Sagar Lake; early morning haze diffuses the Aravalli escarpment.", alt: "Jal Mahal Palace Mid-Water Elevation at Jal Mahal, Man Sagar Lake, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-3", url: "/images/100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg", caption: "Amber Fort, Jaipur: Elevated sandstone plinth of the Hall of Public Audience; filtered courtyard light reveals weathered chisel marks and morning stillness.", alt: "Diwan-e-Aam Plinth Sitting at Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-4", url: "/images/135920DC-BB0A-45FD-BAC4-1E38814EB8C4_1_105_c.jpeg", caption: "Amber Fort, Jaipur: Multifoil cusped marble archway and carved pierced jali screen framing the threshold to the Hall of Mirrors; raking morning light across lime plaster.", alt: "Sheesh Mahal Cusped Portal & Jali at Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-5", url: "/images/400A501C-4442-4203-A37A-C6ECC2EBF54B_1_105_c.jpeg", caption: "Sheesh Mahal, Amber Fort, Jaipur: Intricate thikri convex mirror inlays embedded in alabaster stucco; fractured reflections caught under low ambient palace illumination.", alt: "Mirror Mosaic Chamber Wall at Sheesh Mahal, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-6", url: "/images/4F0FBF52-AF40-4ED4-A67F-43E3D73BD6E3_1_105_c.jpeg", caption: "Sukh Niwas, Amber Fort, Jaipur: Double-bay cusped colonnade and white marble cooling sluice; high desert noon diffused beneath shadowed arched galleries.", alt: "Sukh Niwas Marble Water Cascade at Sukh Niwas, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-7", url: "/images/53310D26-A505-4554-B220-C1E51F5A52A9_1_105_c.jpeg", caption: "Jal Mahal Promenade, Man Sagar Lake, Jaipur: Paved lakeside walkway bordering the historic embankment; quiet lateral daylight reveals ripple patterns across the lake surface.", alt: "Promenade Transit at Man Sagar at Jal Mahal Promenade, Man Sagar Lake, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-8", url: "/images/6589B8A1-5E8F-4EDF-8B9B-21C217B637E8_1_105_c.jpeg", caption: "Man Sagar Lake, Jaipur: Great white pelicans resting upon submerged stone foundations in Man Sagar Lake; calm water rendering pale plumage against dark aquatic algae.", alt: "Pelicans on Submerged Ashlar Masonry at Man Sagar Lake, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-9", url: "/images/6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg", caption: "Aram Bagh, Amber Fort, Jaipur: Geometrical Mughal star basin and carved marble channels fronting the mirror palace arcade; morning illumination casting clean geometric cast shadows.", alt: "Aram Bagh Star Parterre & Palace Arcade at Aram Bagh, Amber Fort, Jaipur", span: 12, aspect: "landscape" },
      { id: "img-1-10", url: "/images/787A387A-B05A-4BE2-A8BF-CC8B98A693C3_1_105_c.jpeg", caption: "Amber Fort, Jaipur: The monumental Sun Gate portal opening into the vast cobbled expanse of Jaleb Chowk; ochre masonry under clear autumn sky.", alt: "Suraj Pol Courtyard Threshold at Amber Fort, Jaipur", span: 12, aspect: "landscape" },
      { id: "img-1-11", url: "/images/8CFD41AD-AEC1-4735-B82E-106BD02F4123_1_105_c.jpeg", caption: "Jal Mahal, Man Sagar Lake, Jaipur: Centered architectural view of the flooded palace pavilions framed against the dry ridges of the Aravalli range under clear blue desert sky.", alt: "Jal Mahal and Aravalli Ridge Line at Jal Mahal, Man Sagar Lake, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-12", url: "/images/985F1A4F-D8D8-498A-BA88-72348841513D_1_105_c.jpeg", caption: "Sheesh Mahal, Amber Fort, Jaipur: Cusped portal arch adorned with convex glass tesserae; deep courtyard shadow framing subtle figure placement in diffused daylight.", alt: "Sheesh Mahal Inner Arch Framing at Sheesh Mahal, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-13", url: "/images/ADD56FA1-6A5E-4CD0-BC56-3297E9FFAC5A_1_105_c.jpeg", caption: "Amber Fort, Jaipur: Carved sandstone corbels and mineral pigment wall paintings bordering an overhanging palace jharokha window at Amber Fort.", alt: "Rajput Jharokha Balcony Fresco at Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-14", url: "/images/B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg", caption: "Maota Lake, Amber Fort, Jaipur: Star-patterned saffron garden island floating within the emerald waters of Maota Lake; overhead perspective from high fortress ramparts.", alt: "Kesar Kyari Geometric Parterre at Maota Lake, Amber Fort, Jaipur", span: 12, aspect: "landscape" },
      { id: "img-1-15", url: "/images/CB5E956F-0E75-4786-A519-6B6357808202_1_105_c.jpeg", caption: "Sheesh Mahal, Amber Fort, Jaipur: Macro documentation of convex mirror glass set in gypsum plaster forming floral vase motifs; optical flare controlled under oblique natural light.", alt: "Thikri Glass Mosaic Urn Frieze at Sheesh Mahal, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-16", url: "/images/CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg", caption: "Ganesh Pol, Amber Fort, Jaipur: Polychrome miniature frescos, brass-embossed gate panels, and carved marble lattice screens above the ceremonial threshold into the private quarters.", alt: "Ganesh Pol Ceremonial Gateway at Ganesh Pol, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-17", url: "/images/D89A57A9-7ABD-41F5-8F6A-F9B1F3BB9F31_1_105_c.jpeg", caption: "Nahargarh Fort, Jaipur: Terraced yellow-ochre pavilions, fluted chhatri cupolas, and perimeter parapets crowning Nahargarh Fort; late afternoon western sun.", alt: "Madhavendra Bhawan Rooftop Terrace at Nahargarh Fort, Jaipur", span: 12, aspect: "landscape" },
      { id: "img-1-18", url: "/images/FBC766B9-FE17-4A48-B8DD-60E95DB12B51_1_105_c.jpeg", caption: "Amber Fort, Jaipur: Perforated white marble balustrade overlooking symmetrical sunken garden waterways; high contrast mid-morning Rajputana light.", alt: "Aram Bagh Terrace Balustrade at Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-19", url: "/images/FD8B9285-1B95-4137-A48A-97909D9E61B7_1_105_c.jpeg", caption: "Diwan-e-Aam, Amber Fort, Jaipur: Double row of red sandstone pillars supporting cusped brackets; classical perspective study under diffused courtyard ambient illumination.", alt: "Diwan-e-Aam Red Sandstone Colonnade at Diwan-e-Aam, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-20", url: "/images/aryan-patel-pillared-court.jpg", caption: "Diwan-e-Aam, Amber Fort, Jaipur: Fluted sandstone columns aligned in rhythmic sequence; soft shadow gradients highlighting stone texture and unhurried human scale.", alt: "Diwan-e-Aam Columnar Corridor at Diwan-e-Aam, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-21", url: "/images/aryan-patel-sheesh-mahal.jpg", caption: "Sheesh Mahal, Amber Fort, Jaipur: Symmetrical portrait framed by the scalloped portal of the mirror pavilion; thousands of convex mirrors capturing scattered twilight highlights.", alt: "Sheesh Mahal Archway Portrait Study at Sheesh Mahal, Amber Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-22", url: "/images/city-aerial-overview.jpg", caption: "Nahargarh Fort, Jaipur: Territorial viewpoint from the southern bastions of Nahargarh Fort looking across the walled pink city grid toward the distant plains.", alt: "Jaipur Basin Territorial Survey at Nahargarh Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-23", url: "/images/fort-ramparts-overlook.jpg", caption: "Nahargarh Fort, Jaipur: Stepped dry-stone ramparts and water catchment cistern contouring the natural geological ridgeline; raking evening cross-light.", alt: "Nahargarh Fort Defensive Battlements at Nahargarh Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-24", url: "/images/hilltop-fortress-crest.jpg", caption: "Jaigarh Fort, Jaipur: Diwa Burj watchtower rising at 648 meters elevation along the Cheel ka Teela ridge, documented from Amber Fort battlements under heavy monsoon cloud cover.", alt: "Jaigarh Fort Diwa Burj Crest at Jaigarh Fort, Jaipur", span: 12, aspect: "landscape" },
      { id: "img-1-25", url: "/images/ochre-palace-courtyard-scale.jpg", caption: "Madhavendra Bhawan, Nahargarh Fort, Jaipur: Rhythmic succession of ochre yellow suites and overhanging jharokhas enclosing the secluded inner court of Nahargarh Fort.", alt: "Madhavendra Bhawan Courtyard Geometry at Madhavendra Bhawan, Nahargarh Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-26", url: "/images/palace-arch-courtyard.jpg", caption: "Nahargarh Fort, Jaipur: Deep shadowed archway framing the warm lime plaster walls and open sunlit courtyard of Madhavendra Bhawan.", alt: "Monumental Gateway Silhouette at Nahargarh Fort, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-27", url: "/images/pelicans-lake.jpg", caption: "Man Sagar Lake, Jaipur: Migratory pelicans resting upon submerged palace foundations; flat water reflections and mist hovering over the morning lake surface.", alt: "Man Sagar Lake Waterfowl Study at Man Sagar Lake, Jaipur", span: 6, aspect: "portrait" },
      { id: "img-1-28", url: "/images/sandstone-palace-domes.jpg", caption: "Amber Fort, Jaipur: Curved bangaldar eaves and fluted marble cupolas overlooking the Aravalli hills; late afternoon golden light warming the stone surfaces.", alt: "Jas Mandir Rooftop Chhatris at Amber Fort, Jaipur", span: 12, aspect: "landscape" },
    ],
    credits: [
      { role: "Principal Photographer & Direction", name: "Aryan Patel" },
      { role: "Archival Lab & Retouching", name: "Studioza Atelier" },
    ],
    featured: true,
  },
  {
    id: "proj-2",
    slug: "kashmir-valley-expedition",
    name: "Kashmir Valley Expedition",
    subtitle: "Topographic monograph documenting Dal Lake, Srinagar, Sonamarg, and Pulwama.",
    category: "commercial",
    year: "2026",
    location: "Jammu & Kashmir",
    client: "Alpine Heritage Expedition",
    coverImage: "/images/Dal_Lake.jpeg",
    intro: "A rigorous visual diary capturing the alpine waters, morning mist, and glacial river valleys of Kashmir.",
    story: "From the unhurried stillness of Dal Lake at dawn to the rushing meltwaters of Sonamarg's alpine meadows, Kashmir offers an incomparable optical atmosphere. Documented on medium format sensors in natural light, this monograph captures the tranquil reflection of wooden shikaras, the historic waterways of Srinagar, and the rugged mountain passages near Pulwama.",
    gallery: [
      { id: "img-2-1", url: "/images/Dal_Lake.jpeg", caption: "Dal Lake, Srinagar: Wooden shikaras moored alongside carved houseboats on Dal Lake; morning mountain mist lifting across the Zabarwan range.", alt: "Dal Lake Dawn Waterway Crossing at Dal Lake, Srinagar", span: 12, aspect: "landscape" },
      { id: "img-2-2", url: "/images/IMG20250710071454.jpg", caption: "Highway Corridor to Kashmir: Early morning expedition convoy moving along the national highway toward the mountain passes of the Kashmir valley.", alt: "Northern Highway Transit Corridor at Highway Corridor to Kashmir", span: 6, aspect: "portrait" },
      { id: "img-2-3", url: "/images/IMG20250714134245.jpg", caption: "Shankaracharya Hill, Srinagar: High-angle view from Shankaracharya Hill across the urban density of Srinagar, the meandering Jhelum basin, and the Pir Panjal range.", alt: "Srinagar Valley Topographic Survey at Shankaracharya Hill, Srinagar", span: 6, aspect: "portrait" },
      { id: "img-2-4", url: "/images/IMG20250714135723.jpg", caption: "Srinagar: Hilltop survey overlooking Dal Lake waterways, historic chinar groves, and the mountain amphitheater under clear midday skies.", alt: "Dal Lake & Chinar Canopy Panorama at Srinagar", span: 12, aspect: "landscape" },
      { id: "img-2-5", url: "/images/IMG_0219.jpg", caption: "Near Pulwama: Rural mountain highway corridor bordered by agricultural orchards and rugged foothills near Pulwama.", alt: "Pulwama Foothill Passage at Near Pulwama", span: 6, aspect: "portrait" },
      { id: "img-2-6", url: "/images/IMG_0386.jpg", caption: "Sonamarg: Solitary figure seated on a weathered granite boulder in the alpine meadows of Sonamarg; snow-covered peaks visible beneath cloud cover.", alt: "Sonamarg Glacial Valley Sitting at Sonamarg", span: 6, aspect: "portrait" },
      { id: "img-2-7", url: "/images/IMG_0396-1.jpg", caption: "Sonamarg: Timber cottages and pine-clad hillsides bordering alpine pastures along the Sindh river corridor in Sonamarg.", alt: "Alpine Meadows of Sonamarg at Sonamarg", span: 6, aspect: "portrait" },
    ],
    credits: [
      { role: "Expedition Photographer", name: "Aryan Patel" },
      { role: "Print Master", name: "Studioza Atelier" },
    ],
    featured: true,
  },
  {
    id: "proj-3",
    slug: "chittor-fort-monoliths",
    name: "Chittor Fort Monoliths",
    subtitle: "Architectural survey documenting Samaddhisvara Temple, Vijay Stambha, and Mewar ramparts.",
    category: "architecture",
    year: "2026",
    location: "Chittorgarh, Rajasthan",
    client: "Mewar Architectural Trust",
    coverImage: "/images/temple-shikhara-oleander.jpg",
    intro: "Centuries-old stone temples, soaring victory towers, and sweeping cliffside battlements above the Mewar plain.",
    story: "Rising abruptly from the plains of southern Rajasthan, Chittor Fort represents one of the largest fortified citadels in Asia. This monograph documents the intricate carved sandstone friezes of Samaddhisvara Temple, the nine-tiered vertical majesty of Vijay Stambha, and the quiet sunset solitude of fortress ramparts where wild langurs observe the receding light.",
    gallery: [
      { id: "img-3-1", url: "/images/temple-shikhara-oleander.jpg", caption: "Chittor Fort, Chittorgarh: Ancient carved stone shikhara rising with deep relief sculptures framed by pink oleander blossoms in crisp morning light.", alt: "Samaddhisvara Temple Shikhara & Oleander at Chittor Fort", span: 6, aspect: "portrait" },
      { id: "img-3-2", url: "/images/20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Elaborately carved sandstone shikhara and pillared mandapa of Samaddhisvara Temple; sacred saffron banner fluttering in late afternoon light.", alt: "Samaddhisvara Temple Shikhara at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
      { id: "img-3-3", url: "/images/29BF8584-B26F-4208-8B45-C9DB235E8477_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Tower of Victory rising nine tiers above the plateau; intricate stone sculptures and balcony brackets silhouetted against the evening sky.", alt: "Vijay Stambha Vertical Elevation at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
      { id: "img-3-4", url: "/images/542AE6BC-0D96-47EC-8A28-2C32E5CCB977_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Weathered plinths and ancient foundation stones with the nine-tiered Vijay Stambha looming in the background; golden hour raking light.", alt: "Ruins of Mahasati Courtyard at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
      { id: "img-3-5", url: "/images/735BACB1-E54D-4358-B3C2-21DB91A3491C_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Terrace observation beneath date palms with the sculpted sandstone facade of Vijay Stambha rising into the blue hour sky.", alt: "Vijay Stambha Terrace Study at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
      { id: "img-3-6", url: "/images/93846B6A-81AF-4186-85C2-BD5F2415B13B_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Dry-stone defensive parapet edge overlooking the vast Mewar plain at sunset; quiet contemplation on ancient fortress battlements.", alt: "Chittor Rampart Overlook at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
      { id: "img-3-7", url: "/images/9871E176-CA16-4AC1-8D5D-8D5F86A0BDA7_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Carved stone columns and stepped temple roof silhouetted against a rose and violet twilight horizon at Chittor Fort.", alt: "Temple Mandapa Dusk Silhouette at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
      { id: "img-3-8", url: "/images/F2485F99-4E34-4249-ABBD-856E41F2F65B_1_105_c.jpeg", caption: "Chittor Fort, Chittorgarh: Silhouetted troop of grey langurs perched along the weathered stone eave of an ancient temple pavilion during sunset.", alt: "Langurs on Temple Cornice at Chittor Fort, Chittorgarh", span: 6, aspect: "portrait" },
    ],
    credits: [
      { role: "Principal Photographer", name: "Aryan Patel" },
      { role: "Archival Lab", name: "Studioza Atelier" },
    ],
    featured: true,
  },
  {
    id: "proj-4",
    slug: "uttarakhand-sacred-sanctuaries",
    name: "Uttarakhand Sacred Sanctuaries",
    subtitle: "Sacred architecture monograph capturing Jageshwar Dham Almora stone temples & Rishikesh ghats.",
    category: "architecture",
    year: "2026",
    location: "Almora & Rishikesh, Uttarakhand",
    client: "Himalayan Archival Trust",
    coverImage: "/images/21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg",
    intro: "Ancient 8th-century Nagara stone temple sanctums sheltered by towering deodar forests and holy riverbank ghats.",
    story: "Sheltered in the narrow Jataganga valley at 1,870 meters elevation, Jageshwar Dham comprises over a hundred ancient stone temples protected by towering Himalayan deodars. Paired with dawn observations along the emerald waters of the Ganga in Rishikesh, this monograph explores the enduring spiritual geometry of stone, cedar, and holy river current.",
    gallery: [
      { id: "img-4-1", url: "/images/21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg", caption: "Jageshwar Dham, Almora: Cobbled riverbed of the sacred Jata Ganga winding through dense deodar cedar forests surrounding the 8th-century temple complex at 1,870 meters.", alt: "Jata Ganga Riverbed at Jageshwar at Jageshwar Dham, Almora", span: 12, aspect: "landscape" },
      { id: "img-4-2", url: "/images/27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg", caption: "Parmarth Niketan Ghat, Rishikesh: Monumental stone icon of Lord Shiva in meditation posture rising above the holy Ganga waters in Rishikesh; soft overcast river light.", alt: "Parmarth Niketan Shiva Murti at Parmarth Niketan Ghat, Rishikesh", span: 6, aspect: "portrait" },
      { id: "img-4-3", url: "/images/IMG_0017.jpg", caption: "Rishikesh: Solitary observation along the glacial boulder banks of the river Ganga; clear emerald water flowing past forested Himalayan foothills.", alt: "Ganga Boulder Shoreline at Rishikesh", span: 6, aspect: "portrait" },
      { id: "img-4-4", url: "/images/IMG_0090.jpg", caption: "Rishikesh: Telephoto capture of a golden gibbous moon rising through deep indigo atmosphere above the forested ridges of Rishikesh.", alt: "Himalayan Foothill Waxing Moon at Rishikesh", span: 6, aspect: "portrait" },
      { id: "img-4-5", url: "/images/IMG_0294.jpg", caption: "Almora Pass, Almora: Early dawn mountain mist rolling over terraced pine forests along the winding pass leading into the sacred Jageshwar valley.", alt: "Almora Pine Ridge Blue Hour at Almora Pass, Almora", span: 12, aspect: "landscape" },
    ],
    credits: [
      { role: "Principal Photographer", name: "Aryan Patel" },
      { role: "Curatorial Direction", name: "Studioza Atelier" },
    ],
    featured: true,
  },
  {
    id: "proj-5",
    slug: "vrindavan-sacred-architecture",
    name: "Editorial Couture & Sacred Textiles",
    subtitle: "High-end fashion and heritage silk narratives harmonized with classical stone facades.",
    category: "fashion",
    year: "2026",
    location: "Vrindavan, Uttar Pradesh",
    client: "Braj Sacred Arts Council",
    coverImage: "/images/IMG20260906183457.jpg",
    intro: "Elaborate Phool Bangla floral sanctuaries, white Carrara marble relief carvings, and evening temple assemblies in Braj.",
    story: "A reverent visual documentation centered in sacred Vrindavan. From the fragrant flower-adorned pavilions of Shri Banke Bihari Mandir during festive darshan to the illuminated Carrara marble facades of Prem Mandir at twilight, this series examines the living intersection of classical sacred sculpture and devotional atmosphere.",
    gallery: [
      { id: "img-5-1", url: "/images/IMG-20240414-WA0261.jpg", caption: "Shri Banke Bihari Temple, Vrindavan: Devotional assembly and elaborate seasonal flower pavilion decorations within the inner sanctuary of Shri Banke Bihari Temple.", alt: "Shri Banke Bihari Phool Bangla Assembly at Shri Banke Bihari Temple, Vrindavan", span: 6, aspect: "portrait" },
      { id: "img-5-2", url: "/images/IMG20260906183457.jpg", caption: "Prem Mandir, Vrindavan: White Carrara marble sanctuary facade sculpted with classical relief carvings; dusk illumination reflecting across temple grounds.", alt: "Prem Mandir Carved Italian Marble Facade at Prem Mandir, Vrindavan", span: 6, aspect: "portrait" },
    ],
    credits: [
      { role: "Principal Lens", name: "Aryan Patel" },
      { role: "Atelier Production", name: "Studioza Atelier" },
    ],
    featured: false,
  },
  {
    id: "proj-6",
    slug: "bareilly-monograph-series",
    name: "Royal Heritage & Celebrations",
    subtitle: "Sacred matrimony, nocturnal Diwali illuminations, and courtyard family milestones.",
    category: "weddings",
    year: "2025",
    location: "Bareilly & Rajasthan",
    client: "Private Heritage Commission",
    coverImage: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg",
    intro: "Atmospheric golden hour rooftops, intimate Diwali nocturnes, family milestones, and ancestral haveli courtyards.",
    story: "An intimate, multi-faceted monograph documenting life, sacred celebration rituals, and seasonal transitions. From quiet sunset silhouettes across terrace oleanders to the luminous kinetic sparks of Diwali and domestic prayer spaces, this series records the quiet rhythm of northern heritage.",
    gallery: [
      { id: "img-6-1", url: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", caption: "Bareilly: Celebratory sparks and glowing earthen lamps piercing the autumn night; long exposure capturing kinetic trails of light.", alt: "Diwali Nocturne Pyrotechnics at Bareilly", span: 6, aspect: "portrait" },
      { id: "img-6-2", url: "/images/IMG_0108.jpg", caption: "Civil Lines, Bareilly: Celebratory arrival portrait with ceremonial garlands and floral arrangements outside the MG facility in Bareilly.", alt: "Family Milestone Ceremonial Sitting at Civil Lines, Bareilly", span: 6, aspect: "portrait" },
      { id: "img-6-3", url: "/images/IMG_0039-2.jpg", caption: "Bareilly: Backlit carved timber home altar illuminated by the warm amber flame of a brass diya lamp in Bareilly.", alt: "Devotional Home Mandir Sanctuary at Bareilly", span: 6, aspect: "portrait" },
      { id: "img-6-4", url: "/images/A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg", caption: "Bareilly: Golden hour rooftop panorama overlooking lush green treetop canopies and residential architecture of Bareilly in late afternoon warmth.", alt: "Bareilly Urban Canopy Sunset at Bareilly", span: 12, aspect: "landscape" },
      { id: "img-6-5", url: "/images/6C06B73F-8404-46A2-92AC-B04231913A92.jpg", caption: "Bareilly: Delicate pink oleander blossoms silhouetted against a golden-rose dusk gradient sky observed from a Bareilly haveli terrace.", alt: "Terrace Oleander at Sunset at Bareilly", span: 6, aspect: "portrait" },
      { id: "img-6-6", url: "/images/192036BF-B1BB-483F-AFD7-B9F96EBB69BA.jpg", caption: "Bareilly: Macro botanical study of broad tropical leaves and garden greenery under soft diffused afternoon daylight in an ancestral courtyard.", alt: "Courtyard Foliage Study at Bareilly", span: 6, aspect: "portrait" },
      { id: "img-6-7", url: "/images/IMG20250324140438.jpg", caption: "Civil Lines, Bareilly: Warm pendant lamps and textured wall finishes creating a quiet atmospheric dining interior in Civil Lines, Bareilly.", alt: "Civil Lines Interior Study at Civil Lines, Bareilly", span: 6, aspect: "portrait" },
      { id: "img-6-8", url: "/images/IMG_0039-4.jpg", caption: "Bareilly: Delicate crescent moon suspended in an emerald and cyan twilight gradient sky over the northern plains of Bareilly.", alt: "Crescent Moon over Bareilly Horizon at Bareilly", span: 6, aspect: "portrait" },
    ],
    credits: [
      { role: "Principal Photographer", name: "Aryan Patel" },
      { role: "Studio Production", name: "Studioza Atelier" },
    ],
    featured: false,
  },
  {
    id: "proj-7",
    slug: "fine-art-portraits",
    name: "Fine Art Portraits & Character Studies",
    subtitle: "Unhurried medium-format character studies captured in natural light across Rajasthan.",
    category: "portraits",
    year: "2026",
    location: "Jaipur & Chittorgarh, Rajasthan",
    client: "Studioza Atelier Private Commissions",
    coverImage: "/images/aryan-patel-temple-monochrome.jpg",
    intro: "Sculptural, timeless portraiture celebrating human gravity against centuries of weathered architectural history.",
    story: "Photographed on medium-format cameras using ambient desert illumination, this folio studies the interaction between the individual and sacred architectural spaces. Sittings conducted before the monolithic granite shikharas of Chittorgarh Fort, beneath the fluted red sandstone pillars of Amber Fort, and within the celestial mirror chambers of Sheesh Mahal capture character without artificial staging.",
    gallery: [
      { id: "img-7-1", url: "/images/aryan-patel-temple-monochrome.jpg", caption: "Chittorgarh Fort: Monolithic granite temple shikhara black-and-white study; deep-relief stone carvings and unhurried subject placement.", alt: "Aryan Patel Monolithic Shikhara Study at Chittorgarh Fort", span: 6, aspect: "portrait" },
      { id: "img-7-2", url: "/images/aryan-patel-sheesh-mahal.jpg", caption: "Sheesh Mahal, Amber Fort: Symmetrical portrait framed by the scalloped archway of the mirror palace; ambient twilight reflections.", alt: "Aryan Patel Sheesh Mahal Mirror Archway at Amber Fort", span: 6, aspect: "portrait" },
      { id: "img-7-3", url: "/images/aryan-patel-pillared-court.jpg", caption: "Diwan-e-Aam, Amber Fort: Sandstone column corridor under soft diffused courtyard illumination; architectural perspective and human scale.", alt: "Aryan Patel Diwan-e-Aam Colonnade Portrait at Amber Fort", span: 6, aspect: "portrait" },
      { id: "img-7-4", url: "/images/100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg", caption: "Amber Fort: Elevated sandstone plinth sitting beneath the Hall of Public Audience; morning stillness.", alt: "Diwan-e-Aam Plinth Sitting at Amber Fort", span: 6, aspect: "portrait" },
      { id: "img-7-5", url: "/images/01C9D4AC-86FE-4799-AF1F-8EFCCE5936C8_1_105_c.jpeg", caption: "Man Sagar Lake: Carved red sandstone promenade balustrade character study overlooking the distant water palace.", alt: "Man Sagar Promenade Character Study at Jal Mahal", span: 12, aspect: "landscape" },
      { id: "img-7-6", url: "/images/735BACB1-E54D-4358-B3C2-21DB91A3491C_1_105_c.jpeg", caption: "Chittorgarh Fort: Standing portrait beneath the sculpted stone facade of Vijay Stambha during evening golden hour.", alt: "Vijay Stambha Standing Portrait at Chittorgarh Fort", span: 6, aspect: "portrait" },
      { id: "img-7-7", url: "/images/C59CEBEA-EDC0-4FD0-9356-771216EB08F7.jpg", caption: "Bareilly: Natural daylight character portrait on an ancestral residential terrace under clear morning light.", alt: "Haveli Terrace Morning Sitting at Bareilly", span: 6, aspect: "portrait" },
      { id: "img-7-8", url: "/images/IMG_0081.jpg", caption: "Bareilly: Soft natural light character study against winter foliage along an avenue in Bareilly.", alt: "Winter Foliage Character Portrait at Bareilly", span: 6, aspect: "portrait" },
    ],
    credits: [
      { role: "Principal Photographer", name: "Aryan Patel" },
      { role: "Archival Lab", name: "Studioza Atelier" },
    ],
    featured: true,
  },
];

/* ========================================================================= */
/* EDITORIAL STORIES                                                         */
/* ========================================================================= */

export const STORIES: StoryData[] = [
  {
    id: "story-1",
    slug: "blue-hour-amber",
    title: "The Blue Hour Over Amber & Jaigarh",
    subtitle: "A study in high desert twilight, medium-format latitude, and fortress observation.",
    category: "Essays & Fieldwork",
    date: "October 2026",
    author: "Aryan Patel",
    readTime: "5 min read",
    coverImage: "/images/hilltop-fortress-crest.jpg",
    excerpt: "At 648 meters elevation, the light strikes the sandstone battlements of Jaigarh Fort with the brilliance of molten copper before dissolving into indigo.",
    editorialText1: "There is a 22-minute window after the sun slips below the Aravalli horizon when the sky stops being a light source and becomes an optical canvas. In commercial photography, clients are often afraid of darkness. At Studioza, we do the opposite: we turn off artificial illumination and let the silver halide chemistry gather faint photons over prolonged exposures.",
    plate1: "/images/fort-ramparts-overlook.jpg",
    plate1Caption: "Plate 01: Nahargarh Fort stepped ramparts descending toward the valley basin as night falls.",
    editorialText2: "When you stand on the battlements of Jaigarh Fort with a 4x5 field camera, looking toward Amber Fort and the lake below, the wind smells faintly of crushed sage and damp limestone. You cannot rush a view camera. You must mount the heavy wooden tripod, level the bubble gauges, drape the dark cloth over your skull, and look at the upside-down world projected upon the ground glass screen.",
    plate2: "/images/pelicans-lake.jpg",
    plate2Caption: "Plate 02: Jal Mahal Lake at dawn with migratory waterfowl resting on submerged stone foundations.",
    quote: "True luxury is not polished perfection; it is the courage to photograph the silence between events.",
    plate3: "/images/sandstone-palace-domes.jpg",
    plate3Caption: "Plate 03: Jas Mandir rooftop chhatri cupolas silhouetted against the receding twilight.",
    editorialConclusion: "A medium-format negative stands as an anchor: an unalterable chemical record of light that existed for one hundredth of a second in the Rajasthan mountains, preserved forever on archival cotton rag.",
    relatedProjectSlugs: ["jaipur-royal-citadels", "chittor-fort-monoliths"],
  },
  {
    id: "story-2",
    slug: "silver-halide-monsoon",
    title: "Silver Halide in the Himalayas & Jageshwar",
    subtitle: "Working with large format sheet film through the deodar groves of Jageshwar Dham, Almora.",
    category: "Craft & Technical",
    date: "August 2026",
    author: "Aryan Patel",
    readTime: "4 min read",
    coverImage: "/images/temple-shikhara-oleander.jpg",
    excerpt: "When sacred stones get rain, the colors change instantly from faded bone to saturated deep ochre.",
    editorialText1: "Photographers often pack their cameras away the moment rain begins. For us, monsoon is when the real palette reveals itself. Wet stone masonry and Himalayan cedar boughs have a tactile luster that no dry studio setup can replicate. We carry waterproof Pelican cases and keep our film holders sealed in silica-lined pouches.",
    plate1: "/images/temple-shikhara-oleander.jpg",
    plate1Caption: "Plate 01: Ancient Mahamrityunjaya stone temple shikhara with timber canopy amid deodar groves, Jageshwar Dham.",
    editorialText2: "The moisture in the atmosphere creates a natural diffusion filter, softening harsh midday contrast into an ethereal editorial glow. In Jageshwar Dham, ancient stone spires rise with solemn dignity through deodar mist.",
    plate2: "/images/21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg",
    plate2Caption: "Plate 02: Cobbled riverbed of the sacred Jata Ganga winding through dense deodar forests at Jageshwar Dham.",
    quote: "Rain does not ruin a photograph; it washes away the dust of habit.",
    plate3: "/images/IMG_0294.jpg",
    plate3Caption: "Plate 03: Early dawn mountain mist rolling over Almora pine ridges on the ascent to Jageshwar.",
    editorialConclusion: "Each plate from this expedition was hand-processed using rotary drum tanks and printed on Hahnemühle Photo Rag Baryta 315gsm paper.",
    relatedProjectSlugs: ["uttarakhand-sacred-sanctuaries", "chittor-fort-monoliths"],
  },
  {
    id: "story-3",
    slug: "crafting-the-heirloom",
    title: "Kashmir Waters & Archival Permanence",
    subtitle: "Documenting Dal Lake and Sonamarg on archival cotton paper.",
    category: "Philosophy",
    date: "July 2026",
    author: "Aryan Patel",
    readTime: "3 min read",
    coverImage: "/images/Dal_Lake.jpeg",
    excerpt: "A digital file is a ghost waiting to be forgotten on a failing drive. A physical monograph is an heirloom that outlives generations.",
    editorialText1: "At Studioza, we do not simply send an online gallery link and consider our commission finished. Every major expedition culminates in a hand-bound monograph. We work directly with bespoke bookbinders in Florence and Jaipur who bind each volume in Italian bookcloth and hand-marbled papers.",
    plate1: "/images/Dal_Lake.jpeg",
    plate1Caption: "Plate 01: Dal Lake dawn mist lifting over wooden shikaras and houseboats.",
    editorialText2: "Turning the pages of a 40x30 cm bound volume requires physical intention. You cannot swipe mindlessly. You sit down, feel the tooth of the cotton paper under your fingertips, and enter a state of contemplation.",
    plate2: "/images/IMG_0386.jpg",
    plate2Caption: "Plate 02: Sonamarg glacial valley and alpine meadow sitting before snowfields.",
    quote: "If an image is worth making, it is worth preserving for two hundred years.",
    plate3: "/images/IMG20250714135723.jpg",
    plate3Caption: "Plate 03: Srinagar valley hilltop survey overlooking Dal Lake waterways.",
    editorialConclusion: "We guarantee that our pigment inks will resist fading for more than 150 years under standard museum display conditions.",
    relatedProjectSlugs: ["kashmir-valley-expedition", "bareilly-monograph-series"],
  },
];

/* ========================================================================= */
/* SERVICES & DISCIPLINES                                                    */
/* ========================================================================= */

export const SERVICES: ServiceData[] = [
  {
    id: "serv-1",
    slug: "weddings",
    name: "Weddings & Celebrations",
    tagline: "Unstaged, cinematic multi-day monographs of grand heritage celebrations.",
    coverImage: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg",
    philosophy: "We treat your celebration not as a production checklist, but as an intimate historical event. We document the grand emotional arcs and the quiet glances in equal measure.",
    startingPrice: "From $8,500",
    included: [
      "Up to 3 full days of comprehensive coverage",
      "Principal photography personally directed by Aryan Patel",
      "Medium format digital & selected 35mm / 120 film plates",
      "Private password-protected digital archival repository",
      "Custom hand-bound bespoke 40x30cm leather monograph",
      "Full personal reproduction rights and high-res master files",
    ],
    process: [
      { step: "01", title: "Creative Dialogue", description: "Initial discovery session to understand family heritage, timeline, and aesthetic sensibilities." },
      { step: "02", title: "Location Scout & Light Mapping", description: "We visit your venues at exact times of day to map sun angles, shadow corridors, and private portrait nooks." },
      { step: "03", title: "Unhurried Shoot Days", description: "Discreet documentary presence that blends naturally among your guests while capturing monumental moments." },
      { step: "04", title: "Darkroom Grade & Print Delivery", description: "Bespoke digital negative grading, master archival curation, and hand-crafted heirloom album delivery." },
    ],
    faqs: [
      { question: "How far in advance do we need to book?", answer: "Due to our unhurried approach, we only accept 12 wedding commissions per year. We recommend booking 6 to 14 months in advance." },
      { question: "Do you travel internationally?", answer: "Yes. Half of our commissions take place across Europe, the Middle East, Southeast Asia, and North America." },
      { question: "When will we receive our photographs?", answer: "A curated preview set of 50 plates is delivered within 72 hours. The complete master archive and custom monograph are completed within 8 weeks." },
    ],
    portfolioSlugs: ["bareilly-monograph-series"],
  },
  {
    id: "serv-2",
    slug: "portraits",
    name: "Portraits & Monograph Studies",
    tagline: "Sculptural, timeless portraiture for artists, leaders, and families.",
    coverImage: "/images/aryan-patel-temple-monochrome.jpg",
    philosophy: "A great portrait is never taken; it is granted. We create a serene environment where the sitter's true internal gravity emerges without forced artifice.",
    startingPrice: "From $2,800",
    included: [
      "Full half-day or full-day studio/location session",
      "Creative direction, lighting consultation, and wardrobe harmony",
      "100MP Hasselblad / Phase One medium format capture",
      "Archival gallery of 30 curated and hand-retouched plates",
      "Three museum-grade cotton rag exhibition prints (16x20 in)",
      "Worldwide usage rights for personal and editorial press",
    ],
    process: [
      { step: "01", title: "Conceptual Framing", description: "Aligning on visual tone, lighting references, and wardrobe palette." },
      { step: "02", title: "The Sitting", description: "Relaxed, unhurried session with natural tea, conversation, and gradual camera observation." },
      { step: "03", title: "Plate Selection", description: "Collaborative curation of the strongest authentic character plates." },
      { step: "04", title: "Fine Art Pigment Prints", description: "Master retouching and archival printing on museum cotton stock." },
    ],
    faqs: [
      { question: "Where do sessions take place?", answer: "At our dedicated ateliers in Jaipur or on location across India and internationally." },
      { question: "Can we shoot both digital and film?", answer: "Yes, all portrait commissions include a hybrid selection of medium-format digital and 120 analog film." },
    ],
    portfolioSlugs: ["fine-art-portraits"],
  },
  {
    id: "serv-3",
    slug: "fashion",
    name: "Fashion & Editorial Campaigns",
    tagline: "Bold visual narratives that place couture within authentic architectural atmospheres.",
    coverImage: "/images/IMG20260906183457.jpg",
    philosophy: "We look beyond ephemeral trends to build campaigns that feel like timeless gallery exhibitions. Clothes come alive when juxtaposed with stone, wind, and geological scale.",
    startingPrice: "From $5,000 / day",
    included: [
      "Full creative direction and location scout",
      "Complete photography and digital tech team",
      "High-speed on-site tethering with client monitor stations",
      "Advanced color grading matching editorial publication standards",
      "Delivery of high-resolution master print files and social crops",
    ],
    process: [
      { step: "01", title: "Moodboard & Storyboard", description: "Building a coherent visual script, model selection, and location permits." },
      { step: "02", title: "Production Prep", description: "Rigorous coordination of styling, hair/makeup, and lighting logistics." },
      { step: "03", title: "The Shoot Day", description: "Paced, precision execution capturing cover-worthy heroic compositions." },
      { step: "04", title: "Editorial Delivery", description: "Color-managed digital delivery ready for immediate publication." },
    ],
    faqs: [
      { question: "Can you provide production crew and scouting?", answer: "Yes, our production team handles permits, logistics, local fixers, and talent casting." },
    ],
    portfolioSlugs: ["vrindavan-sacred-architecture"],
  },
  {
    id: "serv-4",
    slug: "commercial",
    name: "Expeditions & Commercial Travel",
    tagline: "Precision topographical and alpine expedition monographs for heritage institutions.",
    coverImage: "/images/Dal_Lake.jpeg",
    philosophy: "Capturing pristine wilderness, alpine water reflections, and natural geography in unhurried ambient light.",
    startingPrice: "From $4,500 / day",
    included: [
      "Tilt-shift and medium-format field camera expedition kits",
      "Multi-day sunrise, twilight, and evening blue-hour captures",
      "Topographical surveys and landscape fine art portfolios",
      "Full commercial licensing for web, print, and international publications",
    ],
    process: [
      { step: "01", title: "Expedition Route Audit", description: "Studying elevation schematics and solar paths." },
      { step: "02", title: "Light Tracking", description: "Timing each mountain pass to peak natural illumination." },
      { step: "03", title: "Precision Field Capture", description: "Medium-format perspective control without distortion." },
      { step: "04", title: "Retouching & Delivery", description: "Master tonal separation and archival cotton prints." },
    ],
    faqs: [
      { question: "How many views do you deliver per day?", answer: "Typically 8 to 15 museum-grade finished views per full expedition day." },
    ],
    portfolioSlugs: ["kashmir-valley-expedition"],
  },
  {
    id: "serv-5",
    slug: "architecture",
    name: "Forts & Heritage Architecture",
    tagline: "Large-format view camera documentation of historic citadels and monumental stone bastions.",
    coverImage: "/images/hilltop-fortress-crest.jpg",
    philosophy: "Structures have personalities shaped by how sunlight traces their facades throughout the day. We photograph fortresses and sanctuaries as living monuments.",
    startingPrice: "From $5,500 / day",
    included: [
      "Tilt-shift architectural view camera optics and 100MP plates",
      "Full solar-cycle coverage: dawn raking light, zenith, and blue hour",
      "Perspective correction and elevation orthographic views",
      "Museum exhibition print master files and archival monographs",
    ],
    process: [
      { step: "01", title: "Historic Research", description: "Studying archival drawings, historical accounts, and orientation." },
      { step: "02", title: "Solar Arc Mapping", description: "Calculating exact minute windows for stone relief contrast." },
      { step: "03", title: "Large Format Execution", description: "Unhurried technical tripod setups on fortress ramparts." },
      { step: "04", title: "Archival Printing", description: "Pigment prints with 150-year permanence on cotton rag." },
    ],
    faqs: [
      { question: "Do you handle heritage site access permissions?", answer: "Yes, our team liaises directly with archaeological authorities and private trusts." },
    ],
    portfolioSlugs: ["jaipur-royal-citadels", "chittor-fort-monoliths", "uttarakhand-sacred-sanctuaries"],
  },
  {
    id: "serv-6",
    slug: "events",
    name: "Cultural Galas & Private Events",
    tagline: "Discreet, high-art documentation of private dinners, Diwali galas, and summits.",
    coverImage: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg",
    philosophy: "The best event photography feels like a scene from an Italian art film—atmospheric, elegant, and observant without interrupting guests.",
    startingPrice: "From $3,500",
    included: [
      "Single or multi-photographer stealth coverage",
      "Live next-day press and PR image delivery",
      "Atmospheric candids, VIP portraits, and decor monographs",
      "Private guest download portal with custom branding",
    ],
    process: [
      { step: "01", title: "Timeline Coordination", description: "Reviewing schedule, VIP protocols, and key speeches." },
      { step: "02", title: "Low-Light Event Coverage", description: "Ambient-light mastery without disruptive flash bursts." },
      { step: "03", title: "Rapid Turnaround", description: "Selected highlight gallery within 24 hours." },
    ],
    faqs: [
      { question: "Do you use flash?", answer: "We prioritize natural ambient and warm bounce lighting to maintain the event atmosphere." },
    ],
    portfolioSlugs: ["bareilly-monograph-series", "vrindavan-sacred-architecture"],
  },
];

/* ========================================================================= */
/* TESTIMONIALS                                                              */
/* ========================================================================= */

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: "test-1",
    clientName: "Private Heritage Patron",
    clientRole: "Heritage Monograph Commission",
    quote: "Looking through our monograph felt like opening an issue of an Italian design journal. Aryan captured moments we did not even notice happening—the reverence, the quiet dignity of our families. It is the most precious object in our home.",
    eventOrProject: "Nahargarh Fort Celebration Monograph",
    location: "Jaipur, Rajasthan",
    year: "2026",
  },
  {
    id: "test-2",
    clientName: "The Heritage Review",
    clientRole: "Editorial Feature & Critical Review",
    quote: "Studioza brings a rare discipline back to photography. In an era dominated by hyper-processed digital churn, Aryan Patel's eye for architectural scale and unforced human emotion is singular. A true atelier in the classical sense.",
    eventOrProject: "Chittor & Jaigarh Fortress Feature",
    location: "Mumbai",
    year: "2026",
  },
  {
    id: "test-3",
    clientName: "Private Monograph Collector",
    clientRole: "Anniversary Legacy Commission",
    quote: "We were hesitant about photography. Aryan's presence was so unobtrusive and calm that after an hour we forgot a camera was in the room. The prints of Dal Lake and Jageshwar Dham on handmade cotton paper took our breath away.",
    eventOrProject: "Kashmir & Himalayan Monograph",
    location: "Srinagar / Almora",
    year: "2025",
  },
];

/* ========================================================================= */
/* SAMPLE INQUIRIES & BOOKINGS FOR ADMIN CRM                                 */
/* ========================================================================= */

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  budget: string;
  message: string;
  status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "BOOKED" | "ARCHIVED";
  createdAt: string;
}

export interface BookingItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string;
  location: string;
  details: string;
  status: "CONFIRMED" | "PENDING" | "COMPLETED";
  createdAt: string;
}

export const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-101",
    name: "Private Heritage Patron",
    email: "patron.wedding@heritageinquiry.com",
    phone: "+91 98112 34567",
    service: "Weddings",
    date: "December 12-14, 2026",
    location: "Nahargarh Fort, Jaipur",
    budget: "$12,000 - $18,000",
    message: "We are hosting an intimate celebration overlooking Jaipur. We admire your quiet, architectural treatment of fort archways and stone colonnades.",
    status: "NEW",
    createdAt: "Today at 09:15 AM",
  },
  {
    id: "inq-102",
    name: "Himalayan Trust Directorate",
    email: "directorate@himalayantrust.org",
    phone: "+91 98290 88765",
    service: "Commercial",
    date: "November 20, 2026",
    location: "Jageshwar Dham, Almora",
    budget: "$6,500",
    message: "Looking for a topographic and temple shikhara documentation series around the ancient deodar cedar groves.",
    status: "NEW",
    createdAt: "Yesterday at 04:30 PM",
  },
  {
    id: "inq-103",
    name: "Kashmir Alpine Expeditions",
    email: "editorial@kashmirexpeditions.com",
    phone: "+91 98199 44332",
    service: "Commercial",
    date: "January 15-18, 2027",
    location: "Dal Lake & Sonamarg",
    budget: "$8,000+",
    message: "Comprehensive landscape monograph capturing dawn boat crossings and glacial valley corridors.",
    status: "CONTACTED",
    createdAt: "2 days ago",
  },
  {
    id: "inq-104",
    name: "Mewar Cultural Council",
    email: "council@mewarculture.org",
    phone: "+91 99887 66554",
    service: "Commercial",
    date: "February 22-24, 2027",
    location: "Chittorgarh Fort",
    budget: "$7,000+",
    message: "Monolithic granite temple documentation and archival publication plates on 120 film.",
    status: "IN_PROGRESS",
    createdAt: "3 days ago",
  },
  {
    id: "inq-105",
    name: "Bareilly Heritage Society",
    email: "curator@bareillyheritage.in",
    phone: "+91 98450 12987",
    service: "Portraits",
    date: "November 5, 2026",
    location: "Bareilly, Uttar Pradesh",
    budget: "$4,500",
    message: "Haveli courtyard architectural monograph and legacy portrait series.",
    status: "BOOKED",
    createdAt: "1 week ago",
  },
];

export const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: "bk-201",
    clientName: "Private Heritage Patron",
    clientEmail: "patron.wedding@heritageinquiry.com",
    clientPhone: "+91 98123 45678",
    service: "Weddings & Celebrations",
    date: "November 18-20, 2026",
    location: "Nahargarh Fort, Jaipur",
    details: "3-day royal celebration. Full team, master albums, 120 film.",
    status: "CONFIRMED",
    createdAt: "Confirmed on Oct 1, 2026",
  },
  {
    id: "bk-202",
    clientName: "Alpine Heritage Expedition",
    clientEmail: "trust@alpineheritage.org",
    clientPhone: "+91 94140 11223",
    service: "Commercial Topography",
    date: "December 4-6, 2026",
    location: "Dal Lake & Sonamarg, Kashmir",
    details: "Topographic survey and dawn boat crossings.",
    status: "CONFIRMED",
    createdAt: "Confirmed on Sep 24, 2026",
  },
  {
    id: "bk-203",
    clientName: "Himalayan Heritage Trust",
    clientEmail: "press@himalayantrust.org",
    clientPhone: "+91 98299 44332",
    service: "Portraits & Monograph",
    date: "January 8-9, 2027",
    location: "Jageshwar Dham & Rishikesh",
    details: "Ancient deodar forest temples and Ganga riverbank sittings.",
    status: "PENDING",
    createdAt: "Requested on Oct 5, 2026",
  },
  {
    id: "bk-204",
    clientName: "Mewar Architectural Trust",
    clientEmail: "trust@mewararch.org",
    clientPhone: "+91 98765 43210",
    service: "Commercial Architecture",
    date: "January 22, 2027",
    location: "Chittorgarh Fort",
    details: "Monolithic granite temple towers and oleander studies.",
    status: "PENDING",
    createdAt: "Requested on Oct 6, 2026",
  },
];

/* ========================================================================= */
/* CLIENT PROOFING VAULT DATA                                               */
/* ========================================================================= */

export interface VaultPlate {
  id: string;
  code: string;
  title: string;
  url: string;
  aspect: "landscape" | "portrait" | "square" | "panoramic";
  filmOrFormat: string;
  iso: string;
  isFavorite?: boolean;
  comments?: Array<{ author: string; text: string; timestamp: string }>;
  isMonochrome?: boolean;
}

export interface VaultProject {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  clientEmail: string;
  eventDate: string;
  totalPlates: number;
  selectionTarget: number;
  status: "PROOFING_OPEN" | "IN_PRINT_REVIEW" | "FINALIZED";
  coverImage: string;
  passcode: string;
  plates: VaultPlate[];
}

export const VAULT_PROJECTS: VaultProject[] = [
  {
    id: "vault-1",
    slug: "jaipur-royal-citadels",
    title: "Royal Citadels of Jaipur",
    clientName: "Jaipur Heritage Patron",
    clientEmail: "patron@studioza.com",
    eventDate: "November 18–20, 2026",
    totalPlates: 428,
    selectionTarget: 50,
    status: "PROOFING_OPEN",
    coverImage: "/images/palace-arch-courtyard.jpg",
    passcode: "JAIPUR2026",
    plates: [
      { id: "plt-101", code: "PLT-001", title: "Nahargarh Fort Monumental Gateway", url: "/images/palace-arch-courtyard.jpg", aspect: "portrait", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 64 · 80mm · f/5.6", isFavorite: true, comments: [{ author: "Patron", text: "Front cover candidate for Vol. I", timestamp: "Yesterday" }] },
      { id: "plt-102", code: "PLT-002", title: "Jaigarh Fort Diwa Burj Crest", url: "/images/hilltop-fortress-crest.jpg", aspect: "landscape", filmOrFormat: "Fuji GFX 100 II", iso: "ISO 100 · 32-64mm · f/11", isFavorite: true, comments: [] },
      { id: "plt-103", code: "PLT-003", title: "Nahargarh Defensive Battlements", url: "/images/fort-ramparts-overlook.jpg", aspect: "portrait", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 100 · 45mm · f/8.0", isFavorite: false, comments: [] },
      { id: "plt-104", code: "PLT-004", title: "Man Sagar Lake Waterfowl Study", url: "/images/pelicans-lake.jpg", aspect: "portrait", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 200 · 150mm · f/5.6", isFavorite: true, comments: [] },
      { id: "plt-105", code: "PLT-005", title: "Aram Bagh Star Parterre & Palace Arcade", url: "/images/6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg", aspect: "landscape", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 400 · 80mm · f/4.0", isFavorite: true, comments: [] },
      { id: "plt-106", code: "PLT-006", title: "Kesar Kyari Geometric Parterre", url: "/images/B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg", aspect: "landscape", filmOrFormat: "Fuji GFX 100 II", iso: "ISO 100 · 23mm · f/8.0", isFavorite: false, comments: [] },
      { id: "plt-107", code: "PLT-007", title: "Jal Mahal Palace Mid-Water Elevation", url: "/images/0A0D9BAF-B62A-44B0-8277-A8CA18D75211_1_105_c.jpeg", aspect: "portrait", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 160 · 45mm · f/5.6", isFavorite: true, comments: [] },
    ],
  },
  {
    id: "vault-2",
    slug: "kashmir-valley-expedition",
    title: "Kashmir Valley Expedition",
    clientName: "Alpine Heritage Expedition",
    clientEmail: "patron.kashmir@studioza.com",
    eventDate: "January 22, 2027",
    totalPlates: 184,
    selectionTarget: 30,
    status: "PROOFING_OPEN",
    coverImage: "/images/Dal_Lake.jpeg",
    passcode: "KASHMIR2027",
    plates: [
      { id: "plt-201", code: "PLT-001", title: "Dal Lake Dawn Waterway Crossing", url: "/images/Dal_Lake.jpeg", aspect: "landscape", filmOrFormat: "Fuji GFX 100 II", iso: "ISO 100 · 45mm · f/8", isFavorite: true, comments: [] },
      { id: "plt-202", code: "PLT-002", title: "Dal Lake & Chinar Canopy Panorama", url: "/images/IMG20250714135723.jpg", aspect: "landscape", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 100 · 35mm · f/8", isFavorite: false, comments: [] },
      { id: "plt-203", code: "PLT-003", title: "Sonamarg Glacial Valley Sitting", url: "/images/IMG_0386.jpg", aspect: "portrait", filmOrFormat: "Phase One IQ4 150MP", iso: "ISO 100 · 120mm · f/5.6", isFavorite: true, comments: [] },
      { id: "plt-204", code: "PLT-004", title: "Pulwama Foothill Passage", url: "/images/IMG_0219.jpg", aspect: "portrait", filmOrFormat: "Kodak Portra 400 (120)", iso: "Hasselblad 80mm · f/4.0", isFavorite: false, comments: [] },
    ],
  },
  {
    id: "vault-3",
    slug: "chittor-fort-monoliths",
    title: "Chittor Fort Monoliths",
    clientName: "Mewar Architectural Trust",
    clientEmail: "trust@mewararch.org",
    eventDate: "February 10, 2027",
    totalPlates: 142,
    selectionTarget: 25,
    status: "PROOFING_OPEN",
    coverImage: "/images/20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg",
    passcode: "CHITTOR2027",
    plates: [
      { id: "plt-301", code: "PLT-001", title: "Samaddhisvara Temple Shikhara", url: "/images/20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg", aspect: "portrait", filmOrFormat: "Canon EOS 200D II", iso: "ISO 100 · 50mm · f/4.0", isFavorite: true, comments: [] },
      { id: "plt-302", code: "PLT-002", title: "Vijay Stambha Vertical Elevation", url: "/images/29BF8584-B26F-4208-8B45-C9DB235E8477_1_105_c.jpeg", aspect: "portrait", filmOrFormat: "Canon EOS 200D II", iso: "ISO 100 · 24mm · f/8.0", isFavorite: true, comments: [] },
      { id: "plt-303", code: "PLT-003", title: "Samaddhisvara Temple Monochrome Frieze", url: "/images/aryan-patel-temple-monochrome.jpg", aspect: "portrait", filmOrFormat: "Canon EOS 200D II", iso: "ISO 100 · 50mm · f/2.8", isMonochrome: true, isFavorite: true, comments: [] },
      { id: "plt-304", code: "PLT-004", title: "Chittor Rampart Overlook", url: "/images/93846B6A-81AF-4186-85C2-BD5F2415B13B_1_105_c.jpeg", aspect: "portrait", filmOrFormat: "Canon EOS 200D II", iso: "ISO 200 · 35mm · f/5.6", isFavorite: false, comments: [] },
    ],
  },
  {
    id: "vault-4",
    slug: "uttarakhand-sacred-sanctuaries",
    title: "Uttarakhand Sacred Sanctuaries",
    clientName: "Himalayan Archival Trust",
    clientEmail: "press@himalayantrust.org",
    eventDate: "March 15, 2027",
    totalPlates: 110,
    selectionTarget: 20,
    status: "PROOFING_OPEN",
    coverImage: "/images/temple-shikhara-oleander.jpg",
    passcode: "ALMORA2027",
    plates: [
      { id: "plt-401", code: "PLT-001", title: "Mahamrityunjaya Shikhara & Deodar Canopy", url: "/images/temple-shikhara-oleander.jpg", aspect: "portrait", filmOrFormat: "OnePlus 12R", iso: "ISO 50 · 24mm · f/1.8", isFavorite: true, comments: [] },
      { id: "plt-402", code: "PLT-002", title: "Jata Ganga Riverbed at Jageshwar", url: "/images/21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg", aspect: "landscape", filmOrFormat: "OnePlus 12R", iso: "ISO 64 · 24mm · f/2.0", isFavorite: true, comments: [] },
      { id: "plt-403", code: "PLT-003", title: "Parmarth Niketan Shiva Murti", url: "/images/27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg", aspect: "portrait", filmOrFormat: "OnePlus Nord CE 2", iso: "ISO 100 · 26mm · f/1.7", isFavorite: false, comments: [] },
      { id: "plt-404", code: "PLT-004", title: "Almora Pine Ridge Blue Hour", url: "/images/IMG_0294.jpg", aspect: "landscape", filmOrFormat: "Canon EOS 200D II", iso: "ISO 400 · 18mm · f/3.5", isFavorite: true, comments: [] },
    ],
  },
  {
    id: "vault-5",
    slug: "bareilly-monograph-series",
    title: "Bareilly Monograph Series",
    clientName: "Bareilly Heritage Society",
    clientEmail: "curator@bareillyheritage.in",
    eventDate: "April 5, 2027",
    totalPlates: 195,
    selectionTarget: 35,
    status: "PROOFING_OPEN",
    coverImage: "/images/A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg",
    passcode: "BAREILLY2027",
    plates: [
      { id: "plt-501", code: "PLT-001", title: "Bareilly Urban Canopy Sunset", url: "/images/A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg", aspect: "landscape", filmOrFormat: "OnePlus Nord CE 2", iso: "ISO 100 · 26mm · f/1.7", isFavorite: true, comments: [] },
      { id: "plt-502", code: "PLT-002", title: "Diwali Nocturne Pyrotechnics", url: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", aspect: "portrait", filmOrFormat: "OnePlus Nord CE 2", iso: "ISO 800 · 26mm · f/1.7", isFavorite: true, comments: [] },
      { id: "plt-503", code: "PLT-003", title: "Terrace Oleander at Sunset", url: "/images/6C06B73F-8404-46A2-92AC-B04231913A92.jpg", aspect: "portrait", filmOrFormat: "OnePlus Nord CE 2", iso: "ISO 100 · 26mm · f/1.7", isFavorite: false, comments: [] },
      { id: "plt-504", code: "PLT-004", title: "Devotional Home Mandir Sanctuary", url: "/images/IMG_0039-2.jpg", aspect: "portrait", filmOrFormat: "Canon EOS 200D II", iso: "ISO 400 · 50mm · f/2.8", isFavorite: true, comments: [] },
    ],
  },
];
