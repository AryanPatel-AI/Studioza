# Studioza — Multi-Agent Engineering Architecture & Domain Decomposition

> **Objective**: Deconstruct the Studioza build plan into six autonomous, strictly decoupled agent domains.  
> **Execution Standard**: Zero AI footprints. Every line of code, documentation, schema, and copy must reflect deliberate senior human craftsmanship, idiomatic TypeScript, and the Studioza Editorial Voice Guide.

---

## 1. Domain Boundary & Agent Matrix

To eliminate conflicts, overlapping edits, and synthetic code patterns, each agent owns an explicit slice of the monorepo, a defined input/output contract, and unambiguous exit criteria.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MONOREPO WORKSPACE                                │
│                                                                             │
│  packages/shared/             backend/                    frontend/         │
│  ┌──────────────────────┐    ┌──────────────────────┐    ┌────────────────┐ │
│  │ AGENT 2:             │    │ AGENT 1:             │    │ AGENT 4:       │ │
│  │ Shared Contracts &   │◄───┤ Atelier Schema & DB  │    │ Public Folio   │ │
│  │ Validation Guardian  │    │ (Prisma & Postgres)  │    │ Experience     │ │
│  └──────────┬───────────┘    └──────────┬───────────┘    └───────┬────────┘ │
│             │                           │                        │          │
│             ▼                           ▼                        ▼          │
│  ┌──────────────────────┐    ┌──────────────────────┐    ┌────────────────┐ │
│  │ AGENT 3:             │    │ AGENT 6:             │    │ AGENT 5:       │ │
│  │ Core API & Outbox    │◄───┤ QA, Security & Test  │◄───┤ Studio Desk    │ │
│  │ Worker Service       │    │ Hardening Inspector  │    │ Admin & CMS    │ │
│  └──────────────────────┘    └──────────────────────┘    └────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Agent Specifications

### Agent 1: Atelier Schema & Persistence Architect
* **Domain**: `backend/prisma/schema.prisma`, `backend/prisma/migrations/`, `backend/prisma/seed.ts`
* **Core Mission**: Establish the relational persistence engine for Studioza with zero data redundancy and rock-solid referential integrity.
* **Scope & Boundaries**:
  - Implements the complete editorial model: `User`, `Role`, `Category`, `Project`, `ProjectImage`, `ProjectAssignment`, `Media`, `Asset`, `Booking`, `Inquiry`, `NotificationOutbox`, `Activity`, `SiteSetting`, `Story`, `StoryImage`, `Service`, `Package`, `Testimonial`, `ServiceProject`.
  - Enforces `onDelete: Restrict` on `Media` while linked to any `ProjectImage` or `StoryImage`.
  - Avoids `@@unique([projectId, sortOrder])` to allow atomic transaction batch reordering; uses composite index `@@index([projectId, sortOrder])`.
  - Defines `Booking.preferredDate` as pure `Date` and links time-of-day logic to the studio's configured timezone (`Asia/Kolkata`).
  - Authors a production seed script populating real photographic monographs, plate series, and realistic darkroom records.
* **Deliverables**:
  - `backend/prisma/schema.prisma`
  - `backend/prisma/seed.ts`
  - Working migration files
* **Anti-Footprint Mandate**: No placeholder mock data; use genuine camera technical metadata (Leica M11, Hasselblad 500C/M, Kodak Portra 400).

---

### Agent 2: Shared Contracts & Validation Guardian
* **Domain**: `packages/shared/`
* **Core Mission**: Create the immutable contract package shared identically between frontend and backend.
* **Scope & Boundaries**:
  - Sets up `@studio/shared` workspace package with TypeScript and Zod.
  - Exports Zod schemas and inferred types for:
    - Auth credentials and session payloads.
    - Project, Monograph, and Story drafts and publishing payloads.
    - Plate sequencer batch patch: `z.array(z.object({ id: z.string(), sortOrder: z.number(), layout: z.enum(['FULL', 'PAIR']), isCover: z.boolean(), caption: z.string().optional(), altText: z.string() }))`.
    - Inquiry creation and status transitions.
    - Booking seven-step payload including idempotency key and date validation (`preferredDate` in future, `backupDate` > `preferredDate`).
    - Media upload presigning request.
  - Implements the unified RBAC policy function `can(user, action, resource)` covering `ADMIN`, `EDITOR`, and `PHOTOGRAPHER` with protection against self-promotion and last-admin demotion.
