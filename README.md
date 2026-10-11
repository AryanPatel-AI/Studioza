# Studioza — Photography Studio Platform & Editorial Magazine

> **A Digital Photography Magazine & Fine Art Atelier**  
> *Cinematic · Editorial · Minimal · Sophisticated · Emotional · Premium*

Studioza is an editorial photography platform, fine-art archival engine, and creative CMS operating at the intersection of medium-format discipline, unhurried observation, and architectural presence.

---

## 🏛️ Exact Page Architecture

### Public Magazine, Archive & Atelier
| Route | Description |
|---|---|
| `/` | **Cinematic Homepage** — Hero, Statement, Selected Work, Featured Story, Services, Philosophy, Plates, Testimonials, Journal, CTA |
| `/collections` | **Curated Geographic Archive** — Location monographs organized by destination with category & orientation filters (*All Formats*, *Landscape 3:2*, *Portrait 2:3*) |
| `/collections/[slug]` | **Destination Monograph** — Individual collection detail with separate *Folio 01 // Horizons* and *Folio 02 // Verticality* grids, metadata drawer, and full darkroom lightbox |
| `/portfolio` | **Portfolio Index** — Category tabs and editorial layouts (*Large / Dual / Large / Dual*) |
| `/portfolio/[category]` | **Category Archives** — `/portfolio/weddings`, `/portfolio/portraits`, `/portfolio/fashion`, `/portfolio/commercial` |
| `/project/[slug]` | **Project Detail** — Hero, Metadata, Intro, Full Gallery separated into Landscape & Portrait folios, Monograph Narrative, Credits, CTA |
| `/stories` | **Editorial Stories** — Featured photo essay, story grid, publication newsletter |
| `/stories/[slug]` | **Story Detail** — Hero → Headline → Metadata → Editorial Text → Plates → Pull Quote → Plates → Related Monographs |
| `/services` | **Services Overview** — Weddings, Portraits, Fashion, Commercial, Events |
| `/services/[slug]` | **Service Detail** — Hero, Philosophy, Inclusions, 4-Stage Process, Portfolio Examples, FAQs, Booking CTA |
| `/about` | **About Atelier** — Aryan Patel portrait, studio statement, genesis story, 3 pillars, stats, awards, team, CTA |
| `/journal` | **Journal & Field Notes** — Technical experiments, silver halide chemistry, darkroom reflections |
| `/journal/[slug]` | **Journal Article** — In-depth field note reading experience |
| `/vault` | **Client Proofing Vault Portal** — Private access point for patrons and commissioned projects |
| `/vault/project/[id]` | **Private Proofing Folio** — Passcode-protected client proofing interface with favorites, proofing status, and plate feedback |
| `/contact` | **Contact Portal** — Direct inquiry form, studio coordinates (Email, Phone, Instagram, Regional Ateliers) |
| `/booking` | **Multi-Step Booking Flow** — 01 Service → 02 Date → 03 Location → 04 Details → 05 Contact → 06 Review → 07 Submitted |
| `/privacy` | **Privacy Policy** — Image rights, negative preservation, client confidentiality |
| `/terms` | **Terms of Commission** — Retainers, copyright, archival print production, weather contingencies |

### Protected Admin & Curation Applications
| Route | Description |
|---|---|
| `/admin` | Redirects to `/admin/dashboard` |
| `/admin/login` | Darkroom styled login portal |
| `/admin/dashboard` | Executive overview (Leads, Bookings, Projects, Pending, Inquiries, Production Calendar) |
| `/admin/curation` | **Curatorial Intelligence Hub** — Multi-agent pipeline triggers, real-time QA audit scores, cluster inspector, and hero quality dossiers |
| `/admin/projects` | Monograph registry with search, category filtering, and plate count |
| `/admin/projects/new` | Full monograph publisher form |
| `/admin/projects/[id]` & `.../edit` | Metadata, category, story, and plate editor |
| `/admin/galleries` & `.../[id]` | Visual plate sequencer and caption curatorial tool |
| `/admin/stories` & `.../new` & `.../[id]` | Magazine publication CMS for essays and field notes |
| `/admin/services` & `.../[id]` | Discipline deliverables, starting rates, and philosophy editor |
| `/admin/testimonials` | Client reviews and editorial press quotes manager |
| `/admin/inquiries` & `.../[id]` | Commission CRM pipeline with status triage (NEW, CONTACTED, IN_PROGRESS, BOOKED, ARCHIVED) |
| `/admin/bookings` & `.../[id]` | Scheduled calendar pipeline with client production dossiers |
| `/admin/media` | Archival negative library with copyable storage keys and metadata inspection |
| `/admin/users` | Role-based team access control (ADMIN, EDITOR, PHOTOGRAPHER) |
| `/admin/analytics` | Readership telemetry, monograph completion rates, and patron demographics |
| `/admin/settings` | Global studio colophon, SEO meta tags, and inquiry notification dispatch routing |

---

## 🤖 Multi-Agent Editorial Curation Engine

Studioza implements an autonomous multi-agent curation workflow (`frontend/src/lib/curation/`) inspired by traditional high-fashion editorial ateliers:

