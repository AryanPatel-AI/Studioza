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
      <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Project Not Published
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          This digital workspace is currently in draft mode or has been unpublished by the creator.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-all"
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
    <div className="min-h-screen bg-[#080706] text-zinc-100 font-sans selection:bg-amber-400 selection:text-black relative">
      {/* Subtle Analog Film Grain & Atmospheric Warmth */}
      <FilmGrain />

      {/* Warm Ambient Optical Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgba(217,119,6,0.06),transparent_70%)]" />

      {/* Public Editorial Header */}
      <header className="h-18 px-6 sm:px-12 border-b border-white/[0.08] bg-[#080706]/80 backdrop-blur-2xl flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-amber-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <span className="font-serif font-bold text-base text-white tracking-tight block leading-none">
              {project.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
              Curated Visual Monograph
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] transition-all"
        >
          <span>Studioza Atelier</span>
          <ExternalLink className="w-3 h-3 text-amber-400" />
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
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/[0.04] text-amber-300 border border-white/[0.1]">
                    <span>{block.badge}</span>
                  </div>
                )}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
                  {block.title}
                </h1>
                {block.subtitle && (
                  <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                    {block.subtitle}
                  </p>
                )}
                {block.ctaText && (
                  <div className="pt-2">
                    <a
                      href={block.ctaUrl || "#"}
                      className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full font-semibold text-xs font-mono tracking-wider uppercase text-black bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <span>{block.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
                {block.imageUrl && (
                  <div className="mt-12 rounded-sm overflow-hidden border border-white/[0.08] shadow-2xl aspect-video max-w-4xl mx-auto relative group bg-zinc-950">
                    <img
                      src={block.imageUrl}
                      alt={block.title || "Project image"}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 text-white/40">
                      <Scan className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Story / Text Section */}
            {block.type === "text" && (
              <div className="max-w-2xl mx-auto space-y-4 border-l-2 border-amber-400/40 pl-6 sm:pl-8">
                {block.title && (
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    {block.title}
                  </h2>
                )}
                <p className="text-zinc-300 leading-relaxed text-base sm:text-lg font-light whitespace-pre-line">
                  {block.content}
                </p>
              </div>
            )}

            {/* Features Section */}
            {block.type === "features" && (
              <div className="space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  {block.title && (
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      {block.title}
                    </h2>
                  )}
                  {block.subtitle && (
                    <p className="text-xs font-mono text-zinc-400 tracking-wider">{block.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {(block.items || []).map((item: any, itemIdx: number) => (
                    <CrystalSurface
                      key={itemIdx}
                      intensity="subtle"
                      className="p-6 sm:p-8 rounded-2xl space-y-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                        0{itemIdx + 1}
                      </div>
                      <h3 className="font-serif font-bold text-white text-lg tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
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
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      {block.title}
                    </h2>
                  )}
                  {block.subtitle && (
                    <p className="text-xs font-mono text-zinc-400 tracking-wider">{block.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                  {(block.items || []).map((item: any, itemIdx: number) => (
                    <div
                      key={itemIdx}
                      className="group space-y-3"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 tracking-wider">
                        <span className="text-amber-400">PLATE 0{itemIdx + 1}</span>
                        <span>ILFORD HP5 PLUS • ARCHIVAL</span>
                      </div>
                      <div className="relative overflow-hidden aspect-[4/3] rounded-sm bg-zinc-950 border border-white/[0.08]">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out brightness-95"
                        />
                        <div className="absolute top-4 right-4 text-white/30">
                          <Scan className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="pt-2 flex items-baseline justify-between gap-4">
                        <h3 className="font-serif font-bold text-white text-xl">{item.title}</h3>
                        <span className="text-xs font-mono text-amber-300 tracking-wider">
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
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
                    {block.subtitle}
                  </p>
                )}
                {block.buttonText && (
                  <div className="pt-2">
                    <a
                      href={block.buttonUrl || "#"}
                      className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full font-semibold text-xs font-mono uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
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
      <footer className="border-t border-white/[0.08] py-12 text-center text-xs text-zinc-500 font-mono tracking-wider">
        <p>Published with Studioza Atelier — Digital Archive &amp; Visual Monograph System</p>
      </footer>
    </div>
  );
}
