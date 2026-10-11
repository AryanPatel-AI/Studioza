import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import FilmGrain from '@/components/film/FilmGrain';

export default function EditorialNotFound() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative font-sans flex flex-col justify-between">
      <FilmGrain />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-block p-4 bg-[#171717] text-[#F4F1EB] border border-[#171717]">
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#CFA570] block">
              Folio Reference 404
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            This plate isn&apos;t in the archive.
          </h1>

          <p className="text-sm sm:text-base text-[#66625B] leading-relaxed max-w-md mx-auto">
            The accession register contains no published image or monograph under this identifier.
            Here is the latest work available in the public collection.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/portfolio"
              className="px-8 py-3.5 bg-[#171717] text-[#F4F1EB] text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              Browse Public Portfolio
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 border border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider hover:bg-black/5 transition-colors"
            >
              Return to Atelier Index
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