* **Deliverables**:
  - `packages/shared/package.json`
  - `packages/shared/tsconfig.json`
  - `packages/shared/src/schemas/` (auth, project, inquiry, booking, media)
  - `packages/shared/src/permissions/can.ts`
  - `packages/shared/src/permissions/can.test.ts`
* **Anti-Footprint Mandate**: Pure TypeScript, exhaustive test coverage for `can()`, zero `any` types.

---

### Agent 3: Core API & Outbox Worker Engineer
* **Domain**: `backend/src/`
* **Core Mission**: Build a fast, secure, headless REST API server with transactional outbox processing.
* **Scope & Boundaries**:
  - Express server with request-ID middleware (`x-request-id`), structured logging, and strict CORS.
  - Argon2id password hashing and session cookie management (`HttpOnly; Secure; SameSite=Lax`).
  - Transactional Outbox Pattern: Inquiries and bookings write records and enqueue notification events in a single atomic database transaction.
  - Outbox retry worker running with exponential backoff and max retry limits.
  - Presigned S3/R2 URL generation endpoint so image binaries never touch the Node API or Postgres.
  - Public read endpoints return only `PUBLISHED` content with caching headers.
* **Deliverables**:
  - `backend/src/index.ts`
  - `backend/src/middleware/auth.ts`, `backend/src/middleware/validate.ts`, `backend/src/middleware/requestId.ts`
  - `backend/src/routes/` (auth, projects, inquiries, bookings, media, admin)
  - `backend/src/services/outboxWorker.ts`
  - `backend/src/services/storage.ts`
* **Anti-Footprint Mandate**: Explicit error handling, no unhandled promises, clean HTTP status codes (200, 201, 400, 401, 403, 404, 409, 422, 500).

---

### Agent 4: Editorial Folio UI & Experience Craftsman
* **Domain**: `frontend/src/app/(public)/`, `frontend/src/components/editorial/`, `frontend/src/components/film/`
* **Core Mission**: Implement the public web experience under the creative direction: *"Every page is a folio in an issue."*
* **Scope & Boundaries**:
  - Monograph & Plate numbering: Displays issue titles ("Monograph No. 014") and plates ("Plate 07 / 24") derived from DB sort order.
  - Contact-sheet loading skeletons: Grid of empty film negative cells marked with gold grease-pencil outlines (`#CFA570`).
  - Developing image reveal: Smooth transition from blur placeholder (`blurDataUrl`) with 1.04 → 1 scale easing, respecting `prefers-reduced-motion`.
  - Booking Film Roll: 7-step wizard with physical frame counter ("Frame 03 / 07 – Location") culminating in the "Commission Dossier" review.
  - Journal & Stories reading mode: 65ch measure, drop caps, marginal footnotes on desktop, 1px gold reading progress hairline.
  - Monograph print stylesheet (`@media print`) enabling visitors to save projects as clean archival PDFs.
  - Colophon footer dynamically fed from `/admin/settings`.
* **Deliverables**:
  - `frontend/src/app/page.tsx`
  - `frontend/src/app/portfolio/`, `frontend/src/app/project/[slug]/`
  - `frontend/src/app/journal/`, `frontend/src/app/stories/`
  - `frontend/src/app/services/`, `frontend/src/app/booking/`
  - `frontend/src/components/editorial/ContactSheetSkeleton.tsx`
  - `frontend/src/components/editorial/DevelopingPlate.tsx`
