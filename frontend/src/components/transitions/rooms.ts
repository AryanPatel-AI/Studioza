export interface RoomInfo {
  path: string;
  number: string;
  title: string;
  subtitle: string;
  optics: string;
  ambientTone: string;
}

export const ATELIER_ROOMS: Record<string, RoomInfo> = {
  "/": {
    path: "/",
    number: "ROOM I",
    title: "The Atelier Entrance",
    subtitle: "Anthology, Manifestos & Light Studies",
    optics: "Hasselblad H6D-100c • HC 100mm f/2.2",
    ambientTone: "amber",
  },
  "/main": {
    path: "/main",
    number: "ROOM II",
    title: "The Permanent Archive",
    subtitle: "Curatorial Exhibition & Visual Salon",
    optics: "Phase One IQ4 150MP • Schneider 80mm",
    ambientTone: "tungsten",
  },
  "/contact": {
    path: "/contact",
    number: "ROOM III",
    title: "Private Correspondence",
    subtitle: "Commissions & Encrypted Atelier Dispatch",
    optics: "Leica M11 Monochrom • Summilux-M 35mm",
    ambientTone: "champagne",
  },
  "/dashboard": {
    path: "/dashboard",
    number: "ROOM IV",
    title: "The Creator Workspace",
    subtitle: "Digital Darkroom & Production Suites",
    optics: "Calibrated Eizo CG319X • 16-Bit ProPhoto",
    ambientTone: "navy",
  },
  "/projects": {
    path: "/projects",
    number: "ROOM IV",
    title: "Atelier Commissions",
    subtitle: "Active Monographs & Digital Negatives",
    optics: "Silver-Gelatin Proofing Systems",
    ambientTone: "navy",
  },
  "/activity": {
    path: "/activity",
    number: "ROOM IV",
    title: "Atelier Telemetry",
    subtitle: "Chronological Darkroom Ledger & Audit",
    optics: "Encrypted Activity Stream",
    ambientTone: "navy",
  },
  "/settings": {
    path: "/settings",
    number: "ROOM V",
    title: "Atelier Calibration",
    subtitle: "Patron Profile, Security & Output Profiles",
    optics: "ICC Baryta Emulsion Calibration",
    ambientTone: "selenium",
  },
  "/login": {
    path: "/login",
    number: "ROOM 0",
    title: "Atelier Gate",
    subtitle: "Patron Sign-In & Security Clearance",
    optics: "256-Bit Encrypted Authorization",
    ambientTone: "amber",
  },
  "/signup": {
    path: "/signup",
    number: "ROOM 0",
    title: "New Atelier Account",
    subtitle: "Workspace Creation & Registration",
    optics: "Patron Key Generation",
    ambientTone: "amber",
  },
};

export function getRoomInfo(pathname: string): RoomInfo {
  // Direct exact match
  if (ATELIER_ROOMS[pathname]) {
    return ATELIER_ROOMS[pathname];
  }

  // Nested project monograph routes
  if (pathname.startsWith("/projects/")) {
    return {
      path: pathname,
      number: "ROOM IV",
      title: "Project Monograph",
      subtitle: "Curatorial Plate Inspection & Grading",
      optics: "Macro Micro-Contrast Review",
      ambientTone: "navy",
    };
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    return {
      path: pathname,
      number: "VAULT",
      title: "Executive Atelier Vault",
      subtitle: "Director Inquiries & Archival Administration",
      optics: "Master Studio Console",
      ambientTone: "tungsten",
    };
  }

  // Default fallback room
  return {
    path: pathname,
    number: "ATELIER",
    title: "Studioza Exhibition",
    subtitle: "Fine Art Photography & Optical Craft",
    optics: "Zeiss Otus 85mm f/1.2 APO",
    ambientTone: "amber",
  };
}
