import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Layers, Globe, ExternalLink, ArrowRight, Scan, Camera } from "lucide-react";
import FilmGrain from "@/components/film/FilmGrain";
import CrystalSurface from "@/components/optical/CrystalSurface";

interface PublicProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PublicProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project || project.status !== "published") {
    return {
      title: "Project Not Available — Studio",
      description: "This project is either private or not currently published.",
    };
  }

  const settings = project.settings ? JSON.parse(project.settings) : {};

  return {
    title: `${settings.seoTitle || project.name} — Studio`,
    description: settings.seoDescription || project.description || "Published with Studio.",
    openGraph: {
      title: settings.seoTitle || project.name,
      description: settings.seoDescription || project.description || "Published with Studio.",
      type: "website",
    },
  };
}

export default async function PublicProjectPage({ params }: PublicProjectPageProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!project || project.status !== "published") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-copper-500/10 text-copper-600 flex items-center justify-center mb-4">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Project Not Published
        </h1>
        <p className="text-sm text-foreground-muted mt-2 max-w-md">
          This digital workspace is currently in draft mode or has been unpublished by the creator.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl type-body-base font-semibold text-copper-50 bg-copper-500 hover:bg-copper-600 transition-all"
          >
            <span>Learn About Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  let blocks: any[] = [];
  try {
    blocks = JSON.parse(project.content || "[]");
  } catch {
    blocks = [];
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-copper-500 selection:text-sage-50 relative">
      {/* Subtle Analog Film Grain & Atmospheric Warmth */}
      <FilmGrain />

      {/* Warm Ambient Optical Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgba(217,119,6,0.06),transparent_70%)]" />

      {/* Public Editorial Header */}
      <header className="h-18 px-6 sm:px-12 border-b border-sage-300/40 bg-background backdrop-blur-2xl flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sage-50/50 border border-sage-300/40 flex items-center justify-center text-copper-600">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-base text-foreground block">
              {project.name}
            </span>
            <span className="type-body-base text-foreground-muted">
              Curated Visual Monograph
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full type-body-base text-foreground hover:text-foreground bg-sage-50/50 hover:bg-sage-50/50 border border-sage-300/40 transition-all"
        >
          <span>Studioza Atelier</span>
          <ExternalLink className="w-3 h-3 text-copper-600" />
        </Link>
      </header>

      {/* Main Published Content Container */}
      <main className="max-w-5xl mx-auto py-20 px-6 sm:px-10 space-y-28 relative z-10">
        {blocks.map((block: any, idx: number) => (
          <section key={block.id || idx} className="scroll-mt-28">
            {/* Hero Section */}
            {block.type === "hero" && (
              <div className="text-center max-w-3xl mx-auto space-y-8">
                {block.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full type-body-base bg-sage-50/50 text-copper-600 border border-sage-300/40">
                    <span>{block.badge}</span>
                  </div>
                )}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  {block.title}
                </h1>
                {block.subtitle && (
                  <p className="type-body-lead text-foreground-muted max-w-2xl mx-auto">
                    {block.subtitle}
                  </p>
                )}
                {block.ctaText && (
                  <div className="pt-2">
                    <a
                      href={block.ctaUrl || "#"}
                      className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full font-semibold type-body-base text-copper-50 bg-copper-500 hover:bg-copper-600 shadow-xl shadow-copper-500/20 transition-all cursor-pointer"
                    >
                      <span>{block.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
                {block.imageUrl && (
                  <div className="mt-12 rounded-sm overflow-hidden border border-sage-300/40 shadow-2xl aspect-video max-w-4xl mx-auto relative group bg-sage-950">
                    <img
                      src={block.imageUrl}
                      alt={block.title || "Project image"}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 text-foreground">
                      <Scan className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Story / Text Section */}
            {block.type === "text" && (
              <div className="max-w-2xl mx-auto space-y-4 border-l-2 border-copper-500/40 pl-6 sm:pl-8">
                {block.title && (
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
                    {block.title}
                  </h2>
                )}
                <p className="text-foreground type-body-lead whitespace-pre-line">
                  {block.content}
                </p>
              </div>
            )}

            {/* Features Section */}
            {block.type === "features" && (
              <div className="space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  {block.title && (
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                      {block.title}
                    </h2>
                  )}
                  {block.subtitle && (
                    <p className="type-body-base text-foreground-muted">{block.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {(block.items || []).map((item: any, itemIdx: number) => (
                    <CrystalSurface
                      key={itemIdx}
                      intensity="subtle"
                      className="p-6 sm:p-8 rounded-2xl space-y-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-copper-500/10 text-copper-600 flex items-center justify-center font-bold type-body-base">
                        0{itemIdx + 1}
                      </div>
                      <h3 className="font-bold text-foreground text-lg">
                        {item.title}
                      </h3>
                      <p className="type-body-base text-foreground-muted">
                        {item.description}
                      </p>
                    </CrystalSurface>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {block.type === "gallery" && (
              <div className="space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  {block.title && (
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                      {block.title}
                    </h2>
                  )}
                  {block.subtitle && (
                    <p className="type-body-base text-foreground-muted">{block.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                  {(block.items || []).map((item: any, itemIdx: number) => (
                    <div
                      key={itemIdx}
                      className="group space-y-3"
                    >
                      <div className="flex items-center justify-between type-body-base text-foreground-muted">
                        <span className="text-copper-600">PLATE 0{itemIdx + 1}</span>
                        <span>ILFORD HP5 PLUS • ARCHIVAL</span>
                      </div>
                      <div className="relative overflow-hidden aspect-[4/3] rounded-sm bg-sage-950 border border-sage-300/40">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out brightness-95"
                        />
                        <div className="absolute top-4 right-4 text-foreground">
                          <Scan className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="pt-2 flex items-baseline justify-between gap-4">
                        <h3 className="font-bold text-foreground text-xl">{item.title}</h3>
                        <span className="type-body-base text-copper-600">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            {block.type === "cta" && (
              <CrystalSurface
                intensity="medium"
                className="p-10 sm:p-16 rounded-3xl text-center space-y-6 max-w-3xl mx-auto shadow-2xl"
              >
                <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="type-body-base text-foreground-muted max-w-md mx-auto">
                    {block.subtitle}
                  </p>
                )}
                {block.buttonText && (
                  <div className="pt-2">
                    <a
                      href={block.buttonUrl || "#"}
                      className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full font-semibold type-body-base text-copper-50 bg-copper-500 hover:bg-copper-600 shadow-xl shadow-copper-500/20 transition-all cursor-pointer"
                    >
                      <span>{block.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </CrystalSurface>
            )}
          </section>
        ))}
      </main>

      {/* Public Footer */}
      <footer className="border-t border-sage-300/40 py-12 text-center type-body-base text-foreground-muted">
        <p>Published with Studioza Atelier — Digital Archive &amp; Visual Monograph System</p>
      </footer>
    </div>
  );
}
