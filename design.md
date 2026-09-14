# Studioza Atelier — Visual Design System & UI Specification

> **Creative Direction**: *"A physical piece of optical glass floating inside a cinematic photograph."*  
> Photography is the hero. The interface is spatial, selective, tactile, and restrained.

---

## 1. Core Color System

The palette is derived directly from analog darkrooms, 3200K tungsten modeling lamps, and baryta cotton rag master prints.

| Role | Token / Variable | Hex Value | Application |
| :--- | :--- | :--- | :--- |
| **Cinematic Obsidian** | `--color-obsidian-950` | `#050403` | Deepest darkroom shadows, full-width letterboxing |
| **Atelier Canvas** | `--color-obsidian-900` | `#080706` | Primary background across all public & workspace pages |
| **Glass Base Layer** | `--color-obsidian-800` | `#14110e` | Foundation tint for floating crystal slabs |
| **Darkroom Navy** | `--color-navy-950` | `#06080d` | Midnight cyanotype shadows, deep architectural contrast |
| **Architectural Twilight**| `--color-navy-800` | `#141d30` | Cool secondary wash for exterior brutalist imagery |
| **Baryta Cotton White**| `--color-ivory-100` | `#f5f1ea` | Primary text, display headings, museum placards |
| **Warm Neutral Prose**| `--color-ivory-200` | `#e8e3d8` | Subheadings, editorial captions |
| **Muted Curatorial** | `--color-ivory-300` | `#cfc8b8` | Long-form artist statements, secondary body text |
| **3200K Tungsten Gold** | `--color-tungsten-400` | `#e59a24` | Primary brand accent, active states, reticles, CTAs |
| **Champagne Specular** | `--color-tungsten-200` | `#fae19c` | Crystal edge rim grazing highlights |
| **Selenium Grey** | `--color-selenium-400` | `#78716c` | Technical specs, aperture dividers, film rebate text |

---

## 2. The Crystal-Glass Language (`<CrystalSurface>`)

Glass is used **selectively**. It never covers the entire screen, and not every card is made of glass. When applied, it mimics physical optical quartz:

```tsx
import { CrystalSurface } from "@/components/optical";

<CrystalSurface 
  tint="champagne"       // "champagne" | "obsidian" | "navy" | "clear"
  intensity="medium"     // "subtle" (blur-md) | "medium" (blur-2xl) | "deep" (blur-3xl)
  elevation="floating"   // "flat" | "raised" | "floating" (3D tilt + counter-drop shadow)
  specularLight={true}   // Dynamic grazing highlight tracks cursor
  noise={false}          // Optional microscopic film tooth
  className="p-8 rounded-3xl"
>
  {/* Content */}
</CrystalSurface>
```

### Optical Rules:
1. **Translucency & Dispersion**: Deep multi-stage gaussian blur with internal ambient tone gradient (`from-amber-500/[0.02] to-black/[0.18]`).
2. **Beveled Edge Lighting**: 1px translucent border (`rgba(255, 235, 215, 0.10)`) with an angle-responsive specular highlight that shifts across the perimeter with pointer motion.
3. **Counter-Shifting Drop Shadow**: On `elevation="floating"`, the drop shadow displaces opposite to pointer tilt (`translate3d(-x, -y + 18px, 0)`), proving physical separation from the photograph beneath it.

---

## 3. Typography Hierarchy

Studioza pairs high-contrast editorial serif typography with technical darkroom metadata.

| Role | Font Family | Size / Leading | Component |
| :--- | :--- | :--- | :--- |
| **Display Hero** | `Cormorant Garamond` (Serif Bold) | `text-6xl` to `text-[10.5rem]`, `leading-none` | `<DisplayHeadline size="hero">` |
| **Section Title**| `Cormorant Garamond` (Serif Bold) | `text-4xl` to `text-7xl`, `leading-tight` | `<DisplayHeadline size="xl">` |
| **Editorial Italic**| `Cormorant Garamond` (Serif Italic) | `text-2xl` to `text-5xl`, `leading-relaxed` | `<EditorialQuote>` |
| **Technical Telemetry**| `Geist Mono` (Monospace) | `11px`, uppercase, `tracking-[0.2em]` | `<TechnicalSpec>` |
| **Plate Identification**| `Geist Mono` (Monospace) | `10px`, uppercase, `tracking-[0.25em]` | `<PlateLabel>` |
| **Body Prose** | `Geist Sans` (Sans-Serif Light) | `text-sm` to `text-base`, `leading-relaxed` | `<BodyText>` |