* **Anti-Footprint Mandate**: Copy strictly adheres to `docs/voice_guide.md`. No commercial wedding/portrait platitudes.

---

### Agent 5: Studio Desk Admin & Sequencer Architect
* **Domain**: `frontend/src/app/admin/`, `frontend/src/components/admin/`
* **Core Mission**: Build the administrative darkroom workspace ("Studio Desk") for project sequencing, CRM pipeline management, and publishing control.
* **Scope & Boundaries**:
  - Urgency Dashboard: "Needs attention" list (inquiries > 48 hours, unconfirmed bookings, review-state drafts), shoots of the week, live activity stream.
  - Light-Table Plate Sequencer: Dark-surface drag-and-drop & keyboard-accessible plate reordering interface with cover star, caption drawer, and batch PATCH persistence.
  - Inquiry Kanban Pipeline: Visual columns (`NEW` → `ARCHIVED`) with server-enforced valid transitions and audit log generation.
  - Booking Calendar & Dossier: Month/agenda views with interactive slide-out commission dossier.
  - Media Library: Grid with filters for unassigned negatives and missing alt text; direct-to-S3 upload.
  - Pre-Publish Checklist Modal: Gatekeeper enforcing cover image selection, alt text on all plates, SEO description, and slug uniqueness.
  - Hotkeys: ⌘K command palette and ⌘S save with unsaved changes navigation guard.
* **Deliverables**:
  - `frontend/src/app/admin/dashboard/page.tsx`
  - `frontend/src/app/admin/projects/[id]/sequencer/`
  - `frontend/src/app/admin/inquiries/page.tsx`
  - `frontend/src/app/admin/bookings/page.tsx`
  - `frontend/src/app/admin/media/page.tsx`
  - `frontend/src/components/admin/PublishChecklistModal.tsx`
* **Anti-Footprint Mandate**: Deep obsidian theme (`--bg-dark`), crisp typography, zero unnecessary abstractions.

---

### Agent 6: QA, E2E & Delivery Hardening Inspector
* **Domain**: `tests/`, `e2e/`, Root CI configs
* **Core Mission**: Exhaustive behavioral verification, security hardening, and exit-gate auditing.
* **Scope & Boundaries**:
  - Unit tests: `can()` authorization matrix, status state machine rules, slug collision logic, booking date boundaries.
  - Integration tests: Verify unpublished drafts are hidden on public endpoints; verify `onDelete: Restrict` prevents orphaned assets; verify booking idempotency prevents duplicate records.
  - End-to-End Playwright suites:
    1. Login → Create monograph → Sequence plates → Verify publish checklist → Publish → Verify public folio.
    2. Submit inquiry → Verify state `NEW` in Kanban → Move to `CONTACTED`.
    3. Complete 7-step booking with simulated network interruption and retry.
  - Security audit: Verify rejection of role privilege escalation (tampered `role: ADMIN` in request body) and oversized payloads.
* **Deliverables**:
  - `backend/src/__tests__/`
  - `frontend/e2e/`
  - `scripts/smoke-test.sh`
* **Anti-Footprint Mandate**: Tests verify actual business invariants and security boundaries, avoiding arbitrary superficial assertion fluff.

---

## 3. Inter-Agent Communication & Execution Protocol

### Handoff Order
1. **Agent 1** (Schema) & **Agent 2** (Shared Contracts) execute first to lock types and validation rules.
2. **Agent 3** (API) implements endpoints conforming strictly to `@studio/shared`.
3. **Agent 4** (Public UI) and **Agent 5** (Admin Studio Desk) build upon the shared contracts and live API endpoints.
4. **Agent 6** (QA & Security) continuously executes validation gates and certifies release readiness.

### Quality Invariants
- Every commit must compile cleanly with `npm run build`.
- No file may contain `// AI generated`, `// TODO: add code later`, or synthetic filler comments.
- All copy must strictly comply with `docs/voice_guide.md`.