```
┌─────────────────────────────────────────────────────────────┐
│               Image Ingestion Agent (Agent 1)               │
│      Scans photographic registry & extracts optics/EXIF     │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          Location & Photoshoot Grouping (Agent 2)           │
│     Clusters by geographic coordinates, elevations & sites  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          Image Quality & Hero Selection (Agent 3)           │
│      Sharpness scoring, composition, and hero anchors       │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│         Editorial Caption & Metadata Agent (Agent 4)        │
│    Researches architectural history, regional essays & GPS  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          Collection Builder & Sequencer (Agent 5)           │
│    Assembles curated monograph editions & plate sequencing  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               QA & Consistency Audit (Agent 6)              │
│    Verifies 100% hero coverage, orientation tags & captions │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              Pipeline Registry & Cache (Agent 7)            │
│   Unified API endpoints & live /admin/curation telemetry    │
└─────────────────────────────────────────────────────────────┘
```

1. **Agent 1: Image Ingestion Agent** (`ingestionAgent.ts`): Normalizes asset dimensions, natural pixel density, sensor ratings, and lens metadata.
2. **Agent 2: Location & Photoshoot Grouping Agent** (`locationGroupingAgent.ts`): Clusters raw assets into distinct geographic and thematic monographs:
   - *Jageshwar Dham Monoliths* (Almora, Uttarakhand · 1,870m)
   - *Jaigarh Mountain Citadel* (Aravalli Range, Rajasthan · 648m)
   - *Royal Heritage Celebration* (Jaipur, Rajasthan · 431m)
   - *Echoes in Convex Glass* (Amer Palace of Mirrors, Rajasthan · 510m)
   - *Bareilly Haveli & Northern Plains* (Bareilly, Uttar Pradesh · 168m)
   - *Dal Lake & Kashmir Waters* (Srinagar, Kashmir · 1,583m)
3. **Agent 3: Image Quality & Hero Selection Agent** (`heroQualityAgent.ts`): Evaluates technical micro-contrast, focal accuracy, and editorial negative space to crown each location's primary cover image.
4. **Agent 4: Editorial Caption & Metadata Agent** (`editorialCaptionAgent.ts`): Generates architectural descriptions, historical essays, GPS coordinates, and curatorial rationale.
5. **Agent 5: Editorial Collection Builder** (`collectionBuilderAgent.ts`): Assembles complete collections with ordered plates, slug routing, and regional metadata.
6. **Agent 6: QA & Consistency Audit Agent** (`qaAgent.ts`): Performs automated health checks on orphan plates, missing covers, and orientation fidelity.
7. **Agent 7: Pipeline Registry** (`curationRegistry.ts`): Provides synchronous and asynchronous orchestration with persistent in-memory caching.

---

## 🖼️ Aspect Ratio Separation & Archival Preservation

Studioza enforces strict adherence to original photographic framing:

* **Separated Exhibition Folios**:
  - **Folio 01 // Horizons**: Dedicated 2-column wide exhibition grid for Landscape (3:2) master plates.
  - **Folio 02 // Verticality**: Dedicated 3-column archival grid for Portrait & Vertical (2:3 & 3:4) studies.
* **Interactive Orientation Switchers**: Users and patrons can toggle between `All Formats`, `Landscape (3:2)`, and `Portrait (2:3)` in both collection galleries and project monographs.
* **100% Master Quality Preservation**: Images are rendered with uncompressed fidelity (`unoptimized`, `quality={100}`, `object-contain`) within proportional darkroom mounts to prevent crop distortion or resolution loss.

---

## 🎨 Visual Design System

### Design Tokens
```css
--bg-primary:       #F4F1EB;   /* Editorial Warm Paper */
--text-primary:     #151515;   /* Deep Editorial Charcoal */
--text-secondary:   #77736D;   /* Refined Warm Grey */
--bg-dark:          #171717;   /* Rich Cinematic Dark Room */
--white:            #FFFFFF;   /* Pure White */
--border-editorial: #D9D5CE;   /* Fine Framing Border */
--accent-gold:      #CFA570;   /* Muted Golden Hour Accent */
```

### Typography System
* **Display & Editorial Headlines**: *Cormorant Garamond* (Serif)
* **Interface & Metadata**: *Inter* (Grotesque Sans-Serif)
* **Technical Monospaced Labels**: *JetBrains Mono* / System Monospace

### Typography Scale
* **Display XL**: `96px` (`clamp(3.75rem, 8vw, 6rem)`)
* **Display L**: `72px` (`clamp(3rem, 6vw, 4.5rem)`)
* **Display M**: `56px` (`clamp(2.25rem, 4.5vw, 3.5rem)`)
* **Heading XL**: `48px`
* **Heading L**: `40px`
* **Heading M**: `32px`
* **Body L**: `20px`
* **Body**: `16px`
* **Small**: `14px`
* **Micro**: `11px` (Uppercase metadata, tracking-widest)

### Motion Language
* **Image reveal**: `opacity: 0 → 1`, `scale: 1.04 → 1`
* **Text reveal**: `translateY(30px) → 0`, `opacity: 0 → 1`
* **Hover zoom**: `scale: 1 → 1.03` over `1.2s` easing
* **Accessibility**: Strict respect for `prefers-reduced-motion`

---

## 💾 Database Schema (Prisma ORM)

Models in `backend/prisma/schema.prisma`:
* `User` & `Role` (ADMIN, EDITOR, PHOTOGRAPHER)
* `Category` (Weddings, Portraits, Fashion, Commercial)
* `Project` & `ProjectImage`
* `Story` & `StoryImage`
* `Service` & `Package`
* `Testimonial`
* `Inquiry`
* `Booking`
* `Media`
* `Asset` & `Activity`
* `SiteSetting`

---

## 🚀 Development & Build

```bash
# Install root dependencies
npm install

# Run database generation
npm run db:generate

# Start frontend development server
npm run dev:frontend

# Validate production build (85 routes)
npm --prefix frontend run build
```