---

## 4. Editorial Spacing System & Zero-Overlap Principle

### The Zero-Overlap Mandate
*Headlines, floating glass plates, annotations, and text blocks MUST never occlude one another.*

* **Hero Clear Zone**: The display title (`STUDIO`) stands in its own zone, separated by `mt-8 sm:mt-12` from the `<FloatingOpticalGlass>` card.
* **Section Padding**: Generous breathing space: `py-28 sm:py-36 lg:py-44`.
* **Container Boundaries**: `max-w-7xl mx-auto px-6 sm:px-12 lg:px-16`.
* **Grid Stagger Separation**: Asymmetric multi-column spreads utilize `gap-12 sm:gap-16` to preserve breathing room between lead plates and vertical portraits.

---

## 5. Premium Buttons (`<StudioButton>`)

Buttons behave with physical weight, inertia, and magnetic pull:

```tsx
import { StudioButton } from "@/components/ui";

// Solid Tungsten Gold CTA
<StudioButton variant="primary" size="md" href="/signup" icon="arrow-up-right">
  Enter Workspace
</StudioButton>

// Frosted Crystal Capsule
<StudioButton variant="crystal" size="md" href="#anthology">
  Selected Plates
</StudioButton>

// Fine-Line Outline
<StudioButton variant="outline" size="sm" onClick={handleAction}>
  Contact Sheet
</StudioButton>

// Editorial Link
<StudioButton variant="minimal" href="/main" icon="arrow-right">
  View Master Roll
</StudioButton>
```

### Physical Mechanics:
* **Magnetic Attraction**: Moves smoothly towards pointer (strength `0.28`), with inner label lagging slightly (`0.3` factor) for fluid parallax.
* **No Garish Neon Glow**: Shadows are soft and restrained (`shadow-amber-400/10`), focusing on crisp typography and specular reflection.

---

## 6. Imagery System (`<PhotographicPlate>`)

Photographs are treated as physical gallery prints:

```tsx
import { PhotographicPlate } from "@/components/editorial";

<PhotographicPlate
  imageSrc="/path/to/image.jpg"
  imageAlt="Plate Study"
  title="Monolithic Cantilever"
  subtitle="Geometric balance between concrete brutalism and twilight warmth."
  plateNumber={3}
  location="Kyoto, Japan"
  emulsion="ILFORD HP5 PLUS • 400"
  telemetry="Fujifilm GFX 100 II • GF 23mm f/4 • ISO 50"
  aspectRatio="16/10" // "16/10" | "4/5" | "3/4" | "21/9" | "1/1" | "full"
  onClick={() => openLightbox(photo)}
/>
```

### Imagery Rules:
1. **Aspect Ratios**: Locked to medium-format camera film proportions (`16/10`, `4/5`, `3/4`, `21/9`).
2. **Hover Cadence**: Dignified 1000ms ease-out zoom (`scale-[1.03]`), increasing brightness from 92% to 100%.
3. **Placards**: Captions sit **beneath** the image in museum style—never trapped inside uniform rounded boxes.

---

## 7. Motion & Physics System

Motion must feel physical—governed by gravity, inertia, and optical light refraction:

* **Editorial Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (weighted deceleration).
* **Viscous Easing**: `cubic-bezier(0.25, 1, 0.5, 1)` (liquid viscosity / magnetic snap).
* **Scroll Reveals (`<MotionReveal>`)**: Smooth 800ms fade-up or aperture reveal (`filter: blur(4px) -> blur(0)`).
* **Accessibility**: Full adherence to `prefers-reduced-motion`—all transforms and animations instantly resolve to static states.
