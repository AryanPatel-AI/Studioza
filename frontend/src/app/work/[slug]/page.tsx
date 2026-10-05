"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";

const PROJECT_DETAILS: Record<
  string,
  {
    title: string;
    category: string;
    year: string;
    location: string;
    heroImage: string;
    statement: string;
    context: string;
    discipline: string;
    optics: string;
    elevation: string;
    curatorialNotes: string;
    images: { src: string; caption: string }[];
  }
> = {
  "hilltop-citadel": {
    title: "Jaigarh Mountain Citadel",
    category: "Topographical Military Architecture",
    year: "2026",
    location: "Cheel ka Teela, Amber (26.9855° N, 75.8507° E)",
    heroImage: "/images/hilltop-fortress-crest.jpg",
    statement:
      "Massive stone bastions and watchtowers crowning the rugged Aravalli ridge under brooding atmospheric skies.",
    context:
      "Constructed in 1726 to protect the Amber Palace complex below, Jaigarh Fort's crenellated walls span rugged granite cliffs. Captured with medium-format optics during an overcast monsoon transition, isolating the dialogue between raw geologic topography and human stonecraft.",
    discipline: "Medium Format • 55mm • Diffuse Ambient Light",
    optics: "Schneider Kreuznach 55mm f/3.5 LS // 1/250s at f/8, ISO 100",
    elevation: "648m above sea level // Aravalli Escarpment Ridge",
    curatorialNotes:
      "The composition deliberately allocates two-thirds of the frame to the leaden, overcast sky, emphasizing the isolation and defensive posture of the Diwa Burj watchtower against the mountain terrain.",
    images: [
      { src: "/images/hilltop-fortress-crest.jpg", caption: "Plate 01 — Diwa Burj Watchtower & Mountain Crest" },
      { src: "/images/fort-ramparts-overlook.jpg", caption: "Plate 02 — Stepped Parapets & Water Harvesting Basin" },
      { src: "/images/sandstone-palace-domes.jpg", caption: "Plate 03 — Palace Pavilions in the Basin Below" },
      { src: "/images/city-aerial-overview.jpg", caption: "Plate 04 — Territorial Valley Overview" },
    ],
  },
  "temple-shikhara": {
    title: "Shikhara & Oleander Bloom",
    category: "Sacred Epigraphy & Living Flora",
    year: "2026",
    location: "Rajasthan Heritage Corridor (26.9220° N, 75.8267° E)",
    heroImage: "/images/temple-shikhara-oleander.jpg",
    statement:
      "Ancient carved stone temple spire framed through wild blooming oleander branches against an ethereal glowing sky.",
    context:
      "This study investigates the juxtaposition of enduring Nagara architectural permanence and fleeting botanical life. The intricately carved sandstone shikhara rises into the frame with its saffron dhwaja flag gently catching the breeze, softened by foreground oleander petals.",
    discipline: "Medium Format • 105mm • High-Key Illumination",
    optics: "Hasselblad HC 100mm f/2.2 // 1/500s at f/5.6, ISO 64",
    elevation: "430m above sea level // Sacred Hill Foot",
    curatorialNotes:
      "A high-key exposure blows out the overcast sky into a pure white field, isolating the silhouette of the stone shikhara and establishing dialogue between deep green oleander foliage and pale sandstone.",
    images: [
      { src: "/images/temple-shikhara-oleander.jpg", caption: "Plate 01 — Nagara Spire & Blooming Oleander" },
      { src: "/images/aryan-patel-temple-monochrome.jpg", caption: "Plate 02 — Shikhara Carving & Human Scale in Monochrome" },
      { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 03 — Chiaroscuro Arch & Sanctuary Transition" },
    ],
  },
  "courtyard-scale": {
    title: "Courtyard Scale & Living Heritage",
    category: "Cultural Space & Architectural Scale",
    year: "2026",
    location: "Amber Palace Complex (26.9855° N, 75.8513° E)",
    heroImage: "/images/ochre-palace-courtyard-scale.jpg",
    statement:
      "Sun-drenched terracotta and mineral ochre walls framing human movement across historic palace courtyards.",
    context:
      "Unlike static architectural photography, this monograph documents living heritage. The interplay of warm ochre lime plaster, Bangaldar curved eaves, and passersby captures the monumental volume of royal courtyards as active, inhabited cultural spaces.",
    discipline: "Medium Format • 35mm • Natural Tungsten Noon Light",
    optics: "Rodenstock 35mm f/4.5 HR // 1/400s at f/11, ISO 100",
    elevation: "510m above sea level // Palace Core Terraces",
    curatorialNotes:
      "The vertical compression highlights the monumental height of the palace facades compared to human visitors below, honoring centuries of lime-plaster patination and weathering.",
    images: [
      { src: "/images/ochre-palace-courtyard-scale.jpg", caption: "Plate 01 — Ochre Facades & Strolling Figures" },
      { src: "/images/aryan-patel-pillared-court.jpg", caption: "Plate 02 — Colonnade Perspective & Pillar Geometry" },
      { src: "/images/sandstone-palace-domes.jpg", caption: "Plate 03 — Bangaldar Roofline & Sky Boundary" },
      { src: "/images/temple-shikhara-oleander.jpg", caption: "Plate 04 — Adjacent Sanctuary & Flora" },
    ],
  },
  "amer-citadel": {
    title: "Amer Citadel Study",
    category: "Architectural Chiaroscuro",
    year: "2026",
    location: "Amer, Rajasthan (26.9855° N, 75.8513° E)",
    heroImage: "/images/palace-arch-courtyard.jpg",
    statement:
      "A monumental study in silhouette, deep shadow, and classical Rajasthani palace archways.",
    context:
      "Captured under natural high-noon illumination, this monograph explores the dramatic transition between dark monolithic corridors and the blazing light of the palace courtyard.",
    discipline: "Medium Format • 80mm • Archival Mineral Pigment",
    optics: "Mamiya 80mm f/2.8 Sekor // 1/320s at f/8, ISO 100",
    elevation: "515m above sea level // Amer Citadel Interior",
    curatorialNotes:
      "The exposure is keyed strictly to the bright exterior courtyard, allowing the monumental inner arches to fall into deep structural darkness that sculpts negative space.",
    images: [
      { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 01 — Monolithic Archway Framing" },
      { src: "/images/aryan-patel-pillared-court.jpg", caption: "Plate 02 — Pillared Colonnade Scale Study" },
      { src: "/images/sandstone-palace-domes.jpg", caption: "Plate 03 — Sandstone Pavilion Roofline" },
      { src: "/images/aryan-patel-sheesh-mahal.jpg", caption: "Plate 04 — Glass Inlay Hall Interior" },
    ],
  },
  "sandstone-domes": {
    title: "Sandstone Palace Domes",
    category: "Heritage Geometry & Sky",
    year: "2026",
    location: "Amber Fort, Rajasthan (26.9855° N, 75.8513° E)",
    heroImage: "/images/sandstone-palace-domes.jpg",
    statement:
      "Curvilinear Bangaldar pavilions and carved sandstone chhatris set against atmospheric turquoise heavens.",
    context:
      "Focusing on the golden yellow stone masonry that has endured centuries of desert monsoon cycles. Captured as high cirrus clouds soften the sky into a rich cyan canvas, with swallows darting between finials.",
    discipline: "Medium Format • 65mm • Natural Tungsten & Sky Illumination",
    optics: "Fujinon 65mm f/5.6 SW // 1/125s at f/11, ISO 100",
    elevation: "520m above sea level // Upper Terrace Pavilion",
    curatorialNotes:
      "A golden-yellow and cyan color harmony derived straight from unvarnished sandstone masonry and high-altitude desert atmosphere.",
    images: [
      { src: "/images/sandstone-palace-domes.jpg", caption: "Plate 01 — Curvilinear Eaves & Finial Symmetry" },
      { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 02 — Lower Corridor Chiaroscuro" },
      { src: "/images/fort-ramparts-overlook.jpg", caption: "Plate 03 — Ridge Wall Bastion Axis" },
      { src: "/images/city-aerial-overview.jpg", caption: "Plate 04 — Terraced Valley Settlement Below" },
    ],
  },
  "pelican-solitude": {
    title: "Sagar Lake Pelicans",
    category: "Wildlife Form & Riparian Stillness",
    year: "2026",
    location: "Sagar Lake, Amber (26.9875° N, 75.8560° E)",
    heroImage: "/images/pelicans-lake.jpg",
    statement:
      "Two pelicans resting on a solitary stone block in shimmering turquoise waters.",
    context:
      "An unhurried telephoto capture emphasizing stillness and organic form against the blurred monumental ramparts of the fort behind.",
    discipline: "Medium Format • 210mm • Natural Illumination",
    optics: "Schneider 210mm f/5.6 Apo-Symmar // 1/800s at f/5.6, ISO 160",
    elevation: "420m above sea level // Sagar Lake Basin",
    curatorialNotes:
      "The shallow depth-of-field isolates the two pelicans on their submerged masonry block, transforming the water surface into a luminous turquoise mirror.",
    images: [
      { src: "/images/pelicans-lake.jpg", caption: "Plate 01 — Pelicans on Submerged Stone Block" },
      { src: "/images/city-aerial-overview.jpg", caption: "Plate 02 — Sagar Valley Basin & Morning Mist" },
      { src: "/images/sandstone-palace-domes.jpg", caption: "Plate 03 — Fort Crest Silhouetted Against Horizon" },
    ],
  },
  "jaipur-aerial": {
    title: "Dense Masonry Aerial",
    category: "Urban Cartography & Atmosphere",
    year: "2025",
    location: "Jaipur, India (26.9124° N, 75.7873° E)",
    heroImage: "/images/city-aerial-overview.jpg",
    statement:
      "High-vantage panoramic study of historic urban density, rooftops, and soaring birds in misty morning light.",
    context:
      "Looking down from the hill forts over centuries of contiguous stone architecture, captured during morning mist with black kites wheeling in the thermal currents.",
    discipline: "Medium Format • 45mm • ISO 100",
    optics: "Mamiya 45mm f/2.8 // 1/500s at f/8, ISO 100",
    elevation: "590m above sea level // Nahargarh Edge",
    curatorialNotes:
      "Captures the grid-like precision of historic Jaipur architecture dissolving into morning haze with birds in flight adding kinetic life.",
    images: [
      { src: "/images/city-aerial-overview.jpg", caption: "Plate 01 — Dense Urban Fabric & Roof Terraces" },
      { src: "/images/fort-ramparts-overlook.jpg", caption: "Plate 02 — Watchtower Bastion Viewpoint" },
      { src: "/images/sandstone-palace-domes.jpg", caption: "Plate 03 — Pavilion Shading Above Settlement" },
    ],
  },
  "fort-ramparts": {
    title: "Fort Ramparts & High Ridge",
    category: "Territorial Architecture & Bastions",
    year: "2026",
    location: "Jaigarh Fort, Rajasthan (26.9855° N, 75.8507° E)",
    heroImage: "/images/fort-ramparts-overlook.jpg",
    statement:
      "Ancient stepped ramparts and historic rainwater harvesting infrastructure snaking across rugged mountain ridges.",
    context:
      "Commissioned to document how ancient civil defense and water engineering formed a unified topological system. The crenellated parapets follow the steep contours of the Aravalli range with monolithic gravitas.",
    discipline: "Medium Format • 50mm • Natural Ambient Light",
    optics: "Schneider 50mm f/4 LS // 1/250s at f/11, ISO 100",
    elevation: "640m above sea level // Fort Western Battlement",
    curatorialNotes:
      "Features the historic 'Taanka' rainwater harvesting signage, documenting ingenious indigenous water collection across desert fortresses.",
    images: [
      { src: "/images/fort-ramparts-overlook.jpg", caption: "Plate 01 — Crenellated Parapets & Harvesting Tank" },
      { src: "/images/city-aerial-overview.jpg", caption: "Plate 02 — Valley Settlement Cartography" },
      { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 03 — Interior Bastion Gateways" },
    ],
  },
  "monochrome-temple": {
    title: "Monolithic Shikhara Expedition",
    category: "Epigraphical Heritage & Form",
    year: "2025",
    location: "Rajasthan Heritage Corridor (26.9200° N, 75.8200° E)",
    heroImage: "/images/aryan-patel-temple-monochrome.jpg",
    statement:
      "Black and white study of an ancient carved stone temple spire, exploring tactile masonry, weathering, and human scale.",
    context:
      "Captured on silver gelatin film emulation, stripping all color to isolate the intricate rhythms of stone carving, multi-tiered shikhara spires, and the quiet presence of the expeditioner.",
    discipline: "Monochrome Silver Gelatin Emulsion • 90mm • High Contrast",
    optics: "Leica 90mm f/2.5 Summarit // 1/640s at f/5.6, Tri-X 400",
    elevation: "460m above sea level // Monolithic Temple Precinct",
    curatorialNotes:
      "Stripped of color to focus purely on the sculptural relief and deep erosion grooves carved into centuries-old stone blocks.",
    images: [
      { src: "/images/aryan-patel-temple-monochrome.jpg", caption: "Plate 01 — Temple Spire & Expeditioner Scale" },
      { src: "/images/aryan-patel-sheesh-mahal.jpg", caption: "Plate 02 — Sheesh Mahal Glass Mosaic Study" },
      { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 03 — Palace Archway Light Study" },
    ],
  },
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug || "";

  const project =
    PROJECT_DETAILS[slug] || {
      title: slug.replace(/-/g, " ").toUpperCase(),
      category: "Architectural Photography",
      year: "2026",
      location: "Studioza Atelier Archive",
      heroImage: "/images/palace-arch-courtyard.jpg",
      statement:
        "An exploration into spatial form, texture, and light, challenging the modern norms of synthetic smoothing.",
      context:
        "The project required a ground-up conceptualization of structural identity. We approached the commission with a classical darkroom discipline, treating digital capture with silver halide patience.",
      discipline: "Medium Format • Silver Halide Discipline",
      optics: "Medium Format Prime Optics",
      elevation: "Archival Field Coordinates",
      curatorialNotes: "Archival monograph preserved in the Studioza permanent collection.",
      images: [
        { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 01 — Spatial Geometry" },
        { src: "/images/pelicans-lake.jpg", caption: "Plate 02 — Riparian Quietude" },
        { src: "/images/city-aerial-overview.jpg", caption: "Plate 03 — Environmental Scale" },
      ],
    };

  return (
    <div className="min-h-screen bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)] relative font-sans">
      <FilmGrain />
      <Navbar />

      <main>
        {/* HERO VISUAL */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-[var(--bg-deep-night)]">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute inset-0"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              className="object-cover opacity-90 contrast-[1.06]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep-night)] via-[var(--bg-deep-night)]/25 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-16 max-w-7xl mx-auto w-full z-10">
            <span className="type-meta text-[var(--accent-muted-gold)] mb-3 uppercase tracking-widest">
              {project.location} // {project.category}
            </span>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="type-display-hero text-[var(--bg-warm-ivory)] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
            >
              {project.title}
            </motion.h1>
          </div>
        </section>

        {/* METADATA & CURATORIAL CONTEXT STORY */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[var(--border-medium)] pb-24">
          <div className="md:col-span-4 flex flex-col gap-6 type-meta text-[var(--ink-muted)]">
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Location &amp; Coordinates
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.location}</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Elevation &amp; Topography
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.elevation}</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Optical Rig &amp; Exposure
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.optics}</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Discipline
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.discipline}</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Archival Year
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.year}</p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-8">
            <h2 className="type-display-statement text-[var(--ink-primary)]">
              {project.statement}
            </h2>
            <div className="type-body-base text-[var(--ink-body)] space-y-6 max-w-2xl leading-relaxed">
              <p>{project.context}</p>
              {project.curatorialNotes && (
                <div className="border-l-2 border-[var(--accent-dark-bronze)] pl-6 py-2 bg-[var(--bg-slate)]/40 text-[var(--ink-primary)] font-serif italic">
                  &ldquo;{project.curatorialNotes}&rdquo;
                </div>
              )}
              <p className="text-xs uppercase tracking-wider text-[var(--ink-muted)]">
                Printed on 310gsm Hahnemühle Photo Rag Baryta with archival mineral pigment inks. Strictly zero synthetic smoothing.
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE SEQUENCE */}
        <section className="py-24 bg-[var(--bg-deep-night)] text-[var(--ink-inverse)]">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12 space-y-24">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="type-meta text-[var(--accent-muted-gold)] uppercase tracking-widest block mb-2">
                Curatorial Plates
              </span>
              <h3 className="type-display-title text-[var(--bg-warm-ivory)]">Archival Sequence</h3>
            </div>

            {/* Sequence 1: Full-Width Monolith */}
            {project.images[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-[var(--bg-slate)]">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center type-meta text-[var(--ink-inverse-muted)] pt-2">
                  <span>01 // {project.images[0].caption}</span>
                  <span>100% UNCOMPRESSED RAW</span>
                </div>
              </motion.div>
            )}

            {/* Sequence 2 & 3: Staggered Pair */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {project.images[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="space-y-4"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-slate)]">
                    <Image
                      src={project.images[1].src}
                      alt={project.images[1].caption}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="type-meta text-[var(--ink-inverse-muted)] pt-2">
                    02 // {project.images[1].caption}
                  </div>
                </motion.div>
              )}

              {project.images[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-4 md:mt-24"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-slate)]">
                    <Image
                      src={project.images[2].src}
                      alt={project.images[2].caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="type-meta text-[var(--ink-inverse-muted)] pt-2">
                    03 // {project.images[2].caption}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CREDITS & PAGINATION */}
        <section className="py-32 px-6 lg:px-12 bg-[var(--bg-warm-ivory)] border-t border-[var(--border-medium)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <h3 className="type-meta text-[var(--ink-muted)] mb-4 uppercase tracking-widest text-xs">
                Credits
              </h3>
              <ul className="type-body-base space-y-2 text-[var(--ink-body)]">
                <li>
                  <span className="text-[var(--ink-muted)]">Photographer:</span> Aryan Patel
                </li>
                <li>
                  <span className="text-[var(--ink-muted)]">Curation:</span> Studioza Atelier Archive
                </li>
                <li>
                  <span className="text-[var(--ink-muted)]">Medium:</span> Medium Format Film &amp; Raw Capture
                </li>
              </ul>
            </div>

            <div className="text-left md:text-right">
              <span className="type-meta text-[var(--ink-muted)] block mb-4 uppercase tracking-widest text-xs">
                Navigation
              </span>
              <Link
                href="/work"
                className="type-display-title hover:text-[var(--accent-dark-bronze)] transition-colors"
              >
                Archive Overview &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
